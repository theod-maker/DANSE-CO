import { test } from 'node:test'
import assert from 'node:assert/strict'
import { defaultPageBlocks } from './defaultBlocks.ts'
import { PAGE_BLOCK_PAGE_KEYS } from './revalidate.ts'

test('every public page has default blocks so it can never render empty', () => {
  for (const pageKey of PAGE_BLOCK_PAGE_KEYS) {
    assert.ok(defaultPageBlocks(pageKey).length > 0, `${pageKey} has no default block`)
  }
})

test('planning keeps its schedule, registration and formulas blocks in order', () => {
  const fixedKeys = defaultPageBlocks('planning').map((block) =>
    block.kind === 'fixed' ? block.fixedKey : block.kind
  )
  assert.deepEqual(fixedKeys, ['scheduleGrid', 'registrationInfo', 'specialFormulas'])
})

test('histoire defaults to its four timeline events with content', () => {
  const blocks = defaultPageBlocks('histoire')
  assert.equal(blocks.length, 4)
  assert.ok(blocks.every((block) => block.kind === 'timelineEvent' && block.content !== null))
})
