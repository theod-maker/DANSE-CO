'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getAnalytics } from '../../lib/analytics/browser.ts'

export function AnalyticsProvider({ isDisabled }: { isDisabled: boolean }) {
  const pathname = usePathname()

  useEffect(() => {
    const analytics = getAnalytics()
    analytics.setDisabled(isDisabled)
    analytics.syncPath(pathname)
  }, [isDisabled, pathname])

  return null
}
