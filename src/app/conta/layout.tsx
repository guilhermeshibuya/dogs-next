import styles from './conta.module.css'

import ContaHeader from '@/components/conta/conta-header'

export default async function ContaLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="container">
      <ContaHeader />
      <div>{children}</div>
    </div>
  )
}
