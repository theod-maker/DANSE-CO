import { test } from 'node:test'
import assert from 'node:assert/strict'
import {
  ANALYTICS_PROPERTY,
  buildInitConfig,
  createAnalytics,
  type AnalyticsDependencies,
  type PostHogLike,
} from './client.ts'
import { CONSENT_COOKIE_NAME } from './consent.ts'

interface Harness {
  calls: string[]
  initCalls: Array<{ key: string; config: ReturnType<typeof buildInitConfig> }>
  captured: Array<{ event: string; properties: Record<string, string> | undefined }>
  cookies: { value: string }
  written: string[]
  loadCount: { value: number }
  dependencies: AnalyticsDependencies
}

function createHarness(overrides: Partial<AnalyticsDependencies> = {}, initialCookie = ''): Harness {
  const calls: string[] = []
  const initCalls: Harness['initCalls'] = []
  const captured: Harness['captured'] = []
  const cookies = { value: initialCookie }
  const written: string[] = []
  const loadCount = { value: 0 }
  const posthog: PostHogLike = {
    init: (key, config) => {
      calls.push('init')
      initCalls.push({ key, config })
    },
    register: (properties) => calls.push(`register:${JSON.stringify(properties)}`),
    opt_in_capturing: () => calls.push('opt_in'),
    opt_out_capturing: () => calls.push('opt_out'),
    clear_opt_in_out_capturing: () => calls.push('clear'),
    reset: () => calls.push('reset'),
    capture: (event, properties) => captured.push({ event, properties }),
  }
  const dependencies: AnalyticsDependencies = {
    key: 'phc_test',
    allowPreview: false,
    getHostname: () => 'dansandco.fr',
    readCookie: () => cookies.value,
    writeCookie: (value) => {
      written.push(value)
      cookies.value = value.split(';')[0]
    },
    onIdle: () => Promise.resolve(),
    loadPosthog: () => {
      loadCount.value += 1
      return Promise.resolve(posthog)
    },
    purgeStaleState: () => calls.push('purge'),
    warn: () => undefined,
    ...overrides,
  }
  return { calls, initCalls, captured, cookies, written, loadCount, dependencies }
}

async function settle(): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 0))
}

test('builds the exact init configuration promised by the privacy page', () => {
  const config = buildInitConfig(false, false)
  assert.equal(config.api_host, 'https://t.theodelporte.fr')
  assert.equal(config.ui_host, 'https://eu.posthog.com')
  assert.equal(config.cookieless_mode, 'on_reject')
  assert.equal(config.opt_out_capturing_by_default, true)
  assert.equal(config.persistence, 'localStorage+cookie')
  assert.equal(config.capture_pageview, 'history_change')
  assert.equal(config.capture_pageleave, true)
  assert.equal(config.disable_session_recording, true)
  assert.equal(typeof config.before_send, 'function')
  assert.deepEqual(Object.keys(config).sort(), [
    'api_host',
    'before_send',
    'capture_pageleave',
    'capture_pageview',
    'cookieless_mode',
    'disable_session_recording',
    'opt_out_capturing_by_default',
    'persistence',
    'ui_host',
  ])
})

test('opts in by default only when consent was granted', () => {
  assert.equal(buildInitConfig(true, false).opt_out_capturing_by_default, false)
  assert.equal(buildInitConfig(false, false).opt_out_capturing_by_default, true)
})

test('before_send drops events on excluded paths and other hosts', () => {
  const { before_send: beforeSend } = buildInitConfig(true, false)
  assert.equal(typeof beforeSend, 'function')
  const send = beforeSend as (event: unknown) => unknown
  const publicEvent = { event: '$pageview', properties: { $current_url: 'https://dansandco.fr/planning' } }
  assert.equal(send(publicEvent), publicEvent)
  assert.equal(send({ event: '$pageview', properties: { $current_url: 'https://dansandco.fr/admin/login' } }), null)
  assert.equal(send({ event: '$pageview', properties: { $current_url: 'https://other.com/planning' } }), null)
  assert.equal(send({ event: '$pageview', properties: {} }), null)
  assert.equal(send(null), null)
})

test('does nothing without a key', async () => {
  const harness = createHarness({ key: undefined })
  createAnalytics(harness.dependencies).syncPath('/planning')
  await settle()
  assert.equal(harness.loadCount.value, 0)
})

test('does nothing on a host that is not allowed', async () => {
  const harness = createHarness({ getHostname: () => 'danse-abc.vercel.app' })
  createAnalytics(harness.dependencies).syncPath('/planning')
  await settle()
  assert.equal(harness.loadCount.value, 0)
})

test('loads on a public path and registers the property', async () => {
  const harness = createHarness()
  createAnalytics(harness.dependencies).syncPath('/planning')
  await settle()
  assert.equal(harness.loadCount.value, 1)
  assert.equal(harness.initCalls[0].key, 'phc_test')
  assert.ok(harness.calls.includes(`register:${JSON.stringify({ property: ANALYTICS_PROPERTY })}`))
})

test('does not load on an excluded entry path, then loads once navigation reaches a public page', async () => {
  const harness = createHarness()
  const analytics = createAnalytics(harness.dependencies)
  analytics.syncPath('/admin/login')
  await settle()
  assert.equal(harness.loadCount.value, 0)
  analytics.syncPath('/planning')
  await settle()
  assert.equal(harness.loadCount.value, 1)
})

test('loads only once across repeated path changes', async () => {
  const harness = createHarness()
  const analytics = createAnalytics(harness.dependencies)
  analytics.syncPath('/')
  analytics.syncPath('/planning')
  analytics.syncPath('/contact')
  await settle()
  assert.equal(harness.loadCount.value, 1)
  assert.equal(harness.initCalls.length, 1)
})

test('reads a granted choice before init so there is no first event without a cookie', async () => {
  const harness = createHarness({}, `${CONSENT_COOKIE_NAME}=granted`)
  createAnalytics(harness.dependencies).syncPath('/')
  await settle()
  assert.equal(harness.initCalls[0].config.opt_out_capturing_by_default, false)
  assert.ok(harness.calls.includes('opt_in'))
})

test('drops a stale stored opt-in when the consent cookie is absent', async () => {
  const harness = createHarness()
  createAnalytics(harness.dependencies).syncPath('/')
  await settle()
  assert.equal(harness.initCalls[0].config.opt_out_capturing_by_default, true)
  assert.ok(harness.calls.includes('clear'))
  assert.ok(!harness.calls.includes('opt_in'))
})

test('treats a denied cookie like an absent one for capturing with cookies', async () => {
  const harness = createHarness({}, `${CONSENT_COOKIE_NAME}=denied`)
  createAnalytics(harness.dependencies).syncPath('/')
  await settle()
  assert.equal(harness.initCalls[0].config.opt_out_capturing_by_default, true)
  assert.ok(!harness.calls.includes('opt_in'))
})

test('grantConsent writes the cookie then resets before opting in and re-registers the property', async () => {
  const harness = createHarness()
  const analytics = createAnalytics(harness.dependencies)
  analytics.syncPath('/')
  await settle()
  harness.calls.length = 0
  analytics.grantConsent()
  assert.ok(harness.written[0].startsWith(`${CONSENT_COOKIE_NAME}=granted`))
  assert.deepEqual(harness.calls, [
    'reset',
    `register:${JSON.stringify({ property: ANALYTICS_PROPERTY })}`,
    'opt_in',
  ])
  assert.equal(analytics.getConsent(), 'granted')
})

test('denyConsent writes the cookie and opts out', async () => {
  const harness = createHarness({}, `${CONSENT_COOKIE_NAME}=granted`)
  const analytics = createAnalytics(harness.dependencies)
  analytics.syncPath('/')
  await settle()
  harness.calls.length = 0
  analytics.denyConsent()
  assert.ok(harness.written[0].startsWith(`${CONSENT_COOKIE_NAME}=denied`))
  assert.deepEqual(harness.calls, ['opt_out'])
  assert.equal(analytics.getConsent(), 'denied')
})

test('records the choice even when the client never loaded', () => {
  const harness = createHarness()
  const analytics = createAnalytics(harness.dependencies)
  analytics.grantConsent()
  assert.equal(analytics.getConsent(), 'granted')
  assert.equal(harness.loadCount.value, 0)
})

test('notifies subscribers on each choice and stops after unsubscribe', () => {
  const harness = createHarness()
  const analytics = createAnalytics(harness.dependencies)
  let notifications = 0
  const unsubscribe = analytics.subscribeConsent(() => {
    notifications += 1
  })
  analytics.grantConsent()
  analytics.denyConsent()
  unsubscribe()
  analytics.grantConsent()
  assert.equal(notifications, 2)
})

test('tracks only the contact events and does nothing before loading', async () => {
  const harness = createHarness()
  const analytics = createAnalytics(harness.dependencies)
  analytics.track('contact_submitted')
  assert.equal(harness.captured.length, 0)
  analytics.syncPath('/contact')
  await settle()
  analytics.track('contact_submitted')
  analytics.track('contact_failed')
  assert.deepEqual(
    harness.captured.map((entry) => entry.event),
    ['contact_submitted', 'contact_failed']
  )
  assert.equal(harness.captured[0].properties, undefined)
})

test('survives a loading failure with a warning that carries no event data', async () => {
  const warnings: string[] = []
  const harness = createHarness({
    loadPosthog: () => Promise.reject(new Error('network down')),
    warn: (message) => warnings.push(message),
  })
  createAnalytics(harness.dependencies).syncPath('/')
  await settle()
  assert.equal(warnings.length, 1)
})

test('is active only on a public path of an allowed host with a key and not disabled', () => {
  const analytics = createAnalytics(createHarness().dependencies)
  assert.equal(analytics.isMeasurementActive('/planning'), true)
  assert.equal(analytics.isMeasurementActive('/admin/login'), false)
  assert.equal(analytics.isMeasurementActive('/studio'), false)
  const withoutKey = createAnalytics(createHarness({ key: undefined }).dependencies)
  assert.equal(withoutKey.isMeasurementActive('/planning'), false)
  const wrongHost = createAnalytics(createHarness({ getHostname: () => 'example.com' }).dependencies)
  assert.equal(wrongHost.isMeasurementActive('/planning'), false)
})

test('setDisabled turns measurement off, blocks loading and notifies once per change', async () => {
  const harness = createHarness()
  const analytics = createAnalytics(harness.dependencies)
  let notifications = 0
  analytics.subscribeConsent(() => {
    notifications += 1
  })
  analytics.setDisabled(true)
  analytics.setDisabled(true)
  assert.equal(notifications, 1)
  assert.equal(analytics.isMeasurementActive('/planning'), false)
  analytics.syncPath('/planning')
  await settle()
  assert.equal(harness.loadCount.value, 0)
  analytics.setDisabled(false)
  assert.equal(notifications, 2)
  assert.equal(analytics.isMeasurementActive('/planning'), true)
})

test('before_send keeps only page views and page leaves without consent, and disables geoip', () => {
  const { before_send: beforeSend } = buildInitConfig(false, false, () => undefined)
  const send = beforeSend as (event: unknown) => { properties: Record<string, unknown> } | null
  const url = 'https://dansandco.fr/planning'
  const pageview = send({ event: '$pageview', properties: { $current_url: url } })
  assert.ok(pageview)
  assert.equal(pageview.properties.$geoip_disable, true)
  assert.ok(send({ event: '$pageleave', properties: { $current_url: url } }))
  for (const event of ['$autocapture', 'contact_submitted', 'contact_failed', '$exception', '$web_vitals']) {
    assert.equal(send({ event, properties: { $current_url: url } }), null, event)
  }
})

test('before_send also restricts a denied visitor', () => {
  const { before_send: beforeSend } = buildInitConfig(false, false, () => 'denied')
  const send = beforeSend as (event: unknown) => unknown
  assert.equal(send({ event: '$autocapture', properties: { $current_url: 'https://dansandco.fr/' } }), null)
})

test('before_send lets every event through once consent is granted, untouched', () => {
  const { before_send: beforeSend } = buildInitConfig(true, false, () => 'granted')
  const send = beforeSend as (event: unknown) => unknown
  const autocapture = { event: '$autocapture', properties: { $current_url: 'https://dansandco.fr/' } }
  assert.equal(send(autocapture), autocapture)
})

test('before_send reads the consent at send time, not at init time', () => {
  let current: 'granted' | undefined
  const { before_send: beforeSend } = buildInitConfig(false, false, () => current)
  const send = beforeSend as (event: unknown) => unknown
  const click = { event: '$autocapture', properties: { $current_url: 'https://dansandco.fr/' } }
  assert.equal(send(click), null)
  current = 'granted'
  assert.equal(send(click), click)
})

test('purges stale PostHog state before init when consent is not granted', async () => {
  const harness = createHarness({}, `${CONSENT_COOKIE_NAME}=denied`)
  createAnalytics(harness.dependencies).syncPath('/')
  await settle()
  assert.ok(harness.calls.indexOf('purge') !== -1)
  assert.ok(harness.calls.indexOf('purge') < harness.calls.indexOf('init'))
})

test('does not purge when consent is granted', async () => {
  const harness = createHarness({}, `${CONSENT_COOKIE_NAME}=granted`)
  createAnalytics(harness.dependencies).syncPath('/')
  await settle()
  assert.ok(!harness.calls.includes('purge'))
})

test('refuses a key that is not a public project key', async () => {
  const harness = createHarness({ key: 'phx_personal_key' })
  const analytics = createAnalytics(harness.dependencies)
  analytics.syncPath('/planning')
  await settle()
  assert.equal(harness.loadCount.value, 0)
  assert.equal(analytics.isMeasurementActive('/planning'), false)
})
