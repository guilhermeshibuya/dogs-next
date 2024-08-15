import Image from 'next/image'
import styles from './footer.module.css'

export default async function Footer() {
  return (
    <footer className={styles.footer}>
      <Image src="/icons/dogs-footer.svg" width={28} height={22} alt="Dogs" />
      <p>Dogs. Alguns direitos reservados.</p>
    </footer>
  )
}
