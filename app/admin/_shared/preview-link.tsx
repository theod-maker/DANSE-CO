import Link from 'next/link'

interface PreviewLinkProps {
  publicPath: string
  className?: string
}

const DEFAULT_CLASSNAME =
  'shrink-0 text-sm text-neutral-500 underline underline-offset-4 hover:text-[#6C5CA8]'

export function PreviewLink({ publicPath, className }: PreviewLinkProps) {
  const href = `/api/apercu/activer?path=${encodeURIComponent(publicPath)}`

  return (
    <Link href={href} className={className ?? DEFAULT_CLASSNAME}>
      Voir l&apos;aperçu
    </Link>
  )
}
