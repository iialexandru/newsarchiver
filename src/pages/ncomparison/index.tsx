import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import { useState, useEffect } from 'react'
import countries from '../../utils/NewsComparison/countrySelect'
import styles from '../../styles/scss/NewsComparison.module.scss'
import axios from 'axios'
import Image from 'next/image'
import Selection from '../../components/selectionMenu'
import { useRouter } from 'next/router'

interface Data {
    allPage: {[
        key: string
    ]: any
    }
}

interface News { 
    latestNews_1: Data;
    latestNews_2: Data;
}

const Comparison: NextPage<News> = ({ latestNews_1, latestNews_2 }) => {
    const[ selectCountry, setSelectCountry ] = useState({ country1: '', country2: ''})
    const[ selectNews, setSelectNews ] = useState({ news1: '', news2: ''})

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

    const newsRomania: string[] = ['DIGI24', 'Antena3']
    const newsGermany: string[] = ['WELT', 'DW']
    const newsFrance: string[] = ['France24', 'Lemonde']
    const allNews = [newsRomania, newsGermany, newsFrance]

    return (
        <div className={styles.container}>
            {/* <div className={styles.flexbox_n}>
                <div className={styles.item}>
                    <label>Country: </label>
                    <select value={selectCountry.country1} onChange={e => { setSelectCountry({...selectCountry, country1: e.target.value});setSelectNews({...selectNews, news1: ""}) }}>
                        <option value="" disabled>Please select country:</option>
                        <option value="romania">Romania</option>
                        <option value="germany">Germany</option>
                        <option value="france">France</option>
                    </select>
                </div>
                {selectCountry.country1 !== "" && 
                <>
                    <div className={styles.item}>
                        <label>News Site: </label>
                        <select value={selectNews.news1} onChange={e => { setSelectNews({...selectNews, news1: e.target.value}); change_first_news(e.target.value)}}>
                            <option value="" disabled>Please choose news site:</option>
                            {countries(selectCountry.country1, allNews).map((n: any, i: any) => {
                                return <option key={i} value={n.toLowerCase()}>{n}</option>
                            }) }
                        </select>
                    </div>
                    {(selectNews.news1 === router.query.news_f) && 
                    <>
                        {latestNews_1 ?
                                <div className={styles.all_news_container}>
                                        {latestNews_1.allPage.map((article: any, index: number) => {
                                            return(
                                            <div className={styles.item_flex}>
                                                <h5 className={styles.headline}>{article.title}</h5>
                                                <div className={styles.image}><Image src={article.image} alt='article-title' width={400} height={200}/></div>
                                                <p className={styles.intro_paragraph}>{article.desc}</p>
                                            </div>
                                            )
                                        })}
                                </div>
                        :
                        <h1>Loading...</h1>
                        }
                    </> 
                    }
                </>
                }
            </div> */}

            <Selection news={latestNews_1}/>

            <div className={styles.flexbox_n}>
                <div className={styles.item}>
                    <label>Country: </label>
                    <select value={selectCountry.country2} onChange={e => { setSelectCountry({...selectCountry, country2: e.target.value}); setSelectNews({...selectNews, news2: ""}) }}>
                        <option value="" disabled>Please select country:</option>
                        <option value="romania">Romania</option>
                        <option value="germany">Germany</option>
                        <option value="france">France</option>
                    </select>
                </div>
                {selectCountry.country2 !== "" && 
                <>
                    <div className={styles.item}>
                        <label>News Site: </label>
                        <select value={selectNews.news2} onChange={e => { setSelectNews({...selectNews, news2: e.target.value}); change_second_news(e.target.value) }}>
                            <option value="" disabled>Please choose news site:</option>
                            {countries(selectCountry.country2, allNews).map((n: any, i: any) => {
                                return <option key={i} value={n.toLowerCase()}>{n}</option>
                            }) }
                        </select>
                    </div>
                    {(selectNews.news2 === router.query.news_s && latestNews_2) && 
                        <>
                        <div className={styles.all_news_container}>

                        {latestNews_2.allPage.map((article: any, index: number) => {
                            return(
                            <div className={styles.item_flex}>
                                <h5 className={styles.headline}>{article.title}</h5>
                                <div className={styles.image}><Image src={article.image} alt='article-title' width={400} height={200}/></div>
                                <p className={styles.intro_paragraph}>{article.desc}</p>
                            </div>
                            )
                        })
                        }
                        </div>
                        </>
                    }
                </>
                }
            </div>
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
    const response = news_f ? await axios.get(`http://localhost:9000/api/screenshots/${news_f}_nc`) : await axios.get(`http://localhost:9000/api/screenshots`)
    const response_2 = news_s ? await axios.get(`http://localhost:9000/api/screenshots/${news_s}_nc`) : await axios.get(`http://localhost:9000/api/screenshots`)
    const data = await response.data
    const data_2 = await response_2.data
    

        return {
            props: {
                latestNews_1: data,
                latestNews_2: data_2,
            },
        }
}