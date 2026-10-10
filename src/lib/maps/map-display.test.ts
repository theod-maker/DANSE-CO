import { test } from 'node:test'
import assert from 'node:assert/strict'
import { shouldDisplayMap } from './map-display.ts'

test('shows the map on its own once cookies are accepted', () => {
  assert.equal(shouldDisplayMap({ isMounted: true, consent: 'granted', isRequested: false }), true)
})

test('waits for a click when cookies are refused or not chosen', () => {
  assert.equal(shouldDisplayMap({ isMounted: true, consent: 'denied', isRequested: false }), false)
  assert.equal(shouldDisplayMap({ isMounted: true, consent: undefined, isRequested: false }), false)
})

test('shows the map after a click whatever the choice', () => {
  assert.equal(shouldDisplayMap({ isMounted: true, consent: 'denied', isRequested: true }), true)
  assert.equal(shouldDisplayMap({ isMounted: true, consent: undefined, isRequested: true }), true)
})

test('never renders the map on the server', () => {
  assert.equal(shouldDisplayMap({ isMounted: false, consent: 'granted', isRequested: true }), false)
})
