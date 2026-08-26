import Link from 'next/link'

interface HistoryLinkProps {
  contentType: string
  entityId: string
  className?: string
}

const DEFAULT_CLASSNAME =
  'shrink-0 text-sm text-neutral-500 underline underline-offset-4 hover:text-[#6C5CA8]'

export function HistoryLink({ contentType, entityId, className }: HistoryLinkProps) {
  const params = new URLSearchParams({ contentType, entityId })

  return (
    <Link href={`/admin/historique?${params.toString()}`} className={className ?? DEFAULT_CLASSNAME}>
      Historique
    </Link>
  )
}
