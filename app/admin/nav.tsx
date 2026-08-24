'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface NavEntry {
  label: string
  href: string
  available: boolean
}

const COLLECTIONS: NavEntry[] = [
  { label: 'Actualités', href: '/admin/actualites', available: true },
  { label: 'Planning', href: '/admin/planning', available: false },
  { label: 'Disciplines', href: '/admin/disciplines', available: false },
  { label: 'Professeurs', href: '/admin/professeurs', available: false },
  { label: 'Salles', href: '/admin/salles', available: false },
]

const PAGES: NavEntry[] = [
  { label: 'Accueil', href: '/admin/accueil', available: false },
  { label: 'Tarifs', href: '/admin/tarifs', available: false },
  { label: 'Inscriptions', href: '/admin/inscriptions', available: false },
  { label: 'Textes des pages', href: '/admin/textes', available: false },
  { label: 'Informations du site', href: '/admin/informations', available: false },
]

const ACCOUNT: NavEntry[] = [{ label: 'Mon compte', href: '/admin/compte', available: true }]

function NavGroup({ title, entries, pathname }: { title: string; entries: NavEntry[]; pathname: string }) {
  return (
    <div className="mb-7">
      <p className="mb-2 text-xs uppercase tracking-wider text-neutral-400">{title}</p>
      <ul className="space-y-1">
        {entries.map((entry) => {
          const isActive = pathname === entry.href

          if (!entry.available) {
            return (
              <li
                key={entry.href}
                className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-neutral-400"
              >
                <span>{entry.label}</span>
                <span className="text-[11px] text-neutral-400">bientôt</span>
              </li>
            )
          }

          return (
            <li key={entry.href}>
              <Link
                href={entry.href}
                aria-current={isActive ? 'page' : undefined}
                className={
                  isActive
                    ? 'block rounded-md bg-[#6C5CA8] px-3 py-2 text-sm text-white'
                    : 'block rounded-md px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-[#6C5CA8]/10 hover:text-[#6C5CA8]'
                }
              >
                {entry.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function AdminNav() {
  const pathname = usePathname()

  return (
    <nav aria-label="Sections d'administration">
      <Link
        href="/admin"
        className={
          pathname === '/admin'
            ? 'mb-7 block rounded-md bg-[#6C5CA8] px-3 py-2 text-sm text-white'
            : 'mb-7 block rounded-md px-3 py-2 text-sm text-neutral-700 transition-colors hover:bg-[#6C5CA8]/10 hover:text-[#6C5CA8]'
        }
      >
        Vue d&apos;ensemble
      </Link>

      <NavGroup title="Contenus" entries={COLLECTIONS} pathname={pathname} />
      <NavGroup title="Pages" entries={PAGES} pathname={pathname} />
      <NavGroup title="Compte" entries={ACCOUNT} pathname={pathname} />
    </nav>
  )
}
