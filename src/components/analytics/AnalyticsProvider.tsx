'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getAnalytics } from '../../lib/analytics/browser.ts'

export function AnalyticsProvider({ isDisabled }: { isDisabled: boolean }) {
  const pathname = usePathname()

  useEffect(() => {
    if (!isDisabled) {
      getAnalytics().syncPath(pathname)
    }
  }, [isDisabled, pathname])

  return null
}
