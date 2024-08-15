type PageParams = {
  params: {
    id: string
  }
}

export default async function FotoIdPage({ params }: PageParams) {
  return <main>FotoId: {params.id}</main>
}
