'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { validateNewsInput, type NewsFieldErrors } from './validation'

const LIST_PATH = '/admin/actualites'

export interface NewsFormState {
  errors?: NewsFieldErrors
  generalError?: string
  values?: {
    title: string
    date: string
    excerpt: string
    imageUrl: string
    link: string
  }
}

function readForm(formData: FormData) {
  return {
    title: String(formData.get('title') ?? ''),
    date: String(formData.get('date') ?? ''),
    excerpt: String(formData.get('excerpt') ?? ''),
    imageUrl: String(formData.get('imageUrl') ?? ''),
    link: String(formData.get('link') ?? ''),
  }
}

export async function saveNews(
  _previousState: NewsFormState,
  formData: FormData
): Promise<NewsFormState> {
  const account = await getCurrentAdmin()
  if (!account) {
    return { generalError: 'Votre session a expiré. Reconnectez-vous.' }
  }

  const values = readForm(formData)
  const { data, errors } = validateNewsInput(values)

  if (errors || !data) {
    return { errors, values }
  }

  const id = String(formData.get('id') ?? '')

  if (id) {
    const existing = await prisma.news.findUnique({ where: { id }, select: { id: true } })
    if (!existing) {
      return { generalError: 'Cette actualité n’existe plus.', values }
    }
    await prisma.news.update({ where: { id }, data })
  } else {
    await prisma.news.create({ data })
  }

  revalidatePath(LIST_PATH)
  redirect(LIST_PATH)
}

export async function deleteNews(formData: FormData): Promise<void> {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const id = String(formData.get('id') ?? '')
  if (!id) return

  await prisma.news.deleteMany({ where: { id } })

  revalidatePath(LIST_PATH)
  redirect(LIST_PATH)
}
