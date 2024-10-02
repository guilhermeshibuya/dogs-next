'use client'

import createAccount from '@/actions/create-account'
import { useFormState, useFormStatus } from 'react-dom'
import Input from '../input/input'
import ErrorMessage from '../error-message/error-message'
import styles from './login.module.css'
import { useEffect } from 'react'

type ButtonProps = React.ComponentProps<'button'>

function ButtonForm({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <button type="submit" disabled={pending} className="button" {...props}>
          Cadastrando...
        </button>
      ) : (
        <button type="submit" className="button" {...props}>
          {children}
        </button>
      )}
    </>
  )
}

export default function LoginCreate() {
  const [state, action] = useFormState(createAccount, {
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
      <Input label="Email" type="email" name="email" />
      <Input label="Senha" type="password" name="password" />
      <ErrorMessage error={state.error} />
      <ButtonForm type="submit">Cadastrar</ButtonForm>
    </form>
  )
}
