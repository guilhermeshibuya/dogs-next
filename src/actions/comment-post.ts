'use server'

import apiError from '@/utils/api-error'
import { COMMENT_POST } from '@/utils/api'
import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'
import { Comment } from '@/types/comment'

export default async function commentPost(state: {}, formData: FormData) {
  const comment = formData.get('comment') as string | null
  const id = formData.get('id') as string | null

  const token = cookies().get('dogs@token')?.value

  try {
    if (!token || !comment || !id) throw new Error('Preencha os dados')

    const response = await fetch(COMMENT_POST(id), {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    })
    if (!response.ok) throw new Error('Erro ao comentar')

    const data = (await response.json()) as Comment
    revalidateTag('comment')
    return { data, ok: true, error: '' }
  } catch (err: unknown) {
    return apiError(err)
  }
}
