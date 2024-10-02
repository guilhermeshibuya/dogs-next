'use client'

import { Comment } from '@/types/comment'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import styles from './photo-comments-form.module.css'
import EnviarIcon from '../icons/enviar-icon'
import ErrorMessage from '../error-message/error-message'
import commentPost from '@/actions/comment-post'

function FormButton() {
  const { pending } = useFormStatus()
  return (
    <button className={styles.button} disabled={pending}>
      <EnviarIcon />
    </button>
  )
}

export default function PhotoCommentsForm({
  single,
  id,
  setComments,
}: {
  single: boolean
  id: number
  setComments: Dispatch<SetStateAction<Comment[]>>
}) {
  const [state, action] = useFormState(commentPost, {
    ok: false,
    data: null,
    error: '',
  })

  useEffect(() => {
    if (state.ok && state.data) {
      setComments((comments) => [...comments, state.data])
    }
  }, [state, setComments])

  const [comment, setComment] = useState('')

  return (
    <form className={`${styles.form} ${single ? styles.single : ''}`}>
      <input type="hidden" name="id" id="id" value={id} />
      <textarea
        className={styles.textarea}
        name="comment"
        id="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      ></textarea>
      <FormButton />
      <ErrorMessage error={state.error} />
    </form>
  )
}
