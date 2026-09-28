'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { SINGLETON_ID } from '../_shared/singleton-id'
import { validatePricingInput, type PricingFieldErrors } from './validation'
import { recordHistory } from '../../../src/lib/content/history'

const PATH = '/admin/tarifs'

export interface PricingFormValues {
  season: string
  membershipFee: string
  infoItems: string[]
  rows: { label: string; price: string; detail: string; highlight: boolean }[]
}

export interface PricingFormState {
  status: 'idle' | 'success' | 'error'
  message?: string
  errors?: PricingFieldErrors
  values?: PricingFormValues
}

function readRows(formData: FormData) {
  const labels = formData.getAll('rowLabel').map((entry) => String(entry))
  const prices = formData.getAll('rowPrice').map((entry) => String(entry))
  const details = formData.getAll('rowDetail').map((entry) => String(entry))
  const highlighted = String(formData.get('highlightedRow') ?? '')

  return labels.map((label, index) => ({
    label,
    price: prices[index] ?? '',
    detail: details[index] ?? '',
    highlight: highlighted === String(index),
  }))
}

export async function savePricing(
  _previousState: PricingFormState,
  formData: FormData
): Promise<PricingFormState> {
  const account = await getCurrentAdmin()
  if (!account) {
    return { status: 'error', message: 'Votre session a expiré. Reconnectez-vous.' }
  }

  const values: PricingFormValues = {
    season: String(formData.get('season') ?? ''),
    membershipFee: String(formData.get('membershipFee') ?? ''),
    infoItems: formData.getAll('infoItems').map((entry) => String(entry)),
    rows: readRows(formData),
  }

  const { data, errors } = validatePricingInput(values)
  if (errors || !data) {
    return { status: 'error', errors, values }
  }

  const existing = await prisma.pricing.findUnique({
    where: { id: SINGLETON_ID },
    include: { rows: { orderBy: { displayOrder: 'asc' } } },
  })
  if (existing) {
    const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, publishedSnapshot: _publishedSnapshot, publishedAt: _publishedAt, rows, ...existingData } = existing
    await recordHistory({
      contentType: 'pricing',
      entityId: SINGLETON_ID,
      action: 'update',
      label: 'Tarifs',
      snapshot: {
        ...existingData,
        rows: rows.map(({ label, price, detail, highlight, displayOrder }) => ({
          label,
          price,
          detail,
          highlight,
          displayOrder,
        })),
      },
      adminUsername: account.username,
    })
  }

  await prisma.$transaction([
    prisma.pricingRow.deleteMany({ where: { pricingId: SINGLETON_ID } }),
    prisma.pricing.upsert({
      where: { id: SINGLETON_ID },
      update: {
        season: data.season,
        membershipFee: data.membershipFee,
        infoItems: data.infoItems,
      },
      create: {
        id: SINGLETON_ID,
        season: data.season,
        membershipFee: data.membershipFee,
        infoItems: data.infoItems,
      },
    }),
    prisma.pricingRow.createMany({
      data: data.rows.map((row, index) => ({
        pricingId: SINGLETON_ID,
        label: row.label,
        price: row.price,
        detail: row.detail,
        highlight: row.highlight,
        displayOrder: index,
      })),
    }),
  ])

  revalidatePath(PATH)

  return { status: 'success', message: 'Tarifs enregistrés.' }
}
