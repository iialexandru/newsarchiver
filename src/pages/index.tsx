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
    <div>
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
        <h1>News Archived</h1>

        <div className={styles.mc_flex}>
          <div ref={ref} className={inView ? styles.desc_text : styles.vis_none}>
            <p>News Archived is a web scraping project in which the news from different websites is taken 
              automatically, so the users will be able to compare them. <Link href="/ncomparison">Check it out</Link>
            </p>
            <p>FYI: All the news are taken from the most recent section of the respective sites</p>
          </div>

          {/* <video className={styles.video_home_a} width="500px" muted autoPlay loop>
            <source src="https://res.cloudinary.com/media-cloud-dw/video/upload/v1639224480/NewsArchiver/3_Minutes_of_AMAZING_NATURE_SCENERY_on_Planet_Earth_The_Best_Relax_Music_-_1080p_HD_gjjz3g.mp4"
              type="video/mp4"/>
          </video> */}
          <Image src="https://res.cloudinary.com/media-cloud-dw/image/upload/v1640864007/NewsArchiver/qprevcrop_wuhjld.png"
          width={500} height={252} priority />
        </div>

      </div>
    </div>
  )
}

export default Home
