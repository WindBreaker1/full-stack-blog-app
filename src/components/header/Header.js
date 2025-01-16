import React from "react";
import Link from "next/link";
import styles from "./header.module.css"

export const Header = () => {
  return (
    <header className={styles.container}>
      <Link className={styles.logo} href="/">Blog Studio</Link>
      <nav className={styles.navbar}>
        <Link href="/blog">Blog</Link>
        <Link href="/write">Write</Link>
        <button>Register</button>
      </nav>
    </header>
  )
}