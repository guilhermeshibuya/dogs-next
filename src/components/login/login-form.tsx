'use client'

import login from '@/actions/login'
import styles from './login.module.css'
import Input from '../input/input'
import { useFormState, useFormStatus } from 'react-dom'
import ErrorMessage from '../error-message/error-message'
import { useEffect } from 'react'

type ButtonProps = React.ComponentProps<'button'>

function ButtonForm({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <button type="submit" disabled={pending} className="button" {...props}>
          Entrando...
        </button>
      ) : (
        <button type="submit" className="button" {...props}>
          {children}
        </button>
      )}
    </>
  )
}

export default function LoginForm() {
  const [state, action] = useFormState(login, {
    ok: false,
    error: '',
    data: null,
  })

  useEffect(() => {
    if (state.ok) window.location.href = '/conta'
  }, [state.ok])

  return (
    <form action={action} className={styles.form}>
      <Input label="Usuário" type="text" name="username" />
      <Input label="Senha" type="password" name="password" />
      <ErrorMessage error={state.error} />
      <ButtonForm>Entrar</ButtonForm>
    </form>
  )
}
