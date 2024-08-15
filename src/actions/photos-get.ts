'use server'

export default async function photosGet() {
  const apiUrl = process.env.API_BASE_URL
  const page = 1
  const total = 2
  const user = 'cat'

  const response = await fetch(
    `${apiUrl}/api/photo/?_page=${page}&_total=${total}&_user=${user}`,
  )
  const data = await response.json()

  return data
}
