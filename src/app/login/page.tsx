import Link from 'next/link'
import styles from './login.module.css'
import LoginForm from '@/components/login/login-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login | Dogs',
  description: 'Entre na sua conta no site Dogs.',
}

export default async function LoginPage() {
  return (
    <section className="animeLeft">
      <h1 className="title">Login</h1>
      <LoginForm />
      <Link href="/login/perdeu" className={styles.perdeu}>
        Perdeu a senha?
      </Link>
      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link href="/login/criar" className="button">
          Cadastro
        </Link>
      </div>
    </section>
  )
}
