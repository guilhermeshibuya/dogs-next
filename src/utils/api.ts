const apiUrl = process.env.API_BASE_URL

export function CREATE_USER() {
  return `${apiUrl}/api/user`
}

export function LOGIN() {
  return `${apiUrl}/jwt-auth/v1/token`
}

export function PASSWORD_LOST() {
  return `${apiUrl}/api/password/lost`
}

export function PASSWORD_RESET() {
  return `${apiUrl}/api/password/reset`
}

export function USER_GET() {
  return `${apiUrl}/api/user`
}

export function PHOTO_POST() {
  return `${apiUrl}/api/photo`
}

export function PHOTOS_GET({
  page = 1,
  total = 6,
  user = 0,
}: {
  page?: number
  total?: number
  user?: 0 | string
}) {
  return `${apiUrl}/api/photo/?_page=${page}&_total=${total}&_user=${user}`
}

export function PHOTO_DELETE(id: string) {
  return `${apiUrl}/api/photo/${id}`
}

export function COMMENT_POST(id: string) {
  return `${apiUrl}/api/comment/${id}`
}

export function STATS_GET() {
  return `${apiUrl}/api/stats`
}

export function VALIDATE_TOKEN() {
  return `${apiUrl}/jwt-auth/v1/token/validate`
}
