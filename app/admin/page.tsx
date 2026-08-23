import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '../../src/lib/adminAuth'
import { LogoutButton } from './logout-button'

export const dynamic = 'force-dynamic'

export default async function AdminHomePage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <header className="flex items-baseline justify-between border-b border-neutral-200 pb-6">
        <div>
          <h1
            className="text-3xl text-[#6C5CA8] tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Administration
          </h1>
          <p className="mt-1 text-sm text-neutral-500">Connecté en tant que {account.displayName}</p>
        </div>
        <LogoutButton />
      </header>

      <section className="mt-10">
        <p className="text-neutral-600">
          L&apos;espace de gestion du contenu arrive à la prochaine étape. Vous pourrez y modifier le
          planning, les actualités, les tarifs, les disciplines, les professeurs et les salles.
        </p>
      </section>
    </main>
  )
}
