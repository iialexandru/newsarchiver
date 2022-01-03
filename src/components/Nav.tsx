import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import styles from '../styles/scss/Navigation.module.scss'
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/router'
import chooseName from '../utils/Nav/pageName'
import useWindowSize from '../utils/windowSize'

const Nav = () => {
  const [ animation, setAnimation ] = useState<boolean>(true)
  const [width, height] = useWindowSize();

  const [ opened, setOpened ] = useState(false)

  const router = useRouter()

    return (
      <>
      {width > 700 ? 
      <nav className={styles.nav_flex}>
        <span className={`${animation ? styles.animation_stop_sm : ''}`} >
            <Image src="https://res.cloudinary.com/media-cloud-dw/image/upload/v1640892991/NewsArchiver/main-logos/logo_transparent_background_m6vxus.png"
                  width={210} height={125} onMouseLeave={e => setAnimation(!animation)} onMouseEnter={e => setAnimation(!animation)} alt="logo" priority/>
        </span>
        <span className={styles.hover}><Link href="/">Home</Link></span>
        <span className={styles.hover}><Link href="/archived">Archived News</Link></span>
        <span className={styles.hover}><Link href={{pathname: "/ncomparison", query: { news_f: "", news_s: "", page_f: "1", page_s: "1"} }}  >News Comparison</Link></span>
      </nav>
      :
      <>
        <nav className={styles.nav_container}>
          <span>
              <Image src="https://res.cloudinary.com/media-cloud-dw/image/upload/v1640892991/NewsArchiver/main-logos/logo_transparent_background_m6vxus.png"
                    width={90} height={55} alt="logo" priority/>
          </span>
            <button className={styles.nav_p_button} onClick={e => setOpened(!opened)}>
              <span>{chooseName(router.pathname.toString())}</span>
              <MenuIcon fontSize="large" />
            </button>
        </nav>  
            {opened && 
              <div className={styles.dropmenu_container}>
                <ul>
                  <li><Link href="/"><a onClick={e => setOpened(!opened)}>Home</a></Link></li>
                  <li><Link href="/archived"><a onClick={e => setOpened(!opened)}>Archived News</a></Link></li>
                  <li><Link href={{pathname: "/ncomparison", query: { news_f: "", news_s: "", page_f: "1", page_s: "1"} }}><a onClick={e => setOpened(!opened)}>News Comparison</a></Link></li>
                </ul>
              </div>
            }
      </>
    }
    </>
    )
}

export default Nav