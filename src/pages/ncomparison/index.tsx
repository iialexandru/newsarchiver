import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import styles from '../../styles/scss/NewsComparison.module.scss'
import axios from 'axios'
import Selection from '../../components/selectionMenu'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'

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

    const change_first_news = (news: string) => {
        router.replace({
            pathname: router.pathname,
            query: { ...router.query, news_f: encodeURIComponent(news.toLowerCase()) }
        })
    }

    const change_second_news = (news: string) => {
        router.replace({
            pathname: router.pathname,
            query: { ...router.query, news_s: encodeURIComponent(news.toLowerCase()) }
        })
    }

    return (
        <div className={styles.container}>

                <Selection news={latestNews_1} change_news_query={change_first_news} URL={router.query.news_f} />
                <Selection news={latestNews_2} change_news_query={change_second_news} URL={router.query.news_s} />

        </div>
    )
}

export default Comparison;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const { query } = context;
    const { news_f } = query;
    const { news_s } = query;
    const variants = [ 'digi24', 'antena3' ]

    if((!variants.includes(news_f) && news_f) || (!variants.includes(news_s) && news_s))
        return {
            notFound: true
        }
    const response = news_f ? await axios.get(`http://localhost:9000/api/screenshots/${news_f}_nc`) : await axios.get(`http://localhost:9000/api/screenshots/digi24_nc`)
    const response_2 = news_s ? await axios.get(`http://localhost:9000/api/screenshots/${news_s}_nc`) : await axios.get(`http://localhost:9000/api/screenshots/digi24_nc`)
    const data = await response.data
    const data_2 = await response_2.data
    

        return {
            props: {
                latestNews_1: data,
                latestNews_2: data_2,
            },
        }
}