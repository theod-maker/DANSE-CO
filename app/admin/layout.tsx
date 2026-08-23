import type { ReactNode } from 'react'

export const metadata = {
  title: 'Administration — Dans&Co',
  robots: { index: false, follow: false },
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-screen bg-[#faf8f5]">{children}</div>
}
