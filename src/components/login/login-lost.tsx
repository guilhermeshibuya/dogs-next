'use client'

import styles from './login.module.css'
import Input from '../input/input'
import { useFormState, useFormStatus } from 'react-dom'
import ErrorMessage from '../error-message/error-message'
import passwordLost from '@/actions/password-lost'
import { useEffect, useState } from 'react'

type ButtonProps = React.ComponentProps<'button'>

function ButtonForm({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <button type="submit" disabled={pending} className="button" {...props}>
          Enviando...
        </button>
      ) : (
        <button type="submit" className="button" {...props}>
          {children}
        </button>
      )}
    </>
  )
}

export default function LoginLost() {
  const [state, action] = useFormState(passwordLost, {
    ok: false,
    error: '',
    data: null,
  })

  const [url, setUrl] = useState('')

  useEffect(() => {
    setUrl(window.location.href.replace('perdeu', 'resetar'))
  }, [])

  return (
    <form action={action} className={styles.form}>
      <Input label="Email / Usuário" type="text" name="login" />
      <input name="url" type="hidden" value={url} />
      <ErrorMessage error={state.error} />
      {state.ok ? (
        <p style={{ color: '#4c1' }}>Email enviado.</p>
      ) : (
        <ButtonForm>Entrar</ButtonForm>
      )}
    </form>
  )
}
