import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import styles from '../../../styles/scss/NewsComparison.module.scss'
import specStyles from '../../../styles/scss/CountryNews.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'

interface Data {
    allPage: {[
        key: string
    ]: any
    }
}

interface News { news: Data }

const SingleCountryNews: NextPage<News> = ({ news }) => {


    return (
        <div className={styles.all_news_container}>
        {news.allPage.map((article: any, index: number) => {
            return(
            <Link key={index} href={article.linkURL} >
                <a key={index + 1} target="_blank" rel="noreferrer" className={specStyles.item_flex} href={article.linkURL}>
                    <div key={index}>
                        <h5 key={index} className={styles.headline}>{article.title}</h5>
                        <div key={index + 1} className={specStyles.image}>
                            <Image key={index} src={article.image} alt='article-title' width={400} height={250}/>
                        </div>
                        <p key={index + 2} className={specStyles.intro_paragraph}>{article.desc}</p>
                    </div>
                </a>
            </Link>
            )
        })}
</div>
    )
}

export default SingleCountryNews;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const { query } = context;
    const { news } = query;

    const response = await axios.get(`http://localhost:9000/api/screenshots/${news}_nc`)
    const data = await response.data

    return {
        props: {
            news: data,
        }
    }
}