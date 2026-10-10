'use client'

import { useEffect, useRef, useState } from 'react'
import { googleMapsEmbedHref } from '../../lib/maps/map-embed.ts'

interface MapEmbedProps {
  embedUrl: string
  title: string
  height: number | '100%'
}

export function MapEmbed({ embedUrl, title, height }: MapEmbedProps) {
  const [isRequested, setIsRequested] = useState(false)
  const frameRef = useRef<HTMLIFrameElement>(null)
  const embedHref = googleMapsEmbedHref(embedUrl)

  useEffect(() => {
    if (isRequested) {
      frameRef.current?.focus()
    }
  }, [isRequested])

  if (isRequested && embedHref) {
    return (
      <iframe
        ref={frameRef}
        src={embedHref}
        width="100%"
        height={height}
        style={{ border: 0 }}
        allowFullScreen
        referrerPolicy="strict-origin-when-cross-origin"
        title={`Carte ${title}`}
      />
    )
  }

  return (
    <div
      style={{ height }}
      className="flex flex-col items-center justify-center gap-3 bg-[#EDEAF6]/60 px-5 py-4 text-center"
    >
      {embedHref ? (
        <>
          <p className="text-[#18102E]/70 text-sm max-w-xs">
            En affichant la carte, vous chargez un contenu de Google, qui reçoit votre adresse IP et peut déposer ses propres cookies.
          </p>
          <button
            type="button"
            onClick={() => setIsRequested(true)}
            className="min-h-[44px] rounded-full bg-[#524490] px-6 text-sm text-white transition-colors hover:bg-[#18102E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#6C5CA8]"
          >
            Afficher la carte
          </button>
        </>
      ) : (
        <p className="text-[#18102E]/70 text-sm max-w-xs">La carte n’est pas disponible pour le moment.</p>
      )}
    </div>
  )
}
