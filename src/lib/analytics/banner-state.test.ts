import { test } from 'node:test'
import assert from 'node:assert/strict'
import { computeBannerState } from './banner-state.ts'

test('is never visible when measurement is inactive', () => {
  for (const choice of [undefined, 'granted', 'denied'] as const) {
    for (const isReopened of [false, true]) {
      assert.deepEqual(computeBannerState({ isMeasurementActive: false, choice, isReopened }), {
        isVisible: false,
        announcedChoice: undefined,
      })
    }
  }
})

test('is visible without a stored choice and announces nothing', () => {
  assert.deepEqual(
    computeBannerState({ isMeasurementActive: true, choice: undefined, isReopened: false }),
    { isVisible: true, announcedChoice: undefined }
  )
})

test('stays closed once a choice is stored', () => {
  assert.deepEqual(
    computeBannerState({ isMeasurementActive: true, choice: 'denied', isReopened: false }),
    { isVisible: false, announcedChoice: undefined }
  )
})

test('reopens from the footer and announces the current choice', () => {
  assert.deepEqual(
    computeBannerState({ isMeasurementActive: true, choice: 'granted', isReopened: true }),
    { isVisible: true, announcedChoice: 'granted' }
  )
})

test('reopened without any stored choice announces nothing', () => {
  assert.deepEqual(
    computeBannerState({ isMeasurementActive: true, choice: undefined, isReopened: true }),
    { isVisible: true, announcedChoice: undefined }
  )
})
