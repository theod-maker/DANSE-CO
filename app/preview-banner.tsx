'use client'

import { usePathname } from 'next/navigation'

export function PreviewBanner() {
  const pathname = usePathname()

  return (
    <div className="fixed inset-x-0 top-0 z-50 flex items-center justify-center gap-4 bg-[#6C5CA8] px-4 py-2 text-sm text-white">
      <span>Aperçu — vous voyez des modifications non publiées</span>
      <a
        href={`/api/apercu/quitter?path=${encodeURIComponent(pathname)}`}
        className="rounded-md bg-white/15 px-3 py-1 underline-offset-4 transition-colors hover:bg-white/25 hover:underline"
      >
        Quitter l&apos;aperçu
      </a>
    </div>
  )
}
