import { prisma } from '../db.ts'
import type { Prisma, DisciplineIcon } from '../../generated/prisma/client.ts'
import type { HistoryContentType } from './history.ts'

const SINGLETON_ID = 'singleton'

export interface HistoryRestoreTarget {
  data: Prisma.InputJsonValue
  label: string
}

export interface HistoryRegistryEntry {
  listPath: string
  fetchCurrent(entityId: string): Promise<HistoryRestoreTarget | null>
  applySnapshot(entityId: string, snapshot: Prisma.JsonValue): Promise<void>
}

export const historyRegistry: Record<HistoryContentType, HistoryRegistryEntry> = {
  homepage: {
    listPath: '/admin/accueil',
    async fetchCurrent(entityId) {
      const row = await prisma.homepage.findUnique({ where: { id: entityId } })
      if (!row) return null
      const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = row
      return { data, label: "Page d'accueil" }
    },
    async applySnapshot(entityId, snapshot) {
      const data = snapshot as Prisma.HomepageUncheckedCreateInput
      await prisma.homepage.upsert({
        where: { id: entityId },
        update: data,
        create: { ...data, id: entityId },
      })
    },
  },

  siteInfo: {
    listPath: '/admin/informations',
    async fetchCurrent(entityId) {
      const row = await prisma.siteInfo.findUnique({ where: { id: entityId } })
      if (!row) return null
      const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = row
      return { data, label: 'Informations du site' }
    },
    async applySnapshot(entityId, snapshot) {
      const data = snapshot as Prisma.SiteInfoUncheckedCreateInput
      await prisma.siteInfo.upsert({
        where: { id: entityId },
        update: data,
        create: { ...data, id: entityId },
      })
    },
  },

  pageTexts: {
    listPath: '/admin/textes',
    async fetchCurrent(entityId) {
      const row = await prisma.pageTexts.findUnique({ where: { id: entityId } })
      if (!row) return null
      const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = row
      return { data, label: 'Textes des pages' }
    },
    async applySnapshot(entityId, snapshot) {
      const data = snapshot as Prisma.PageTextsUncheckedCreateInput
      await prisma.pageTexts.upsert({
        where: { id: entityId },
        update: data,
        create: { ...data, id: entityId },
      })
    },
  },

  registrationInfo: {
    listPath: '/admin/inscriptions',
    async fetchCurrent(entityId) {
      const row = await prisma.registrationInfo.findUnique({ where: { id: entityId } })
      if (!row) return null
      const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = row
      return { data, label: 'Inscriptions' }
    },
    async applySnapshot(entityId, snapshot) {
      const data = snapshot as Prisma.RegistrationInfoUncheckedCreateInput
      await prisma.registrationInfo.upsert({
        where: { id: entityId },
        update: data,
        create: { ...data, id: entityId },
      })
    },
  },

  pricing: {
    listPath: '/admin/tarifs',
    async fetchCurrent(entityId) {
      const row = await prisma.pricing.findUnique({
        where: { id: entityId },
        include: { rows: { orderBy: { displayOrder: 'asc' } } },
      })
      if (!row) return null
      const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, rows, ...data } = row
      return {
        data: {
          ...data,
          rows: rows.map(({ label, price, detail, highlight, displayOrder }) => ({
            label,
            price,
            detail,
            highlight,
            displayOrder,
          })),
        },
        label: 'Tarifs',
      }
    },
    async applySnapshot(entityId, snapshot) {
      const { rows, ...data } = snapshot as {
        rows: { label: string; price: string; detail: string; highlight: boolean; displayOrder: number }[]
      } & Prisma.PricingUncheckedCreateInput

      await prisma.$transaction([
        prisma.pricingRow.deleteMany({ where: { pricingId: entityId } }),
        prisma.pricing.upsert({
          where: { id: entityId },
          update: data,
          create: { ...data, id: entityId },
        }),
        prisma.pricingRow.createMany({
          data: rows.map((row) => ({ ...row, pricingId: entityId })),
        }),
      ])
    },
  },

  instructors: {
    listPath: '/admin/professeurs',
    async fetchCurrent(entityId) {
      const row = await prisma.instructor.findUnique({ where: { id: entityId } })
      if (!row) return null
      const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = row
      return { data, label: row.name }
    },
    async applySnapshot(entityId, snapshot) {
      const data = snapshot as Prisma.InstructorUncheckedCreateInput
      await prisma.instructor.upsert({
        where: { id: entityId },
        update: data,
        create: { ...data, id: entityId },
      })
    },
  },

  disciplines: {
    listPath: '/admin/disciplines',
    async fetchCurrent(entityId) {
      const row = await prisma.discipline.findUnique({ where: { id: entityId } })
      if (!row) return null
      const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = row
      return { data, label: row.title }
    },
    async applySnapshot(entityId, snapshot) {
      const data = snapshot as Prisma.DisciplineUncheckedCreateInput & { iconName: DisciplineIcon }
      await prisma.discipline.upsert({
        where: { id: entityId },
        update: data,
        create: { ...data, id: entityId },
      })
    },
  },

  venues: {
    listPath: '/admin/salles',
    async fetchCurrent(entityId) {
      const row = await prisma.venue.findUnique({ where: { id: entityId } })
      if (!row) return null
      const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = row
      return { data, label: row.name }
    },
    async applySnapshot(entityId, snapshot) {
      const data = snapshot as Prisma.VenueUncheckedCreateInput
      await prisma.venue.upsert({
        where: { id: entityId },
        update: data,
        create: { ...data, id: entityId },
      })
    },
  },

  schedule: {
    listPath: '/admin/planning',
    async fetchCurrent(entityId) {
      const row = await prisma.scheduleEntry.findUnique({ where: { id: entityId } })
      if (!row) return null
      const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, ...data } = row
      return { data, label: row.name }
    },
    async applySnapshot(entityId, snapshot) {
      const data = snapshot as Prisma.ScheduleEntryUncheckedCreateInput
      await prisma.scheduleEntry.upsert({
        where: { id: entityId },
        update: data,
        create: { ...data, id: entityId },
      })
    },
  },

  news: {
    listPath: '/admin/actualites',
    async fetchCurrent(entityId) {
      const row = await prisma.news.findUnique({ where: { id: entityId } })
      if (!row) return null
      const { id: _id, createdAt: _createdAt, updatedAt: _updatedAt, date, ...data } = row
      return { data: { ...data, date: date.toISOString() }, label: row.title }
    },
    async applySnapshot(entityId, snapshot) {
      const { date, ...data } = snapshot as Prisma.NewsUncheckedCreateInput & { date: string }
      await prisma.news.upsert({
        where: { id: entityId },
        update: { ...data, date: new Date(date) },
        create: { ...data, id: entityId, date: new Date(date) },
      })
    },
  },
}
