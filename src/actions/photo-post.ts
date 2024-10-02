'use server'

import apiError from '@/utils/api-error'
import { CREATE_USER, PHOTO_POST } from '@/utils/api'
import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'

export default async function photoPost(state: {}, formData: FormData) {
  const nome = formData.get('nome') as string | null
  const idade = formData.get('idade') as string | null
  const peso = formData.get('peso') as string | null
  const img = formData.get('img') as File

  const token = cookies().get('dogs@token')

  try {
    if (!token || !nome || !idade || !peso || img.size === 0)
      throw new Error('Preencha os dados')

    const response = await fetch(PHOTO_POST(), {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
      },
      body: formData,
    })
    const json = await response.json()
    if (!response.ok) throw new Error('Email ou usuário já cadastrado')
  } catch (err: unknown) {
    return apiError(err)
  }
  revalidateTag('photos')
  redirect('/conta')
}
