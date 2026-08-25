import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { SINGLETON_ID } from '../_shared/singleton-id'
import { PricingForm } from './pricing-form'

export const dynamic = 'force-dynamic'

export default async function PricingPage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const pricing = await prisma.pricing.findUnique({
    where: { id: SINGLETON_ID },
    include: { rows: { orderBy: { displayOrder: 'asc' } } },
  })

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Tarifs
      </h1>

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
