import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '../../../../src/lib/adminAuth'
import { VenueForm } from '../venue-form'

export const dynamic = 'force-dynamic'

export default async function NewVenuePage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Nouvelle salle
      </h1>

      <VenueForm
        initialValues={{
          name: '',
          address: '',
          description: '',
          amenities: [],
          mapEmbedUrl: '',
          googleMapsUrl: '',
          imageUrl: '',
        }}
      />
    </div>
  )
}
