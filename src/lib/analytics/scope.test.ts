import { test } from 'node:test'
import assert from 'node:assert/strict'
import { isAnalyticsHost, isEventAllowed, isExcludedPath } from './scope.ts'

test('accepts the production hosts', () => {
  assert.equal(isAnalyticsHost('dansandco.fr', false), true)
  assert.equal(isAnalyticsHost('www.dansandco.fr', false), true)
})

test('is case-insensitive on the host', () => {
  assert.equal(isAnalyticsHost('DansAndCo.FR', false), true)
})

test('rejects look-alike and unknown hosts', () => {
  assert.equal(isAnalyticsHost('dansandco.fr.evil.com', false), false)
  assert.equal(isAnalyticsHost('evil-dansandco.fr', false), false)
  assert.equal(isAnalyticsHost('app.dansandco.fr', false), false)
  assert.equal(isAnalyticsHost('', false), false)
})

test('rejects vercel and local hosts without the preview flag', () => {
  assert.equal(isAnalyticsHost('danse-abc123.vercel.app', false), false)
  assert.equal(isAnalyticsHost('localhost', false), false)
  assert.equal(isAnalyticsHost('127.0.0.1', false), false)
})

test('accepts vercel and local hosts with the preview flag', () => {
  assert.equal(isAnalyticsHost('danse-abc123.vercel.app', true), true)
  assert.equal(isAnalyticsHost('localhost', true), true)
  assert.equal(isAnalyticsHost('127.0.0.1', true), true)
})

test('keeps rejecting look-alike hosts with the preview flag', () => {
  assert.equal(isAnalyticsHost('vercel.app.evil.com', true), false)
  assert.equal(isAnalyticsHost('evilvercel.app', true), false)
  assert.equal(isAnalyticsHost('localhost.evil.com', true), false)
})

test('excludes admin, studio and api paths and their children', () => {
  for (const path of ['/admin', '/admin/', '/admin/login', '/studio', '/studio/desk', '/api', '/api/revalidate']) {
    assert.equal(isExcludedPath(path), true, path)
  }
})

test('does not exclude a path that merely starts with the same letters', () => {
  for (const path of ['/administration', '/adminx', '/apiary', '/studios', '/planning', '/']) {
    assert.equal(isExcludedPath(path), false, path)
  }
})

test('normalizes case, repeated slashes and percent-encoding', () => {
  for (const path of ['/ADMIN', '//admin', '/%61dmin', '/Admin/Login', '/admin/../admin']) {
    assert.equal(isExcludedPath(path), true, path)
  }
})

test('rejects an undecodable path as excluded', () => {
  assert.equal(isExcludedPath('/%E0%A4%A'), true)
})

test('allows a public page on a production host', () => {
  assert.equal(isEventAllowed('https://dansandco.fr/planning', false), true)
  assert.equal(isEventAllowed('https://www.dansandco.fr/', false), true)
})

test('refuses an event on an excluded path', () => {
  assert.equal(isEventAllowed('https://dansandco.fr/admin/login', false), false)
  assert.equal(isEventAllowed('https://dansandco.fr/studio', false), false)
})

test('refuses an event on another host', () => {
  assert.equal(isEventAllowed('https://example.com/planning', false), false)
  assert.equal(isEventAllowed('https://danse-abc.vercel.app/planning', false), false)
})

test('refuses an invalid or relative url', () => {
  assert.equal(isEventAllowed('not a url', false), false)
  assert.equal(isEventAllowed('/planning', false), false)
  assert.equal(isEventAllowed('', false), false)
})

test('ignores the port when checking the host', () => {
  assert.equal(isEventAllowed('http://localhost:3000/planning', true), true)
  assert.equal(isEventAllowed('http://localhost:3000/planning', false), false)
})
