import LoginReset from '@/components/login/login-reset'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resetar | Dogs',
  description: 'Resete a sua senha.',
}

type SearchParams = {
  searchParams: {
    key: string
    login: string
  }
}

export default async function ResetarPage({ searchParams }: SearchParams) {
  return (
    <div className="animeLeft">
      <h1 className="title">Resete a senha</h1>
      <LoginReset keyToken={searchParams.key} login={searchParams.login} />
    </div>
  )
}
