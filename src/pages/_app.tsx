import '../styles/scss/globals.scss'
import Nav from '../components/Nav'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import '../styles/scss/SwiperCustom.scss'


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/na.ico" />
        <link
            rel="preload"
            href="/fonts/LibreBaskerville/LibreBaskerville-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/LibreBaskerville/LibreBaskerville-Regular.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
            <link
            rel="preload"
            href="/fonts/LibreBaskerville/LibreBaskerville-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
          <meta name="description" content="News Archiving" />
          <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1" />
      </Head>
      <Nav />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
