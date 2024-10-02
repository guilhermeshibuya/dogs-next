'use server'

import { Photo } from '@/types/photo'
import { PHOTOS_GET } from '@/utils/api'
import apiError from '@/utils/api-error'

type PhotosGetParams = {
  page?: number
  total?: number
  user?: 0 | string
}

export default async function photosGet(
  { page = 1, total = 6, user = 0 }: PhotosGetParams = {},
  optionsFront?: RequestInit,
) {
  const apiUrl = process.env.API_BASE_URL

  try {
    const options = optionsFront || {
      next: { revalidate: 10, tags: ['photos'] },
    }

    const response = await fetch(PHOTOS_GET({ page, total, user }), options)

    if (!response.ok) throw new Error('Erro ao buscar as fotos')

    const data = (await response.json()) as Photo[]

    return { data, ok: true, error: '' }
  } catch (err) {
    return apiError(err)
  }
}
