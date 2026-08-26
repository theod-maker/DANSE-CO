import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { SINGLETON_ID } from '../_shared/singleton-id'
import { HistoryLink } from '../_shared/history-link'
import { SiteInfoForm } from './site-info-form'

export const dynamic = 'force-dynamic'

const EMPTY = {
  phone: '',
  email: '',
  mailingAddress: '',
  instagramUrl: '',
  facebookUrl: '',
  twitterUrl: '',
  websiteUrl: '',
  season: '',
  footerTagline: '',
}

export default async function SiteInfoPage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const siteInfo = await prisma.siteInfo.findUnique({ where: { id: SINGLETON_ID } })

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h1
          className="text-3xl text-[#6C5CA8] tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Informations du site
        </h1>
        <HistoryLink contentType="siteInfo" entityId={SINGLETON_ID} />
      </div>

      <p className="mt-3 text-sm text-neutral-500">
        Vos coordonnées et vos réseaux, affichés dans le pied de page et sur la page Contact.
      </p>

      <SiteInfoForm
        initialValues={
          siteInfo
            ? {
                phone: siteInfo.phone,
                email: siteInfo.email,
                mailingAddress: siteInfo.mailingAddress,
                instagramUrl: siteInfo.instagramUrl,
                facebookUrl: siteInfo.facebookUrl,
                twitterUrl: siteInfo.twitterUrl,
                websiteUrl: siteInfo.websiteUrl,
                season: siteInfo.season,
                footerTagline: siteInfo.footerTagline,
              }
            : EMPTY
        }
      />
    </div>
  )
}
