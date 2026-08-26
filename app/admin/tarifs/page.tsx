import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { SINGLETON_ID } from '../_shared/singleton-id'
import { HistoryLink } from '../_shared/history-link'
import { PublishStatus } from '../_shared/publish-status'
import { resolvePublishState } from '../_shared/resolve-publish-state'
import { PricingForm } from './pricing-form'

export const dynamic = 'force-dynamic'

export default async function PricingPage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const pricing = await prisma.pricing.findUnique({
    where: { id: SINGLETON_ID },
    include: { rows: { orderBy: { displayOrder: 'asc' } } },
  })
  const publishState = await resolvePublishState('pricing', SINGLETON_ID, pricing?.publishedAt ?? null)

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1
          className="text-3xl text-[#6C5CA8] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Tarifs
        </h1>
        <div className="flex items-center gap-4">
          <PublishStatus contentType="pricing" entityId={SINGLETON_ID} state={publishState} />
          <HistoryLink contentType="pricing" entityId={SINGLETON_ID} />
        </div>
      </div>

      <p className="mt-3 text-sm text-neutral-500">
        La grille tarifaire de la saison, affichée sur la page Tarifs.
      </p>

      <PricingForm
        initialValues={{
          season: pricing?.season ?? '',
          membershipFee: pricing?.membershipFee ?? '',
          infoItems: pricing?.infoItems ?? [],
          rows:
            pricing?.rows.map((row) => ({
              label: row.label,
              price: row.price,
              detail: row.detail,
              highlight: row.highlight,
            })) ?? [],
        }}
      />
    </div>
  )
}
