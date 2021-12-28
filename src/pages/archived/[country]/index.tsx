import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import styles from '../../../styles/scss/NewsComparison.module.scss'
import specStyles from '../../../styles/scss/CountryNews.module.scss'
import nav from '../../../styles/scss/Navigation.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import formatDate from '../../../utils/formatDate'

interface Data {
    allPage: {[
        key: string
    ]: any
    }
    totalPages: number;
}

interface News { news: Data }

const SingleCountryNews: NextPage<News> = ({ news }) => {

    const router = useRouter()

    const change_page = (page: string) => {
        router.replace({
            pathname: router.pathname,
            query: { ...router.query, page: encodeURIComponent(page.toLowerCase()) }
        })
    }

    const[ arrCurBtn, setArrCurBtn] = useState<any[]>([])
    const [currentButton, setCurrentButton] = useState<number>(parseInt(router.query.page as string) > 0 ? parseInt(router.query.page as string) : 1)
  
    let numberPages: number[] = []
    for(let i = 1; i <= news.totalPages; i++)
       numberPages.push(i)
  
    let dotsInitial: string = '...'
    let dotsLeft: string = '... '
    let dotsRight: string = ' ...'
    useEffect(() => {
      let tempNumberOfPages: any = [...numberPages]
  
      if(numberPages.length <= 6){
        const sliced = numberPages.slice(0, 6)
        tempNumberOfPages = [...sliced]
      }
      else if(currentButton >= 1 && currentButton < 3){
        tempNumberOfPages = [1, 2, 3, dotsInitial, numberPages.length]
      }
      else if(currentButton >= 3 && currentButton <= 4){
        const sliced = numberPages.slice(0, 5)
        tempNumberOfPages = [...sliced, dotsInitial, numberPages.length]
      }
      else if(currentButton > 4 && currentButton < numberPages.length - 2){
        const sliced1 = numberPages.slice(currentButton - 2, currentButton)
        const sliced2 = numberPages.slice(currentButton, currentButton + 1)
        tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberPages.length])
      }
      else if(currentButton > numberPages.length - 3){
        const sliced = numberPages.slice(numberPages.length - 4)
        tempNumberOfPages = ([1,  dotsLeft, ...sliced])
      }
        
      setArrCurBtn(tempNumberOfPages)
    }, [currentButton, dotsLeft, dotsRight, dotsInitial, news.totalPages])

    const changePage = (value: number) => {
        setCurrentButton(value)
        if(currentButton !== value)
            change_page((value).toString());  
    }

    return (
        <>
            <div className={styles.all_news_container}>
                {news.allPage.map((article: any, index: number) => {
                    return(
                    <Link key={index} href={article.linkURL} >
                        <a key={index + 1} target="_blank" rel="noreferrer" className={specStyles.item_flex} href={article.linkURL}>
                                <h5 key={index} className={styles.headline}>{article.title}</h5>
                                <div key={index + 1} className={specStyles.image}>
                                    <Image key={index} src={article.image} alt='article-title' width={400} height={250}/>
                                </div>
                                <span style={{fontWeight: 'bold', marginLeft: "1vw"}}>{formatDate(article.date)}</span>
                                <p key={index + 2} className={specStyles.intro_paragraph}>{article.desc}</p>
                        </a>
                    </Link>
                    )
                })}
            </div>
            <div className={nav.container_flex}>
                {arrCurBtn.map((value: number, index: number) => 
                        // { value.toString() !== (dotsInitial || dotsLeft || dotsRight ) ?
                        <button type="button" key={index} className={currentButton !== value ? nav.disactivated : ''} 
                        onClick={e => changePage(value)} >{value}</button>
                        // : <span key={index} className={nav.disactivated}>{value}</span> }
                )}  
            </div>
        </>
    )
}

export default SingleCountryNews;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const { query } = context;
    const { news, page } = query;

    const variants = [ 'digi24', 'antena3' ]
 
    if(!variants.includes(news.toString()) && news)
        return {
            notFound: true
        }

    const response = news && await axios.get(`http://localhost:9000/api/screenshots/${news}_nc?page=${(parseInt(page) - 1).toString()}`)
    const data = response && await response.data

    return {
        props: {
            news: data,
        }
    }
}