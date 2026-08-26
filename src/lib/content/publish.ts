import { revalidatePath, revalidateTag } from 'next/cache'
import { prisma } from '../db.ts'
import type { Prisma } from '../../generated/prisma/client.ts'
import { getCurrentAdmin } from '../adminAuth.ts'
import { recordHistory, type HistoryContentType } from './history.ts'
import { historyRegistry } from './historyRegistry.ts'
import { CONTENT_TAGS } from './revalidate.ts'

export type PublishResult = { ok: true } | { ok: false; error: string }

async function updatePublishedFields(
  contentType: HistoryContentType,
  entityId: string,
  data: { publishedSnapshot: Prisma.InputJsonValue; publishedAt: Date }
): Promise<void> {
  switch (contentType) {
    case 'homepage':
      await prisma.homepage.update({ where: { id: entityId }, data })
      return
    case 'siteInfo':
      await prisma.siteInfo.update({ where: { id: entityId }, data })
      return
    case 'pageTexts':
      await prisma.pageTexts.update({ where: { id: entityId }, data })
      return
    case 'registrationInfo':
      await prisma.registrationInfo.update({ where: { id: entityId }, data })
      return
    case 'pricing':
      await prisma.pricing.update({ where: { id: entityId }, data })
      return
    case 'instructors':
      await prisma.instructor.update({ where: { id: entityId }, data })
      return
    case 'disciplines':
      await prisma.discipline.update({ where: { id: entityId }, data })
      return
    case 'venues':
      await prisma.venue.update({ where: { id: entityId }, data })
      return
    case 'schedule':
      await prisma.scheduleEntry.update({ where: { id: entityId }, data })
      return
    case 'news':
      await prisma.news.update({ where: { id: entityId }, data })
      return
  }
}

async function readPublishedFields(
  contentType: HistoryContentType,
  entityId: string
): Promise<{ publishedSnapshot: Prisma.JsonValue | null; publishedAt: Date | null } | null> {
  switch (contentType) {
    case 'homepage':
      return prisma.homepage.findUnique({
        where: { id: entityId },
        select: { publishedSnapshot: true, publishedAt: true },
      })
    case 'siteInfo':
      return prisma.siteInfo.findUnique({
        where: { id: entityId },
        select: { publishedSnapshot: true, publishedAt: true },
      })
    case 'pageTexts':
      return prisma.pageTexts.findUnique({
        where: { id: entityId },
        select: { publishedSnapshot: true, publishedAt: true },
      })
    case 'registrationInfo':
      return prisma.registrationInfo.findUnique({
        where: { id: entityId },
        select: { publishedSnapshot: true, publishedAt: true },
      })
    case 'pricing':
      return prisma.pricing.findUnique({
        where: { id: entityId },
        select: { publishedSnapshot: true, publishedAt: true },
      })
    case 'instructors':
      return prisma.instructor.findUnique({
        where: { id: entityId },
        select: { publishedSnapshot: true, publishedAt: true },
      })
    case 'disciplines':
      return prisma.discipline.findUnique({
        where: { id: entityId },
        select: { publishedSnapshot: true, publishedAt: true },
      })
    case 'venues':
      return prisma.venue.findUnique({
        where: { id: entityId },
        select: { publishedSnapshot: true, publishedAt: true },
      })
    case 'schedule':
      return prisma.scheduleEntry.findUnique({
        where: { id: entityId },
        select: { publishedSnapshot: true, publishedAt: true },
      })
    case 'news':
      return prisma.news.findUnique({
        where: { id: entityId },
        select: { publishedSnapshot: true, publishedAt: true },
      })
  }
}

function stableStringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`
  }
  if (value !== null && typeof value === 'object') {
    const keys = Object.keys(value as Record<string, unknown>).sort()
    const entries = keys.map((key) => `${JSON.stringify(key)}:${stableStringify((value as Record<string, unknown>)[key])}`)
    return `{${entries.join(',')}}`
  }
  return JSON.stringify(value)
}

export async function hasPendingChanges(
  contentType: HistoryContentType,
  entityId: string
): Promise<boolean> {
  const row = await readPublishedFields(contentType, entityId)
  if (!row) return false

  const current = await historyRegistry[contentType].fetchCurrent(entityId)
  if (!current) return false

  if (row.publishedSnapshot === null) return true

  return stableStringify(current.data) !== stableStringify(row.publishedSnapshot)
}

export async function publishContent(
  contentType: HistoryContentType,
  entityId: string
): Promise<PublishResult> {
  const account = await getCurrentAdmin()
  if (!account) {
    return { ok: false, error: 'Votre session a expiré. Reconnectez-vous.' }
  }

  const current = await historyRegistry[contentType].fetchCurrent(entityId)
  if (!current) {
    return { ok: false, error: 'Cet élément n’existe plus.' }
  }

  await updatePublishedFields(contentType, entityId, {
    publishedSnapshot: current.data,
    publishedAt: new Date(),
  })

  revalidatePath(historyRegistry[contentType].listPath)
  revalidateTag(CONTENT_TAGS[contentType])

  return { ok: true }
}

export async function discardDraft(
  contentType: HistoryContentType,
  entityId: string
): Promise<PublishResult> {
  const account = await getCurrentAdmin()
  if (!account) {
    return { ok: false, error: 'Votre session a expiré. Reconnectez-vous.' }
  }

  const published = await readPublishedFields(contentType, entityId)
  if (!published || !published.publishedSnapshot) {
    return { ok: false, error: 'Jamais publié, rien à restaurer.' }
  }

  const current = await historyRegistry[contentType].fetchCurrent(entityId)
  if (current) {
    await recordHistory({
      contentType,
      entityId,
      action: 'update',
      label: current.label,
      snapshot: current.data,
      adminUsername: account.username,
    })
  }

  await historyRegistry[contentType].applySnapshot(entityId, published.publishedSnapshot)

  revalidatePath(historyRegistry[contentType].listPath)

  return { ok: true }
}
