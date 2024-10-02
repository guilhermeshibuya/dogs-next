'use server'

import { PASSWORD_RESET } from '@/utils/api'
import apiError from '@/utils/api-error'
import { redirect } from 'next/navigation'

export default async function passwordReset(state: {}, formData: FormData) {
  const apiUrl = process.env.API_BASE_URL
  const login = formData.get('login') as string | null
  const key = formData.get('key') as string | null
  const password = formData.get('password') as string | null

  try {
    if (!login || !key || !password) throw new Error('Preencha os dados')

    const response = await fetch(PASSWORD_RESET(), {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) throw new Error('Não autorizado')
  } catch (err: unknown) {
    return apiError(err)
  }
  redirect('/login')
}
