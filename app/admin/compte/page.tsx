import { redirect } from 'next/navigation'
import { getCurrentAdmin } from '../../../src/lib/adminAuth'
import { MINIMUM_PASSWORD_LENGTH } from '../../../src/lib/password'
import { PasswordForm } from './password-form'

export const dynamic = 'force-dynamic'

export default async function AccountPage() {
  const account = await getCurrentAdmin()
  if (!account) redirect('/admin/login')

  return (
    <div>
      <h1
        className="text-3xl text-[#6C5CA8] tracking-tight"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Mon compte
      </h1>

      <p className="mt-3 text-sm text-neutral-500">
        Identifiant de connexion : <span className="text-neutral-700">{account.username}</span>
      </p>

      <PasswordForm minimumLength={MINIMUM_PASSWORD_LENGTH} />
    </div>
  )
}
