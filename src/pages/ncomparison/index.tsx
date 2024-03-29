import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Head from 'next/head'
import axios from 'axios'


import styles from '../../styles/scss/NewsComparison.module.scss'
import Selection from '../../components/NewsComparison/SelectionMenu'
import { server } from '../../config/index'
import useWindowSize from '../../utils/windowSize'


interface Data {
    allPage: {[
        key: string
    ]: any
    };
    totalPages: number;
}

interface News { 
    latestNews_1: Data;
    latestNews_2: Data;
}

const Comparison: NextPage<News> = ({ latestNews_1, latestNews_2 }) => {

    const router = useRouter()

    const [ width, height ] = useWindowSize()

    return (
    <>
        <Head>
        <link
            rel="preload"
            href="/fonts/Roboto/Roboto-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Roboto/Roboto-Regular.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
            <link
            rel="preload"
            href="/fonts/Roboto/Roboto-Regular.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous"
          />
      </Head>

        {width < 500 && <p style={{textAlign: 'center', fontSize: '.55rem'}}>*For best perspective on a smaller device, use it in landscape mode</p> }

        <div className={styles.container}>

                <Selection name={1} news={latestNews_1}
                            PAGE={router.query.page_f} URL={router.query.news_f} />
                <Selection name={2} news={latestNews_2}
                            PAGE={router.query.page_s} URL={router.query.news_s} />

        </div>
    </>
    )
}

export default Comparison;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const { query } = context;
    const { news_f, news_s, page_f, page_s, year_f, month_f, day_f, year_s, month_s, day_s, sort_f, sort_s, ppp_f, ppp_s } = query;
    const variants = [ 'digi24', 'antena3', 'dw', 'welt', 'france24', 'lemonde', '9news', 'sbs', 'expats', 'praguemorning', 'lenews', 'swissinfo' ]
 
    if((!variants.includes(news_f) && news_f) || (!variants.includes(news_s) && news_s) )
        return {
            notFound: true
        }
    const response = (parseInt(year_f) && parseInt(month_f) && parseInt(day_f) && news_f) ? await axios.get(`${server}/api/news/${news_f}_nc/filter_by_date?page=${(parseInt(page_f) - 1).toString()}&year=${year_f}&month=${month_f}&day=${day_f}&sort=${sort_f}&limit=${ppp_f ? ppp_f : '10'}`) : (news_f  && await axios.get(`${server}/api/news/${news_f}_nc?page=${(parseInt(page_f) - 1).toString()}&sort=${sort_f}&limit=${ppp_f ? ppp_f : '10'}`))
   
    const response_2 = (parseInt(year_s) && parseInt(month_s) && parseInt(day_s) && news_s) ? await axios.get(`${server}/api/news/${news_s}_nc/filter_by_date?page=${(parseInt(page_s) - 1).toString()}&year=${year_s}&month=${month_s}&day=${day_s}&sort=${sort_s}&&limit=${ppp_s ? ppp_s : '10'}`) : (news_s && await axios.get(`${server}/api/news/${news_s}_nc?page=${(parseInt(page_s) - 1).toString()}&sort=${sort_s}&limit=${ppp_s ? ppp_s : '10'}`))
    
    
    const data = response && await response.data
    const data_2 = response_2 && await response_2.data
    

        return {
            props: {
                latestNews_1: data,
                latestNews_2: data_2,
            },
        }
}