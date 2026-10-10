import { createAnalytics, type Analytics, type PostHogLike } from './client.ts'

const IDLE_FALLBACK_MS = 2000

function whenIdle(): Promise<void> {
  return new Promise((resolve) => {
    const start = (): void => {
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => resolve(), { timeout: IDLE_FALLBACK_MS })
      } else {
        setTimeout(resolve, IDLE_FALLBACK_MS)
      }
    }
    if (document.readyState === 'complete') {
      start()
    } else {
      window.addEventListener('load', start, { once: true })
    }
  })
}

async function loadPosthog(): Promise<PostHogLike> {
  const { default: posthog } = await import('posthog-js')
  return posthog
}

const STALE_STATE_PREFIXES = ['ph_', '__ph_']
const COOKIE_DOMAIN = '.dansandco.fr'

function hasStalePrefix(name: string): boolean {
  return STALE_STATE_PREFIXES.some((prefix) => name.startsWith(prefix))
}

function purgeStaleState(): void {
  for (const entry of document.cookie.split(';')) {
    const name = entry.split('=')[0].trim()
    if (hasStalePrefix(name)) {
      document.cookie = `${name}=; Max-Age=0; Path=/`
      document.cookie = `${name}=; Max-Age=0; Path=/; Domain=${COOKIE_DOMAIN}`
    }
  }
  for (const storage of [window.localStorage, window.sessionStorage]) {
    for (const name of Object.keys(storage)) {
      if (hasStalePrefix(name)) {
        storage.removeItem(name)
      }
    }
  }
}

let instance: Analytics | undefined

export function getAnalytics(): Analytics {
  instance ??= createAnalytics({
    key: process.env.NEXT_PUBLIC_POSTHOG_KEY || undefined,
    allowPreview: process.env.NEXT_PUBLIC_ANALYTICS_ALLOW_PREVIEW === 'true',
    getHostname: () => window.location.hostname,
    readCookie: () => document.cookie,
    writeCookie: (value) => {
      document.cookie = value
    },
    onIdle: whenIdle,
    loadPosthog,
    purgeStaleState,
    warn: (message) => console.warn(message),
  })
  return instance
}
