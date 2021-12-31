import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import styles from '../../../styles/scss/NewsComparison.module.scss'
import specStyles from '../../../styles/scss/CountryNews.module.scss'
import nav from '../../../styles/scss/Navigation.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import formatDate from '../../../utils/formatDate'
import { DateTime } from 'luxon'
import { server } from '../../../config/index'

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

    const [ year, setYear ] = useState<number>()
    const [ month, setMonth ] = useState<number>()
    const [ day, setDay ] = useState<number>()

    const handleSubmit = (e: any) => {
        e.preventDefault()
        const toUTC = (year && month && day) && DateTime.utc(year, month, day)
        toUTC && router.replace({
            pathname: router.pathname,
            query: { ...router.query, year: encodeURIComponent(toUTC.year), month: encodeURIComponent(toUTC.month), day: encodeURIComponent(toUTC.day)}
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

    const resetFilter = (e: any) => {
        e.preventDefault();
        setYear(NaN)
        setMonth(NaN)
        setDay(NaN)
        router.replace({
            pathname: router.pathname,
            query: { ...router.query, year: undefined, month: undefined, day: undefined}
        })
    }

    const nextPage = () => {
            if(news.totalPages >= parseInt(router.query.page!.toString()) + 1) {
                router.replace({ 
                    pathname: router.pathname, 
                    query: { ...router.query, page: encodeURIComponent(parseInt(router.query.page!.toString()) + 1)} 
                })
                setCurrentButton(parseInt(router.query.page!.toString()) + 1)
            }
    }

    const prevPage = () => {
            if(parseInt(router.query.page!.toString()) - 1 >= 1) {
                router.replace({ 
                    pathname: router.pathname, 
                    query: { ...router.query, page: encodeURIComponent(parseInt(router.query.page!.toString()) - 1)} 
                })
                setCurrentButton(parseInt(router.query.page!.toString()) - 1)
            }
        }

    return (
        <>
            <form className={`${styles.form_filter} ${styles.item}`} style={{marginTop: ".5em"}} method="GET" onSubmit={e => handleSubmit(e)}>
                <label>Date:</label>
                <div className={styles.flexbox_form_inputs}>
                    <input type="number" id="year" name="year" min="2021" max="2022" placeholder="Year" value={year} onChange={e => setYear(parseInt(e.target.value))} />
                    <span>/</span>
                    <input type="number" id="month" name="month" min="1" max="12" placeholder="Month" value={month} onChange={e => setMonth(parseInt(e.target.value))} />
                    <span>/</span>
                    <input type="number" id="day" name="day" min="1" max="31" placeholder="Day" value={day} onChange={e => setDay(parseInt(e.target.value))} />
                    <button type="submit">Filter</button>
                    <button type="button" onClick={e => resetFilter(e)}>Reset</button>
                </div>
            </form>
            <div className={specStyles.all_news_container}>
                {news.allPage.map((article: any, index: number) => {
                    return(
                    <Link key={index} href={article.linkURL} >
                        <a key={index + 1} target="_blank" rel="noreferrer" className={specStyles.item_flex} href={article.linkURL}>
                                <h5 key={index} className={specStyles.headline}>{article.title}</h5>
                                <figure key={index + 1} className={specStyles.image}>
                                    <Image key={index} src={article.image} alt='article-title' width={400} height={250} />
                                    <figcaption className={specStyles.date_creation}>{formatDate(article.date)}</figcaption>
                                </figure>
                                <p key={index + 2} className={specStyles.intro_paragraph}>{article.desc}</p>
                        </a>
                    </Link>
                    )
                })}
            </div>

            <div className={nav.container_flex} style={{marginTop: '2em'}}>
                <button onClick={prevPage}>
                    <Image src="https://res.cloudinary.com/media-cloud-dw/image/upload/v1640607832/NewsArchiver/arrows/clipart2203023_vvyiac.png" 
                            width={10} height={15} priority/>
                </button>
                {arrCurBtn.map((value: number, index: number) => 
                <>
                        { value.toString() !== dotsInitial && value.toString() !== dotsRight && value.toString() !== dotsLeft ?
                            <button type="button" key={index} className={currentButton !== value ? nav.disactivated : ''} 
                        onClick={e => changePage(value)} >{value}</button>
                        : <span key={index}>{value}</span> }
                </>
                )}  
                <button onClick={nextPage}>
                    <Image src="https://res.cloudinary.com/media-cloud-dw/image/upload/v1640607832/NewsArchiver/arrows/clipart2826625_fd0ave.png" 
                        width={10} height={15} priority/>
                </button>
            </div>
        </>
    )
}

export default SingleCountryNews;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const { query } = context;
    const { news, page, year, month, day } = query;

    const variants = [ 'digi24', 'antena3' ]
 
    if(!variants.includes(news.toString()) && news)
        return {
            notFound: true
        }

    const response = (parseInt(year) && parseInt(month) && parseInt(day) && news) ? await fetch(`${server}/api/news/${news}_nc/filter_by_date?page=${(parseInt(page) - 1).toString()}&year=${year}&month=${month}&day=${day}&limit=12`) : (news && await fetch(`${server}/api/news/${news}_nc?page=${(parseInt(page) - 1).toString()}&limit=12`) )
    const data = response && await response.json()

    return {
        props: {
            news: data,
        }
    }
}