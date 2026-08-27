import Link from 'next/link'
import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { PAGE_BLOCK_PAGE_KEYS } from '../../../src/lib/content/revalidate'
import { PAGE_LABELS } from '../../../src/lib/content/pageBlockLabels'

export const dynamic = 'force-dynamic'

export default async function MiseEnPagePicker() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Mise en page
      </h1>

      <p className="mt-3 max-w-2xl text-sm text-neutral-500">
        Choisissez une page pour réorganiser ses blocs, en masquer, ou en ajouter de
        nouveaux.
      </p>

      <ul className="mt-8 divide-y divide-neutral-200 border-t border-neutral-200">
        <li className="py-4">
          <Link
            href="/admin/mise-en-page/accueil"
            className="text-neutral-900 underline-offset-4 hover:text-[#6C5CA8] hover:underline"
          >
            Accueil
          </Link>
        </li>
        {PAGE_BLOCK_PAGE_KEYS.map((pageKey) => (
          <li key={pageKey} className="py-4">
            <Link
              href={`/admin/mise-en-page/pages/${pageKey}`}
              className="text-neutral-900 underline-offset-4 hover:text-[#6C5CA8] hover:underline"
            >
              {PAGE_LABELS[pageKey]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
