import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from '../styles/scss/Home.module.scss'

const Nav = () => {
  const [ animation, setAnimation ] = useState<boolean>(true)

    return (
      <nav className={styles.nav_flex}>
      <span className={`${animation ? styles.animation_stop_sm : ''}`} >
          <Image src="https://res.cloudinary.com/media-cloud-dw/image/upload/v1639219388/NewsArchiver/LOGONA_fdsbs3.svg"
                 width={100} height={100} onMouseLeave={e => setAnimation(!animation)} onMouseEnter={e => setAnimation(!animation)} alt="logo" priority/>
      </span>
      <span className={styles.hover}><Link href="/">Home of NA</Link></span>
      <span className={styles.hover}><Link href="/archived">Archived News</Link></span>
      <span className={styles.hover}><Link href={{pathname: "/ncomparison", query: { news_f: "", news_s: "", page_f: "1", page_s: "1"} }}  >News Comparison</Link></span>
    </nav>
    )
}

export default Nav