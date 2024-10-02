'use server'

import apiError from '@/utils/api-error'
import login from './login'
import { CREATE_USER } from '@/utils/api'

export default async function createAccount(state: {}, formData: FormData) {
  const username = formData.get('username') as string | null
  const email = formData.get('email') as string | null
  const password = formData.get('password') as string | null

  try {
    if (!username || !email || !password) throw new Error('Preencha os dados')

    if (password.length < 6)
      throw new Error('A senha deve conter no mínimo 6 caracteres')

    const response = await fetch(CREATE_USER(), {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) throw new Error('Email ou usuário já cadastrado')

    const { ok } = await login({ ok: true, error: '' }, formData)

    if (!ok) throw new Error('Erro ao entrar na conta')

    return { ok: true, error: '', data: null }
  } catch (err: unknown) {
    return apiError(err)
  }
}
