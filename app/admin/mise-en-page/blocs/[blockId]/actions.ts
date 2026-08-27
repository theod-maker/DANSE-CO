'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../../../../../src/lib/db'
import type { Prisma } from '../../../../../src/generated/prisma/client'
import { getCurrentAdmin } from '../../../../../src/lib/adminAuth'
import {
  recordBlockHistory,
  publishBlock,
  discardBlockDraft,
  type FreeBlockContent,
  type FreeBlockKind,
} from '../../../../../src/lib/content/pageBlocks'
import {
  requiredText,
  optionalText,
  optionalImagePath,
  MAXIMUM_SHORT_TEXT,
  MAXIMUM_LONG_TEXT,
} from '../../../_shared/validation'

export interface SaveBlockFormState {
  status: 'idle' | 'success' | 'error'
  message?: string
}

function requiredLink(raw: string): { value: string } | { error: string } {
  const result = optionalImagePath(raw)
  if ('error' in result) return result
  if (!result.value) return { error: "L'adresse du lien est obligatoire." }
  return { value: result.value }
}

function readImageUrls(formData: FormData): string[] {
  return formData
    .getAll('imageUrls')
    .map((entry) => String(entry).trim())
    .filter((entry) => entry.length > 0)
}

function parseContent(kind: FreeBlockKind, formData: FormData): FreeBlockContent | { error: string } {
  if (kind === 'text') {
    const body = requiredText(String(formData.get('body') ?? ''), 'Le texte', MAXIMUM_LONG_TEXT)
    if ('error' in body) return { error: body.error }
    return { body: body.value }
  }

  if (kind === 'image') {
    const imageUrl = optionalImagePath(String(formData.get('imageUrl') ?? ''))
    if ('error' in imageUrl) return { error: imageUrl.error }
    if (!imageUrl.value) return { error: "L'image est obligatoire." }
    const caption = optionalText(String(formData.get('caption') ?? ''), 'La légende', MAXIMUM_SHORT_TEXT)
    if ('error' in caption) return { error: caption.error }
    return {
      imageUrl: imageUrl.value,
      caption: caption.value || null,
      fullWidth: formData.get('fullWidth') === 'on',
    }
  }

  if (kind === 'gallery') {
    const title = optionalText(String(formData.get('title') ?? ''), 'Le titre', MAXIMUM_SHORT_TEXT)
    if ('error' in title) return { error: title.error }
    const columnsRaw = String(formData.get('columns') ?? '3')
    const columns = columnsRaw === '2' ? 2 : 3
    return { title: title.value || null, imageUrls: readImageUrls(formData), columns }
  }

  if (kind === 'cta') {
    const title = optionalText(String(formData.get('title') ?? ''), 'Le titre', MAXIMUM_SHORT_TEXT)
    if ('error' in title) return { error: title.error }
    const description = optionalText(String(formData.get('description') ?? ''), 'La description', MAXIMUM_LONG_TEXT)
    if ('error' in description) return { error: description.error }
    const buttonLabel = requiredText(String(formData.get('buttonLabel') ?? ''), 'Le libellé du bouton', MAXIMUM_SHORT_TEXT)
    if ('error' in buttonLabel) return { error: buttonLabel.error }
    const buttonLink = requiredLink(String(formData.get('buttonLink') ?? ''))
    if ('error' in buttonLink) return { error: buttonLink.error }
    return {
      title: title.value || null,
      description: description.value || null,
      buttonLabel: buttonLabel.value,
      buttonLink: buttonLink.value,
    }
  }

  const year = requiredText(String(formData.get('year') ?? ''), "L'année", MAXIMUM_SHORT_TEXT)
  if ('error' in year) return { error: year.error }
  const label = requiredText(String(formData.get('label') ?? ''), 'Le titre', MAXIMUM_SHORT_TEXT)
  if ('error' in label) return { error: label.error }
  const text = requiredText(String(formData.get('text') ?? ''), 'Le texte', MAXIMUM_LONG_TEXT)
  if ('error' in text) return { error: text.error }
  return { year: year.value, label: label.value, text: text.value, imageUrls: readImageUrls(formData) }
}

export async function saveBlockContent(
  blockId: string,
  _previousState: SaveBlockFormState,
  formData: FormData
): Promise<SaveBlockFormState> {
  const account = await getCurrentAdmin()
  if (!account) return { status: 'error', message: 'Votre session a expiré. Reconnectez-vous.' }

  const block = await prisma.pageBlock.findUnique({ where: { id: blockId } })
  if (!block || block.kind === 'fixed') {
    return { status: 'error', message: 'Ce bloc n’existe plus.' }
  }

  const parsed = parseContent(block.kind as FreeBlockKind, formData)
  if ('error' in parsed) return { status: 'error', message: parsed.error }

  await recordBlockHistory(blockId, block.content, account.username)
  await prisma.pageBlock.update({
    where: { id: blockId },
    data: { content: parsed as unknown as Prisma.InputJsonValue },
  })

  revalidatePath(`/admin/mise-en-page/pages/${block.pageKey}`)
  revalidatePath(`/admin/mise-en-page/blocs/${blockId}`)

  return { status: 'success', message: 'Bloc enregistré.' }
}

export async function publishBlockAction(formData: FormData): Promise<void> {
  const blockId = String(formData.get('blockId') ?? '')
  if (!blockId) return
  await publishBlock(blockId)
}

export async function discardBlockAction(formData: FormData): Promise<void> {
  const blockId = String(formData.get('blockId') ?? '')
  if (!blockId) return
  await discardBlockDraft(blockId)
}
