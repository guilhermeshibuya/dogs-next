'use server'

import { PASSWORD_LOST } from '@/utils/api'
import apiError from '@/utils/api-error'

export default async function passwordLost(state: {}, formData: FormData) {
  const apiUrl = process.env.API_BASE_URL
  const login = formData.get('login') as string | null
  const url = formData.get('url') as string | null

  try {
    if (!login) throw new Error('Preencha os dados')

    const response = await fetch(PASSWORD_LOST(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        login,
        url,
      }),
    })

    if (!response.ok) throw new Error('Email ou usuário não cadastrado')

    return { data: null, ok: true, error: '' }
  } catch (err: unknown) {
    return apiError(err)
  }
}
