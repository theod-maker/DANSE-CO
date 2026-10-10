import { test } from 'node:test'
import assert from 'node:assert/strict'
import { googleMapsEmbedHref, isGoogleMapsEmbedUrl } from './map-embed.ts'
import { fallbackVenues } from '../fallbackContent.ts'

test('accepts the Google Maps embed addresses used by the site', () => {
  for (const venue of fallbackVenues) {
    assert.equal(isGoogleMapsEmbedUrl(venue.mapEmbedUrl), true, venue.name)
  }
  assert.equal(isGoogleMapsEmbedUrl('https://www.google.com/maps/embed?pb=!1m18'), true)
  assert.equal(isGoogleMapsEmbedUrl('https://www.google.com/maps/embed/v1/place?key=x&q=y'), true)
})

test('refuses every other host, scheme or path', () => {
  for (const url of [
    '',
    'not a url',
    '/maps/embed?pb=1',
    'http://www.google.com/maps/embed?pb=1',
    'https://www.google.com/maps/embedded?pb=1',
    'https://www.google.com/maps?pb=1',
    'https://www.google.com.evil.com/maps/embed?pb=1',
    'https://evil.com/maps/embed?https://www.google.com/maps/embed',
    'https://google.com/maps/embed?pb=1',
    'https://maps.google.com/maps/embed?pb=1',
    'https://user:pass@www.google.com/maps/embed?pb=1',
    'https://www.google.com:8443/maps/embed?pb=1',
    'javascript:alert(1)',
    'data:text/html,<script>alert(1)</script>',
    'https://www.google.com/%2e%2e/evil',
  ]) {
    assert.equal(isGoogleMapsEmbedUrl(url), false, url)
  }
})

test('refuses a path that only looks like the embed path after normalization', () => {
  assert.equal(isGoogleMapsEmbedUrl('https://www.google.com/maps/../evil/embed'), false)
  assert.equal(isGoogleMapsEmbedUrl('https://www.google.com/maps/embed/../../evil'), false)
})

test('returns the normalized address that the browser will load, never the raw string', () => {
  assert.equal(
    googleMapsEmbedHref('HTTPS://WWW.GOOGLE.COM:443/maps/embed?pb=!1m18'),
    'https://www.google.com/maps/embed?pb=!1m18'
  )
  assert.equal(googleMapsEmbedHref('https://www.google.com/maps/embed?pb=a b'), 'https://www.google.com/maps/embed?pb=a%20b')
  assert.equal(googleMapsEmbedHref('https://evil.com/maps/embed'), undefined)
  assert.equal(googleMapsEmbedHref(''), undefined)
})
