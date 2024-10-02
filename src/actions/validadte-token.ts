'use server'

import { VALIDATE_TOKEN } from '@/utils/api'
import apiError from '@/utils/api-error'
import { cookies } from 'next/headers'

export default async function validateToken() {
  const token = cookies().get('dogs@token')?.value

  if (!token) throw new Error('Acesso negado')

  try {
    const response = await fetch(VALIDATE_TOKEN(), {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) throw new Error('Erro ao validar token')

    const data = await response.json()

    return { data, ok: true, error: '' }
  } catch (err) {
    return apiError(err)
  }
}
