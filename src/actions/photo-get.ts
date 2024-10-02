'use server'

import { PhotoData } from '@/types/photo-data'
import apiError from '@/utils/api-error'

export default async function photoGet(id: string) {
  const apiUrl = process.env.API_BASE_URL

  try {
    const response = await fetch(`${apiUrl}/api/photo/${id}`, {
      next: {
        revalidate: 60,
        tags: ['photos', 'comment'],
      },
    })

    if (!response.ok) throw new Error('Erro ao buscar a foto')

    const data = (await response.json()) as PhotoData

    return { data, ok: true, error: '' }
  } catch (err) {
    return apiError(err)
  }
}
