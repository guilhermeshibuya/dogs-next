import Link from 'next/link'
import styles from './header.module.css'
import Image from 'next/image'

export default async function Header() {
  const login = true

  return (
    <header className={styles.header}>
      <nav className={`${styles.nav} container`}>
        <Link className={styles.logo} href="/" aria-label="Dogs - Home">
          <Image
            src="/icons/dogs.svg"
            width={28}
            height={22}
            alt="Dogs"
            priority
          />
        </Link>
        {login ? (
          <Link className={styles.login} href="/conta">
            Dogs
          </Link>
        ) : (
          <Link className={styles.login} href="/login">
            Login / Criar
          </Link>
        )}
      </nav>
    </header>
  )
}
