type PageParams = {
  params: {
    user: string
  }
}

export default async function PerfilUserPage({ params }: PageParams) {
  return <main>[user]: {params.user}</main>
}
