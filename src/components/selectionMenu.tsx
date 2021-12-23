import styles from '../styles/scss/NewsComparison.module.scss'
import { FC } from 'react'
import countries from '../utils/NewsComparison/countrySelect'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

interface Default {
    allPage: {[
        key: string
    ]: any
    }
}

interface ChildPropsComponent {
    news: Default;
    change_news_query: (news: string) => void;
    URL: string | string[] | undefined;
}

const selectionMenu: FC<ChildPropsComponent> = ({ news, change_news_query, URL }) => {

    const [ selectCountry, setSelectCountry ] = useState("")
    const [ selectNews, setSelectNews ] = useState<string>("default")

    const newsRomania: string[] = ['DIGI24', 'Antena3']
    const newsGermany: string[] = ['WELT', 'DW']
    const newsFrance: string[] = ['France24', 'Lemonde']
    const allNews = [newsRomania, newsGermany, newsFrance]

    return (
        <div className={styles.flexbox_n}>
        <div className={styles.item}>
            <label>Country: </label>
            <select value={selectCountry} onChange={e => { setSelectCountry(e.target.value); setSelectNews("") }}>
                <option value="" disabled>Please select country:</option>
                <option value="romania">Romania</option>
                <option value="germany">Germany</option>
                <option value="france">France</option>
            </select>
        </div>
        {selectCountry !== "" && 
        <>
            <div className={styles.item}>
                <label>News Site: </label>
                <select value={selectNews} onChange={e => { setSelectNews(e.target.value); change_news_query(e.target.value)}}>
                    <option value="" disabled>Please choose news site:</option>
                    {countries(selectCountry, allNews).map((n: string, i: number) => {
                        return <option key={i} value={n.toLowerCase()}>{n}</option>
                    }) }
                </select>
            </div>
            {(selectNews === URL && selectNews !== '') && 
            <>
                {news ?
                        <div className={styles.all_news_container}>
                                {news.allPage.map((article: any, index: number) => {
                                    return (
                                    <Link href={article.linkURL}>
                                        <a target="_blank" href={article.linkURL} className={styles.item_flex}>
                                            <div key={index}>
                                                <h5 key={index} className={styles.headline}>{article.title}</h5>
                                                <div key={index + 1} className={styles.image}>
                                                    <Image key={index}src={article.image} alt='article-title' width={400} height={250}/>
                                                </div>
                                                <p key={index + 2} className={styles.intro_paragraph}>{article.desc}</p>
                                            </div>
                                        </a>
                                    </Link>
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

export default selectionMenu;