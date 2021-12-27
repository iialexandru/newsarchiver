import styles from '../styles/scss/NewsComparison.module.scss'
import nav from '../styles/scss/Navigation.module.scss'
import { FC, useState, useEffect } from 'react'
import countries from '../utils/NewsComparison/countrySelect'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'

interface Default {
    allPage: {[
        key: string
    ]: any
    };
    totalPages: number;
}

interface ChildPropsComponent {
    news: Default;
    change_news_query: (news: string) => void;
    URL: string | string[] | undefined;
}

const SelectionMenu: FC<ChildPropsComponent> = ({ news, change_news_query, URL }) => {

    const router = useRouter()

    const [ selectCountry, setSelectCountry ] = useState("")
    const [ selectNews, setSelectNews ] = useState<string>("default")

    const newsRomania: string[] = ['DIGI24', 'Antena3']
    const newsGermany: string[] = ['WELT', 'DW']
    const newsFrance: string[] = ['France24', 'Lemonde']
    const allNews = [newsRomania, newsGermany, newsFrance]

    const[ arrCurBtn, setArrCurBtn] = useState<any[]>([])
    const [currentButton, setCurrentButton] = useState<number>(parseInt(router.query.page as string) >= 0 ? parseInt(router.query.page as string) : 1)
  
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
    }, [currentButton, dotsInitial, dotsLeft, dotsRight])

    console.log(currentButton)

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
                                    <Link key={index} href={article.linkURL}>
                                        <a key={index + 1} target="_blank" href={article.linkURL} className={styles.item_flex} rel="noreferrer">
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
            <div className={nav.container_flex}>
                <span>k</span>
                {arrCurBtn.map((value: number) => 
                        <button onClick={e => setCurrentButton(value)}>{value}</button>
                )}
                <span>k</span>
            </div>
        </>
        }

    </div>
    )
}

export default SelectionMenu;