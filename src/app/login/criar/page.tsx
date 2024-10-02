import LoginCreate from '@/components/login/login-create'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Crie sua conta | Dogs',
  description: 'Crie sua conta no site Dogs.',
}

export default async function CriarPage() {
  return (
    <div className="animeLeft">
      <h1 className="title">Cadastre-se</h1>
      <LoginCreate />
    </div>
  )
}
