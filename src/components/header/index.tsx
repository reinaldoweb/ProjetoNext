import { useSessioin, signIn, signOut } from "next-auth/react";

import styles from './styles.module.css'
import Link from 'next/link'

export function Header () {

  const { data: session } = useSessioin();

  return (
    <header className={styles.header}>
      <section className={styles.content}>
        <nav className={styles.nav}>
          <Link href='/'>
            <h1 className={styles.logo}>
              Tarefas <span>+</span>
            </h1>
          </Link>
          <Link href='/dashboard'>
            <span className={styles.link}>Meu painel</span>
          </Link>
        </nav>
        <button className={styles.loginButton}>Acessar</button>
      </section>
    </header>
  )
}
