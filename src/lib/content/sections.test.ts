import { test } from 'node:test'
import assert from 'node:assert/strict'
import { defaultSections, resolveSections } from './sections.ts'

function visibleKeys(sections: { key: string; visible: boolean }[]): string[] {
  return sections.filter((section) => section.visible).map((section) => section.key)
}

test('home shows only the news section by default, like the live site', () => {
  assert.deepEqual(visibleKeys(defaultSections()), ['news'])
})

test('a section saved as visible by the admin is shown', () => {
  const sections = resolveSections([{ sectionKey: 'about', displayOrder: 0, visible: true }])
  assert.deepEqual(visibleKeys(sections), ['about', 'news'])
})

test('a section never saved keeps its default visibility', () => {
  const sections = resolveSections([{ sectionKey: 'news', displayOrder: 0, visible: false }])
  assert.deepEqual(visibleKeys(sections), [])
})
