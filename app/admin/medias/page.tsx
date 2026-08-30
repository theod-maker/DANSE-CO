import { redirect } from 'next/navigation'
import { prisma } from '../../../src/lib/db'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { UploadForm } from './upload-form'
import { MediaGrid } from './media-grid'

export const dynamic = 'force-dynamic'

export default async function MediaPage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  const assets = await prisma.mediaAsset.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Médias
      </h1>

      <p className="mt-3 text-sm text-neutral-500">
        Vos images. Copiez le chemin d&apos;une image pour l&apos;utiliser dans une danse, une
        salle ou une actualité.
      </p>

      <UploadForm />

      {assets.length === 0 ? (
        <p className="mt-10 rounded-md border border-dashed border-neutral-300 px-6 py-10 text-center text-neutral-500">
          Aucune image pour le moment.
          <br />
          Utilisez le bouton ci-dessus pour en envoyer une.
        </p>
      ) : (
        <MediaGrid
          entries={assets.map((asset) => ({
            id: asset.id,
            originalName: asset.originalName,
            publicPath: asset.url,
            sizeBytes: asset.sizeBytes,
          }))}
        />
      )}
    </div>
  )
}
