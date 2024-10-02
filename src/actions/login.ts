'use server'

import { LOGIN } from '@/utils/api'
import apiError from '@/utils/api-error'
import { cookies } from 'next/headers'

export default async function login(state: {}, formData: FormData) {
  const username = formData.get('username') as string | null
  const password = formData.get('password') as string | null

  try {
    if (!username || !password) throw new Error('Preencha os dados')

    const response = await fetch(LOGIN(), {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) throw new Error('Usuário ou senha incorretos')

    const { token } = await response.json()

    cookies().set('dogs@token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
    })

    return { ok: true, error: '', data: null }
  } catch (err: unknown) {
    return apiError(err)
  }
}
