import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'react-intersection-observer'
import styles from '../styles/scss/Home.module.scss'

const Home: NextPage = () => {
  const { ref, inView, entry } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  return (
    <>
    
      <Head>
        <title>NewsArchiver</title>
        <meta name="description" content="News Archiving" />
        <link rel="icon" href="/na.ico" />
        <link
            rel="preload"
            href="/fonts/CherrySwash/CherrySwash-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/CherrySwash/CherrySwash-Bold.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
            <link
            rel="preload"
            href="/fonts/CherrySwash/CherrySwash-Bold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
      </Head>

      <div className={styles.main_content}>

        <div className={styles.mc_flex}>
          <div ref={ref} className={inView ? styles.desc_text : styles.vis_none}>
            <p>News Archived is a web scraping project in which the news from different websites is taken 
              automatically, so the users will be able to compare them. <Link href={{pathname: "/ncomparison", query: { news_f: undefined, news_s: undefined, page_f: undefined, page_s: undefined } }}>Check it out</Link>
            </p>
            <p>FYI: All the news are taken from the most recent section of the respective sites</p>
          </div>
          <Image src="https://res.cloudinary.com/media-cloud-dw/image/upload/v1640891680/NewsArchiver/main-logos/logo_transparent_background_m6vxus.png"
          width={700} height={450} priority />
        </div>

      </div>
      
    </>
  )
}

export default Home
