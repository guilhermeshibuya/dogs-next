'use server'

import { StatsData } from '@/types/stats-data'
import { STATS_GET } from '@/utils/api'
import apiError from '@/utils/api-error'
import { cookies } from 'next/headers'

export default async function statsGet() {
  const token = cookies().get('dogs@token')?.value

  if (!token) throw new Error('Acesso negado')

  try {
    const response = await fetch(STATS_GET(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        revalidate: 60,
      },
    })

    if (!response.ok) throw new Error('Erro ao buscar os dados')

    const data = (await response.json()) as StatsData[]

    return { data, ok: true, error: '' }
  } catch (err) {
    return apiError(err)
  }
}
