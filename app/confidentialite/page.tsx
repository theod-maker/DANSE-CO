import type { Metadata } from 'next'
import Link from 'next/link'
import { readSiteInfo } from '@/src/lib/content/readers'
import { LegalPage, LegalSection } from '@/src/components/legal/LegalPage'
import { LEGAL_IDENTITY, legalValue } from '@/src/lib/legal/legal-identity'
import { FONTS_ARE_SELF_HOSTED, listThirdParties } from '@/src/lib/legal/third-parties'
import { TRACKERS } from '@/src/lib/legal/trackers'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Les données personnelles que le site Dans’&Co collecte, pourquoi, et comment exercer vos droits.',
  alternates: { canonical: '/confidentialite' },
}

const LINK_CLASS = 'text-[#524490] underline underline-offset-4'

export default async function Confidentialite() {
  const siteInfo = await readSiteInfo()
  const value = (field: Parameters<typeof legalValue>[1]) => legalValue(LEGAL_IDENTITY, field)
  const thirdParties = listThirdParties(FONTS_ARE_SELF_HOSTED)

  return (
    <LegalPage
      title="Politique de confidentialité"
      intro="Ce que ce site sait de vous, pourquoi, et ce que vous pouvez en faire."
      siteInfo={siteInfo}
    >
      <LegalSection title="Qui est responsable">
        <p>
          Le responsable du traitement est {value('publisherName')} (voir les{' '}
          <Link className={LINK_CLASS} href="/mentions-legales">mentions légales</Link>). Pour toute question ou
          demande concernant vos données, écrivez à{' '}
          <a className={LINK_CLASS} href={`mailto:${value('contactEmail')}`}>{value('contactEmail')}</a>.
        </p>
        <p>
          Théo Delporte, qui a conçu le site, intervient comme prestataire technique : il héberge le relais de
          mesure décrit plus bas et n’utilise pas ces données pour son propre compte.
        </p>
      </LegalSection>

      <LegalSection title="Le formulaire de contact">
        <p>
          Quand vous écrivez par le formulaire, nous recevons votre nom, votre prénom, votre adresse e-mail,
          l’objet de votre message et le message lui-même. Ces informations servent uniquement à vous répondre.
          Elles sont conservées {value('contactRetention')}.
        </p>
        <p>
          Le formulaire est traité par Formspree, qui nous transmet votre message et l’héberge sur une
          infrastructure située notamment aux États-Unis. Garantie pour ce transfert :{' '}
          {value('formspreeTransferSafeguard')}.
        </p>
        <p>
          Le formulaire s’adresse à des adultes. Pour un enfant de moins de 15 ans, il doit être rempli par un
          parent ou un représentant légal.
        </p>
      </LegalSection>

      <LegalSection title="La mesure des visites">
        <p>
          Pour savoir quelles pages sont lues, nous utilisons PostHog, hébergé dans l’Union européenne. Les
          données passent par t.theodelporte.fr, un relais hébergé chez OVH, avant d’arriver chez PostHog. Rien de
          ce que vous tapez dans un formulaire n’est envoyé, et aucun enregistrement de vos visites n’est fait.
          La mesure ne s’exerce jamais sur l’espace d’administration.
        </p>
        <p>
          <strong>Sans votre accord</strong>, la mesure se limite à un comptage anonyme : pages vues, temps passé
          sur chaque page, page d’origine, type d’appareil et de navigateur. Aucun cookie de mesure n’est déposé sur
          votre appareil, et nous ne connaissons ni votre pays ni votre ville. Les clics et l’envoi du formulaire
          ne sont pas mesurés. La base légale est l’intérêt légitime de connaître la fréquentation du site.
        </p>
        <p>
          <strong>Si vous acceptez</strong>, la mesure devient plus détaillée : pays et ville déduits de votre
          adresse IP avant que celle-ci soit supprimée, pages parcourues, clics sur les liens et les boutons, et
          envoi réussi ou échoué du formulaire de contact (sans son contenu). Un cookie et une entrée du stockage
          local de votre navigateur permettent de reconnaître votre navigateur d’une visite à l’autre, pendant 12
          mois au plus (voir le tableau plus bas). La base légale est votre consentement.
        </p>
        <p>
          Votre choix est gardé 6 mois dans un cookie propre au site (td_measure_consent), puis la question vous est
          reposée. Vous pouvez le changer à tout moment avec le bouton « Préférences de mesure » en bas de chaque
          page : un refus arrête immédiatement la mesure détaillée. Les données de mesure sont conservées{' '}
          {value('analyticsRetentionMonths')} mois au plus.
        </p>
      </LegalSection>

      <LegalSection title="Cookies et stockage local">
        <p>
          Voici tout ce que ce site lui-même peut déposer sur votre appareil. Avant votre choix, rien n’est déposé ;
          si vous refusez, seuls restent le cookie de votre choix et le témoin technique de ce refus. Si une carte
          s’affiche (parce que vous avez accepté les cookies ou cliqué sur « Afficher la carte »), Google peut déposer ses
          propres cookies : ce site n’y a pas accès.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[0.9rem]">
            <caption className="sr-only">Cookies et entrées de stockage local déposés par le site</caption>
            <thead>
              <tr className="border-b border-[#18102E]/15">
                <th scope="col" className="py-2 pr-4 font-medium">Nom</th>
                <th scope="col" className="py-2 pr-4 font-medium">À quoi il sert</th>
                <th scope="col" className="py-2 pr-4 font-medium">Quand</th>
                <th scope="col" className="py-2 font-medium">Durée</th>
              </tr>
            </thead>
            <tbody>
              {TRACKERS.map((tracker) => (
                <tr key={tracker.name} className="border-b border-[#18102E]/10 align-top">
                  <th scope="row" className="py-2 pr-4 font-normal break-all">{tracker.name}</th>
                  <td className="py-2 pr-4">{tracker.purpose}</td>
                  <td className="py-2 pr-4">{tracker.when}</td>
                  <td className="py-2">{tracker.lifetime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="Les services extérieurs contactés par votre navigateur">
        <p>
          Votre navigateur contacte directement les services suivants. Ils reçoivent alors votre adresse IP et des
          informations techniques sur votre appareil.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          {thirdParties.map((party) => (
            <li key={party.id}>
              <strong>{party.hosts.join(', ')}</strong> : {party.purpose} {party.when}
            </li>
          ))}
        </ul>
      </LegalSection>

      <LegalSection title="Vos droits">
        <p>
          Vous pouvez demander l’accès à vos données, leur rectification, leur effacement, la limitation de leur
          traitement, vous opposer à leur traitement, et retirer votre consentement à tout moment. Écrivez à{' '}
          <a className={LINK_CLASS} href={`mailto:${value('contactEmail')}`}>{value('contactEmail')}</a>.
        </p>
        <p>
          Si vous estimez que vos droits ne sont pas respectés, vous pouvez saisir la CNIL :{' '}
          <a className={LINK_CLASS} href="https://www.cnil.fr/fr/plaintes">www.cnil.fr/fr/plaintes</a>.
        </p>
      </LegalSection>
    </LegalPage>
  )
}
