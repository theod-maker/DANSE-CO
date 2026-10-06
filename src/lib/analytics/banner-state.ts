import type { ConsentChoice } from './consent.ts'

export interface BannerStateInput {
  isMeasurementActive: boolean
  choice: ConsentChoice | undefined
  isReopened: boolean
}

export interface BannerState {
  isVisible: boolean
  announcedChoice: ConsentChoice | undefined
}

export function computeBannerState({
  isMeasurementActive,
  choice,
  isReopened,
}: BannerStateInput): BannerState {
  if (!isMeasurementActive) {
    return { isVisible: false, announcedChoice: undefined }
  }
  if (isReopened) {
    return { isVisible: true, announcedChoice: choice }
  }
  return { isVisible: choice === undefined, announcedChoice: undefined }
}
