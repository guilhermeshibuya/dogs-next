'use client'

import passwordReset from '@/actions/password-reset'
import { useFormState, useFormStatus } from 'react-dom'
import styles from './login.module.css'
import Input from '../input/input'
import ErrorMessage from '../error-message/error-message'

type ButtonProps = React.ComponentProps<'button'>

function ButtonForm({ children, ...props }: ButtonProps) {
  const { pending } = useFormStatus()
  return (
    <>
      {pending ? (
        <button type="submit" disabled={pending} className="button" {...props}>
          Resetando...
        </button>
      ) : (
        <button type="submit" className="button" {...props}>
          {children}
        </button>
      )}
    </>
  )
}
export default function LoginReset({
  keyToken,
  login,
}: {
  keyToken: string
  login: string
}) {
  const [state, action] = useFormState(passwordReset, {
    ok: false,
    error: '',
    data: null,
  })

  return (
    <form action={action} className={styles.form}>
      <Input label="Nova senha" type="password" name="password" />
      <input type="hidden" name="login" value={login} />
      <input type="hidden" name="key" value={keyToken} />
      <ErrorMessage error={state.error} />
      <ButtonForm>Resetar</ButtonForm>
    </form>
  )
}
