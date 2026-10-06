'use client'

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { getAnalytics } from '../../lib/analytics/browser.ts'
import { computeBannerState } from '../../lib/analytics/banner-state.ts'
import { CONSENT_COPY, OPEN_PREFERENCES_EVENT } from './consent-copy.ts'
import styles from './ConsentBanner.module.css'

const subscribeToNothing = (): (() => void) => () => undefined

export function ConsentBanner({ isDisabled }: { isDisabled: boolean }) {
  const analytics = getAnalytics()
  const pathname = usePathname()
  const choice = useSyncExternalStore(
    analytics.subscribeConsent,
    analytics.getConsent,
    () => undefined
  )
  const isMounted = useSyncExternalStore(
    subscribeToNothing,
    () => true,
    () => false
  )
  const [isReopened, setIsReopened] = useState(false)
  const openerRef = useRef<HTMLElement | null>(null)
  const firstChoiceRef = useRef<HTMLButtonElement>(null)

  const { isVisible, announcedChoice } = computeBannerState({
    isMeasurementActive: isMounted && !isDisabled && analytics.isMeasurementActive(pathname),
    choice,
    isReopened,
  })

  useEffect(() => {
    const open = (): void => {
      openerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null
      setIsReopened(true)
    }
    window.addEventListener(OPEN_PREFERENCES_EVENT, open)
    return () => window.removeEventListener(OPEN_PREFERENCES_EVENT, open)
  }, [])

  useEffect(() => {
    if (isReopened) {
      firstChoiceRef.current?.focus()
    }
  }, [isReopened])

  const choose = useCallback(
    (nextChoice: 'granted' | 'denied') => {
      if (nextChoice === 'granted') {
        analytics.grantConsent()
      } else {
        analytics.denyConsent()
      }
      setIsReopened(false)
      const opener = openerRef.current
      openerRef.current = null
      const target = opener?.isConnected ? opener : document.querySelector<HTMLElement>('h1')
      if (target) {
        if (!target.hasAttribute('tabindex') && target.tagName === 'H1') {
          target.setAttribute('tabindex', '-1')
        }
        target.focus({ preventScroll: true })
      }
    },
    [analytics]
  )

  if (!isVisible) {
    return null
  }

  const status =
    announcedChoice === 'granted'
      ? CONSENT_COPY.statusGranted
      : announcedChoice === 'denied'
        ? CONSENT_COPY.statusDenied
        : undefined

  return (
    <section className={styles.banner} role="region" aria-labelledby="consent-title">
      <h2 id="consent-title" className={styles.title}>
        {CONSENT_COPY.title}
      </h2>
      {status && <p className={styles.status}>{status}</p>}
      <p className={styles.body}>{CONSENT_COPY.body}</p>
      <div className={styles.actions}>
        <button
          ref={firstChoiceRef}
          type="button"
          className={styles.choice}
          onClick={() => choose('denied')}
        >
          {CONSENT_COPY.refuse}
        </button>
        <button type="button" className={styles.choice} onClick={() => choose('granted')}>
          {CONSENT_COPY.accept}
        </button>
      </div>
      <Link href="/confidentialite" className={styles.link}>
        {CONSENT_COPY.learnMore}
      </Link>
    </section>
  )
}
