import type { ReactNode } from 'react'
import AppNavbar from '../layout/AppNavbar'
import AppFooter from '../layout/AppFooter'
import type { SiteInfoContent } from '../../lib/fallbackContent'

interface LegalPageProps {
  title: string
  intro: string
  siteInfo: SiteInfoContent
  children: ReactNode
}

export function LegalPage({ title, intro, siteInfo, children }: LegalPageProps) {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <AppNavbar />
      <main id="main" className="max-w-3xl mx-auto px-6 pt-40 pb-32">
        <h1
          style={{ fontFamily: "'Instrument Serif', serif" }}
          className="text-4xl sm:text-5xl tracking-tight leading-[1.1] text-[#18102E] mb-6"
        >
          {title}
        </h1>
        <p className="text-[#18102E]/60 text-base mb-12">{intro}</p>
        <div className="space-y-10 text-[#18102E]/80 text-[0.95rem] leading-relaxed">{children}</div>
      </main>
      <AppFooter siteInfo={siteInfo} />
    </div>
  )
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2
        style={{ fontFamily: "'Instrument Serif', serif" }}
        className="text-2xl text-[#18102E] mb-4"
      >
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  )
}
