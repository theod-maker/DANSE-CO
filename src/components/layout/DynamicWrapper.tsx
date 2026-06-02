'use client'
import dynamic from 'next/dynamic'

const ClientBoundary = dynamic(
  () => import('./ClientBoundary'),
  { ssr: false }
)

export default function DynamicWrapper({ children }: { children: React.ReactNode }) {
  return <ClientBoundary>{children}</ClientBoundary>
}
