import Link from 'next/link'
import { redirect } from 'next/navigation'
import { prisma } from '../../../../src/lib/db'
import { getCurrentAdmin } from '../../../../src/lib/adminAuth'
import { VenueForm } from '../venue-form'

export const dynamic = 'force-dynamic'

export default async function EditVenuePage({ params }: { params: Promise<{ id: string }> }) {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const { id } = await params
  const venue = await prisma.venue.findUnique({ where: { id } })

  if (!venue) {
    return (
      <div>
        <h1
          className="text-3xl text-[#6C5CA8] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Salle introuvable
        </h1>
        <p className="mt-4 text-neutral-600">
          Cette salle a peut-être été supprimée entre-temps.
        </p>
        <Link
          href="/admin/salles"
          className="mt-6 inline-block text-sm text-[#6C5CA8] underline underline-offset-4"
        >
          Retour à la liste
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Modifier la salle
      </h1>

      <VenueForm
        initialValues={{
          id: venue.id,
          name: venue.name,
          address: venue.address,
          description: venue.description,
          amenities: venue.amenities,
          mapEmbedUrl: venue.mapEmbedUrl,
          googleMapsUrl: venue.googleMapsUrl,
          imageUrl: venue.imageUrl ?? '',
        }}
      />
    </div>
  )
}
