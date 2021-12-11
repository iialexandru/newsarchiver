import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/scss/Home.module.scss'

const Nav = () => {
    return (
        
      <nav className={styles.nav_flex}>
      <span className={styles.hover}><Link href="/">Home of NA</Link></span>
      <span className={styles.hover}><Link href="/archived">Archived News</Link></span>
      <Image src="https://res.cloudinary.com/media-cloud-dw/image/upload/v1639219388/NewsArchiver/LOGONA_fdsbs3.svg"
        width={100} height={100}/>
      <span className={styles.hover}><Link href="/ncomparison">News Comparison</Link></span>
      <span className={styles.hover}><Link href="/nchannel">News Channel</Link></span>
    </nav>
    )
}

export default Nav