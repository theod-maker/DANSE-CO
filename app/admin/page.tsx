import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '../../src/lib/adminAuth'
import { PreviewLink } from './_shared/preview-link'

export const dynamic = 'force-dynamic'

export default async function AdminHomePage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Bonjour {account.displayName}
      </h1>

      <div className="mt-3">
        <PreviewLink publicPath="/" />
      </div>

      <p className="mt-4 max-w-2xl text-neutral-600">
        Cet espace vous permettra de modifier le contenu du site sans passer par personne.
        Les sections marquées « bientôt » dans le menu sont en cours de construction.
      </p>

      <p className="mt-4 max-w-2xl text-neutral-600">
        En attendant, vous pouvez déjà changer votre mot de passe depuis la section
        <span className="whitespace-nowrap"> « Mon compte »</span>.
      </p>
    </div>
  )
}
