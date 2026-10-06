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
    warn: (message) => console.warn(message),
  })
  return instance
}
