import type { Metadata } from 'next'
import Link from 'next/link'
import { readSiteInfo } from '@/src/lib/content/readers'
import { LegalPage, LegalSection } from '@/src/components/legal/LegalPage'
import { HOSTING_PROVIDER, LEGAL_IDENTITY, legalValue } from '@/src/lib/legal/legal-identity'

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Éditeur, hébergeur et conception du site Dans’&Co.',
  alternates: { canonical: '/mentions-legales' },
}

export default async function MentionsLegales() {
  const siteInfo = await readSiteInfo()
  const value = (field: Parameters<typeof legalValue>[1]) => legalValue(LEGAL_IDENTITY, field)

  return (
    <LegalPage
      title="Mentions légales"
      intro="Qui édite ce site, où il est hébergé et qui l’a conçu."
      siteInfo={siteInfo}
    >
      <LegalSection title="Éditeur du site">
        <p>
          {value('publisherName')}, {value('legalForm')}.
        </p>
        <p>
          Immatriculation : {value('registrationKind')} {value('registrationNumber')}.
        </p>
        <p>Siège : {value('headOfficeAddress')}.</p>
        <p>Directeur ou directrice de la publication : {value('publicationDirector')}.</p>
        <p>
          Contact : <a className="text-[#524490] underline underline-offset-4" href={`mailto:${value('contactEmail')}`}>{value('contactEmail')}</a>, {value('contactPhone')}.
        </p>
      </LegalSection>

      <LegalSection title="Hébergement">
        <p>
          Le site est hébergé par {HOSTING_PROVIDER.name}, {HOSTING_PROVIDER.address}. Les images
          envoyées depuis l’espace d’administration sont stockées chez le même hébergeur.
        </p>
        <p>
          Les textes et les informations du site sont conservés dans une base de données chez{' '}
          {value('databaseHostName')}, dans la région suivante : {value('dataRegion')}.
        </p>
      </LegalSection>

      <LegalSection title="Conception et mesure d’audience">
        <p>
          Site conçu et développé par Théo Delporte (
          <a className="text-[#524490] underline underline-offset-4" href="https://theodelporte.fr">theodelporte.fr</a>
          ), qui assure aussi la mesure des visites décrite dans la politique de confidentialité.
        </p>
      </LegalSection>

      <LegalSection title="Données personnelles">
        <p>
          Les données personnelles collectées par le site, leur usage, leur durée de conservation et
          vos droits sont décrits dans la{' '}
          <Link className="text-[#524490] underline underline-offset-4" href="/confidentialite">politique de confidentialité</Link>.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
