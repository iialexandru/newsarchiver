import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import styles from '../styles/scss/Navigation.module.scss'
import MenuIcon from '@mui/icons-material/Menu';

  function useWindowSize(){
    const [ size, setSize ] = useState<number[]>([typeof window !== 'undefined' ? window.innerWidth : 1220, typeof window !== 'undefined' ? window.outerHeight : 1225]);
    useEffect(() => {
      const handleResize = () => {
        setSize([window && window.innerWidth, window && window.outerHeight])
      }
      window.addEventListener('resize', handleResize);
      return () => { window.removeEventListener('resize', handleResize); }
    }, [])
    return size;
  }

const Nav = () => {
  const [ animation, setAnimation ] = useState<boolean>(true)
  const [width, height] = useWindowSize();

  const [ opened, setOpened ] = useState(false)

  console.log(width, height)

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
        <div className={styles.nav_container}>
          <span className={`${animation ? styles.animation_stop_sm : ''}`} >
              <Image src="https://res.cloudinary.com/media-cloud-dw/image/upload/v1640892991/NewsArchiver/main-logos/logo_transparent_background_m6vxus.png"
                    width={90} height={55} onMouseLeave={e => setAnimation(!animation)} onMouseEnter={e => setAnimation(!animation)} alt="logo" priority/>
          </span>
            <button className={styles.nav_p_button} onClick={e => setOpened(!opened)}>
              <MenuIcon fontSize="large" />
            </button>
        </div>  
            {opened && 
              <div className={styles.dropmenu_container}>
                <ul>
                  <li className={styles.hover}><Link href="/">Home</Link></li>
                  <li className={styles.hover}><Link href="/archived">Archived News</Link></li>
                  <li className={styles.hover}><Link href={{pathname: "/ncomparison", query: { news_f: "", news_s: "", page_f: "1", page_s: "1"} }}>News Comparison</Link></li>
                </ul>
              </div>
            }
      </>
    }
    </>
    )
}

export default Nav