import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { SINGLETON_ID } from '../_shared/singleton-id'
import { HistoryLink } from '../_shared/history-link'
import { RegistrationForm } from './registration-form'

export const dynamic = 'force-dynamic'

const EMPTY = {
  permanence1Days: '',
  permanence1Hours: '',
  permanence1Venue: '',
  permanence2Days: '',
  permanence2Hours: '',
  permanence2Venue: '',
  requiredDocuments: [] as string[],
  photoNote: '',
}

export default async function RegistrationPage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const stored = await prisma.registrationInfo.findUnique({ where: { id: SINGLETON_ID } })

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1
          className="text-3xl text-[#6C5CA8] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Inscriptions
        </h1>
        <HistoryLink contentType="registrationInfo" entityId={SINGLETON_ID} />
      </div>

      <p className="mt-3 text-sm text-neutral-500">
        Vos permanences et les documents à fournir, affichés sur la page Planning.
      </p>

      <RegistrationForm
        initialValues={
          stored
            ? {
                permanence1Days: stored.permanence1Days,
                permanence1Hours: stored.permanence1Hours,
                permanence1Venue: stored.permanence1Venue,
                permanence2Days: stored.permanence2Days,
                permanence2Hours: stored.permanence2Hours,
                permanence2Venue: stored.permanence2Venue,
                requiredDocuments: stored.requiredDocuments,
                photoNote: stored.photoNote,
              }
            : EMPTY
        }
      />
    </div>
  )
}
