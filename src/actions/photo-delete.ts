'use server'

import apiError from '@/utils/api-error'
import { PHOTO_DELETE } from '@/utils/api'
import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export default async function photoDelete(id: string) {
  const token = cookies().get('dogs@token')

  try {
    if (!token) throw new Error('Token inválido')

    const response = await fetch(PHOTO_DELETE(id), {
      method: 'DELETE',
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
    if (!response.ok) throw new Error('Erro ao deletar a foto')
  } catch (err: unknown) {
    return apiError(err)
  }
  revalidateTag('photos')
  redirect('/conta')
}
