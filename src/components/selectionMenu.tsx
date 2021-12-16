import styles from '../styles/scss/NewsComparison.module.scss'
import { FC, Dispatch, SetStateAction } from 'react'
import countries from '../utils/NewsComparison/countrySelect'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useState } from 'react'

interface Default {
    allPage: {[
        key: string
    ]: any
    }
}

interface News {
    news: Default
}

const selectionMenu: FC<News> = ({ news }) => {
    const router = useRouter()

    const[ selectCountry, setSelectCountry ] = useState({ country1: '', country2: ''})
    const[ selectNews, setSelectNews ] = useState({ news1: '', news2: ''})
    
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
        <div className={styles.flexbox_n}>
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
                {news ?
                        <div className={styles.all_news_container}>
                                {news.allPage.map((article: any, index: number) => {
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
    </div>
    )
}

export default selectionMenu