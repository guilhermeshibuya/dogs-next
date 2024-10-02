'use server'

import { User } from '@/types/user'
import { USER_GET } from '@/utils/api'
import apiError from '@/utils/api-error'
import { cookies } from 'next/headers'

export default async function userGet() {
  try {
    const token = cookies().get('dogs@token')?.value

    if (!token) throw new Error('Token não encontrado')

    const response = await fetch(USER_GET(), {
      headers: {
        Authorization: 'Bearer ' + token,
      },
      next: {
        revalidate: 60,
      },
    })

    if (!response.ok) throw new Error('Erro ao pegar o usuário')

    const data = (await response.json()) as User

    return { data, ok: true, error: '' }
  } catch (err: unknown) {
    return apiError(err)
  }
}
