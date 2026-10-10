import type { ConsentChoice } from '../analytics/consent.ts'

export interface MapDisplayInput {
  isMounted: boolean
  consent: ConsentChoice | undefined
  isRequested: boolean
}

export function shouldDisplayMap({ isMounted, consent, isRequested }: MapDisplayInput): boolean {
  return isMounted && (isRequested || consent === 'granted')
}
