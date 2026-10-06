'use client'

import { useSyncExternalStore } from 'react'
import { usePathname } from 'next/navigation'
import { getAnalytics } from '../../lib/analytics/browser.ts'
import { FOOTER_LINK_CLASS } from '../layout/footer-styles.ts'
import { CONSENT_COPY, OPEN_PREFERENCES_EVENT } from './consent-copy.ts'

const subscribeToNothing = (): (() => void) => () => undefined

export function ConsentPreferencesButton() {
  const analytics = getAnalytics()
  const pathname = usePathname()
  useSyncExternalStore(
    analytics.subscribeConsent,
    analytics.getConsent,
    () => undefined
  )
  const isMounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  )

  if (!isMounted || !analytics.isMeasurementActive(pathname)) {
    return null
  }

  return (
    <button
      type="button"
      className={FOOTER_LINK_CLASS}
      onClick={() => window.dispatchEvent(new Event(OPEN_PREFERENCES_EVENT))}
    >
      {CONSENT_COPY.preferences}
    </button>
  )
}
