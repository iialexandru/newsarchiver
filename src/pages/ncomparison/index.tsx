import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import styles from '../../styles/scss/NewsComparison.module.scss'
import axios from 'axios'
import Selection from '../../components/NewsComparison/SelectionMenu'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { server } from '../../config/index'
import Head from 'next/head'

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

    const change_first_page = (page: string) => {
        router.replace({
            pathname: router.pathname,
            query: { ...router.query, page_f: encodeURIComponent(page.toLowerCase()) }
        })
    }

    const change_second_page = (page: string) => {
        router.replace({
            pathname: router.pathname,
            query: { ...router.query, page_s: encodeURIComponent(page.toLowerCase()) }
        })
    }

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

        <div className={styles.container}>

                <Selection name={1} news={latestNews_1}
                           change_page_query={change_first_page} PAGE={router.query.page_f} URL={router.query.news_f} />
                <Selection name={2} news={latestNews_2}
                           change_page_query={change_second_page} PAGE={router.query.page_s} URL={router.query.news_s} />

        </div>
    </>
    )
}

export default Comparison;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const { query } = context;
    const { news_f, news_s, page_f, page_s, year_f, month_f, day_f, year_s, month_s, day_s, sort_f, sort_s } = query;
    const variants = [ 'digi24', 'antena3' ]
 
    if((!variants.includes(news_f) && news_f) || (!variants.includes(news_s) && news_s) )
        return {
            notFound: true
        }
    const response = (parseInt(year_f) && parseInt(month_f) && parseInt(day_f) && news_f) ? await axios.get(`${server}/api/news/${news_f}_nc/filter_by_date?page=${(parseInt(page_f) - 1).toString()}&year=${year_f}&month=${month_f}&day=${day_f}&sort=${sort_f}`) : (news_f  && await axios.get(`${server}/api/news/${news_f}_nc?page=${(parseInt(page_f) - 1).toString()}&sort=${sort_f}`))
    const response_2 = (parseInt(year_s) && parseInt(month_s) && parseInt(day_s) && news_s) ? await axios.get(`${server}/api/news/${news_s}_nc/filter_by_date?page=${(parseInt(page_s) - 1).toString()}&year=${year_s}&month=${month_s}&day=${day_s}&sort=${sort_s}`) : (news_s && await axios.get(`${server}/api/news/${news_s}_nc?page=${(parseInt(page_s) - 1).toString()}&sort=${sort_s}`))
    const data = response && await response.data
    const data_2 = response_2 && await response_2.data
    

        return {
            props: {
                latestNews_1: data,
                latestNews_2: data_2,
            },
        }
}