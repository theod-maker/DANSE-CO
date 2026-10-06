import type { PostHogConfig } from 'posthog-js'
import { readConsent, serializeConsent, type ConsentChoice } from './consent.ts'
import { isPublicPosthogKey } from './public-key.ts'
import { isAnalyticsHost, isEventAllowed, isExcludedPath } from './scope.ts'

export const ANALYTICS_PROPERTY = 'dans-co'
export const RELAY_HOST = 'https://t.theodelporte.fr'
export const POSTHOG_UI_HOST = 'https://eu.posthog.com'

export type AnalyticsEvent = 'contact_submitted' | 'contact_failed'

export interface PostHogLike {
  init(key: string, config: Partial<PostHogConfig>): unknown
  register(properties: Record<string, string>): void
  opt_in_capturing(): void
  opt_out_capturing(): void
  clear_opt_in_out_capturing(): void
  reset(): void
  capture(event: string, properties?: Record<string, string>): void
}

export interface AnalyticsDependencies {
  key: string | undefined
  allowPreview: boolean
  getHostname: () => string
  readCookie: () => string
  writeCookie: (value: string) => void
  onIdle: () => Promise<void>
  loadPosthog: () => Promise<PostHogLike>
  purgeStaleState: () => void
  warn: (message: string) => void
}

export interface Analytics {
  syncPath: (pathname: string) => void
  grantConsent: () => void
  denyConsent: () => void
  getConsent: () => ConsentChoice | undefined
  subscribeConsent: (listener: () => void) => () => void
  isMeasurementActive: (pathname: string) => boolean
  setDisabled: (isDisabled: boolean) => void
  track: (event: AnalyticsEvent, properties?: Record<string, string>) => void
}

const EVENTS_WITHOUT_CONSENT: readonly string[] = ['$pageview', '$pageleave']

export function buildInitConfig(
  hasConsent: boolean,
  allowPreview: boolean,
  readCurrentConsent: () => ConsentChoice | undefined = () => (hasConsent ? 'granted' : undefined)
): Partial<PostHogConfig> {
  return {
    api_host: RELAY_HOST,
    ui_host: POSTHOG_UI_HOST,
    cookieless_mode: 'on_reject',
    opt_out_capturing_by_default: !hasConsent,
    persistence: 'localStorage+cookie',
    capture_pageview: 'history_change',
    capture_pageleave: true,
    disable_session_recording: true,
    before_send: (captureResult) => {
      if (captureResult === null) {
        return null
      }
      const currentUrl = captureResult.properties?.$current_url
      if (typeof currentUrl !== 'string' || !isEventAllowed(currentUrl, allowPreview)) {
        return null
      }
      if (readCurrentConsent() === 'granted') {
        return captureResult
      }
      if (!EVENTS_WITHOUT_CONSENT.includes(captureResult.event)) {
        return null
      }
      return {
        ...captureResult,
        properties: { ...captureResult.properties, $geoip_disable: true },
      }
    },
  }
}

export function createAnalytics(dependencies: AnalyticsDependencies): Analytics {
  const listeners = new Set<() => void>()
  let client: PostHogLike | undefined
  let isLoading = false
  let isDisabled = false

  const getConsent = (): ConsentChoice | undefined => readConsent(dependencies.readCookie())

  const notify = (): void => {
    for (const listener of listeners) {
      listener()
    }
  }

  const registerProperty = (posthog: PostHogLike): void => {
    posthog.register({ property: ANALYTICS_PROPERTY })
  }

  const load = async (): Promise<void> => {
    await dependencies.onIdle()
    const posthog = await dependencies.loadPosthog()
    const hasConsent = getConsent() === 'granted'
    if (!hasConsent) {
      dependencies.purgeStaleState()
    }
    posthog.init(
      dependencies.key ?? '',
      buildInitConfig(hasConsent, dependencies.allowPreview, getConsent)
    )
    registerProperty(posthog)
    if (hasConsent) {
      posthog.opt_in_capturing()
    } else {
      posthog.clear_opt_in_out_capturing()
    }
    client = posthog
  }

  const isMeasurementActive = (pathname: string): boolean =>
    !isDisabled &&
    isPublicPosthogKey(dependencies.key) &&
    isAnalyticsHost(dependencies.getHostname(), dependencies.allowPreview) &&
    !isExcludedPath(pathname)

  const setDisabled = (nextIsDisabled: boolean): void => {
    if (nextIsDisabled === isDisabled) {
      return
    }
    isDisabled = nextIsDisabled
    notify()
  }

  const syncPath = (pathname: string): void => {
    if (isLoading || !isMeasurementActive(pathname)) {
      return
    }
    isLoading = true
    load().catch((error: unknown) => {
      dependencies.warn(`[analytics] mesure indisponible, le site continue sans elle (${String(error)})`)
    })
  }

  const grantConsent = (): void => {
    dependencies.writeCookie(serializeConsent('granted', dependencies.getHostname()))
    if (client) {
      client.reset()
      registerProperty(client)
      client.opt_in_capturing()
    }
    notify()
  }

  const denyConsent = (): void => {
    dependencies.writeCookie(serializeConsent('denied', dependencies.getHostname()))
    client?.opt_out_capturing()
    notify()
  }

  const subscribeConsent = (listener: () => void): (() => void) => {
    listeners.add(listener)
    return () => {
      listeners.delete(listener)
    }
  }

  const track = (event: AnalyticsEvent, properties?: Record<string, string>): void => {
    client?.capture(event, properties)
  }

  return {
    syncPath,
    grantConsent,
    denyConsent,
    getConsent,
    subscribeConsent,
    isMeasurementActive,
    setDisabled,
    track,
  }
}
