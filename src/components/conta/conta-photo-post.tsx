'use client'

import { useFormState, useFormStatus } from 'react-dom'
import Input from '../input/input'
import ErrorMessage from '../error-message/error-message'
import styles from './conta-photo-post.module.css'
import { ChangeEvent, useState } from 'react'
import photoPost from '@/actions/photo-post'

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

export default function ContaPhotoPost() {
  const [state, action] = useFormState(photoPost, {
    ok: false,
    error: '',
    data: null,
  })

  const [img, setImg] = useState('')

  function handleImgChange({ target }: ChangeEvent<HTMLInputElement>) {
    if (target.files) setImg(URL.createObjectURL(target.files[0]))
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form action={action}>
        <Input label="Nome" name="nome" type="text" />
        <Input label="Peso" name="peso" type="number" />
        <Input label="Idade" name="idade" type="number" />
        <input
          type="file"
          name="img"
          id="img"
          className={styles.file}
          onChange={handleImgChange}
        />
        <ErrorMessage error={state.error} />
        <ButtonForm type="submit">Enviar</ButtonForm>
      </form>
      <div>
        <div
          className={styles.preview}
          style={{ backgroundImage: `url(${img})` }}
        />
      </div>
    </section>
  )
}
