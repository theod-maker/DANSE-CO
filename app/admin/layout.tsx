import type { ReactNode } from 'react'
import { getCurrentAdmin } from '../../src/lib/adminAuth'
import { AdminNav } from './nav'
import { LogoutButton } from './logout-button'

export const metadata = {
  title: 'Administration — Dans&Co',
  robots: { index: false, follow: false },
}

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const account = await getCurrentAdmin()

  if (!account) return <div className="min-h-screen bg-[#faf8f5]">{children}</div>

  return (
    <div className="min-h-screen bg-[#faf8f5]">
      <header className="border-b border-neutral-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-baseline justify-between px-6 py-5">
          <span
            className="text-xl text-[#6C5CA8] tracking-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Dans&apos;&amp;Co — Administration
          </span>
          <span className="flex items-baseline gap-4 text-sm text-neutral-500">
            {account.displayName}
            <LogoutButton />
          </span>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-10 px-6 py-10">
        <aside className="w-56 shrink-0">
          <AdminNav />
        </aside>
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  )
}
