import styles from '../styles/scss/NewsComparison.module.scss'
import nav from '../styles/scss/Navigation.module.scss'
import { FC, useState, useEffect, Fragment } from 'react'
import countries from '../utils/NewsComparison/countrySelect'
import formatDate from '../utils/formatDate'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '@mui/material/Button';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import format from 'date-fns/format'
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import blueGrey from "@material-ui/core/colors/blueGrey";

interface Default {
    allPage: {[
        key: string
    ]: any
    };
    totalPages: number;
}

interface ChildPropsComponent {
    name: number;
    news: Default;
    change_news_query: (news: string) => void;
    change_page_query: (page: string) => void;
    PAGE: string | string[] | undefined;
    URL: string | string[] | undefined;
}

const SelectionMenu: FC<ChildPropsComponent> = ({ name, news, change_news_query, change_page_query, PAGE, URL }) => {

    const router = useRouter()

    const defaultMaterialTheme = createMuiTheme({
        palette: {
            primary: blueGrey,
        },
    });

    const [ selectCountry, setSelectCountry ] = useState("")
    const [ selectNews, setSelectNews ] = useState<string>("default")

    const newsRomania: string[] = ['DIGI24', 'Antena3']
    const newsGermany: string[] = ['WELT', 'DW']
    const newsFrance: string[] = ['France24', 'Lemonde']
    const allNews = [newsRomania, newsGermany, newsFrance]

    const[ arrCurBtn, setArrCurBtn] = useState<any[]>([])
    const [currentButton, setCurrentButton] = useState<number>(parseInt(PAGE as string) > 0 ? parseInt(PAGE as string) : 1)
  
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
    }, [currentButton, dotsLeft, dotsRight, dotsInitial, selectNews, news.totalPages])

    const changePage = (value: number) => {
        setCurrentButton(value)
        if(currentButton !== value)
            change_page_query((value).toString());  
    }

    const handleSubmit_f = (e: any) => {
        e.preventDefault()
        value && router.replace({
            pathname: router.pathname,
            query: { ...router.query, year_f: encodeURIComponent(value.getFullYear()), month_f: encodeURIComponent(value.getMonth() + 1), day_f: encodeURIComponent(value.getDate())}
        })
    }

    const handleSubmit_s = (e: any) => {
        e.preventDefault()
        value && router.replace({
            pathname: router.pathname,
            query: { ...router.query, year_s: encodeURIComponent(value.getFullYear()), month_s: encodeURIComponent(value.getMonth() + 1), day_s: encodeURIComponent(value.getDate())}
        })
    }

    const resetFilter_f = (e: any) => {
        e.preventDefault();
        router.replace({
            pathname: router.pathname,
            query: { ...router.query, year_f: undefined, month_f: undefined, day_f: undefined}
        })
    }

    const resetFilter_s = (e: any) => {
        e.preventDefault();
        router.replace({
            pathname: router.pathname,
            query: { ...router.query, year_s: undefined, month_s: undefined, day_s: undefined}
        })
    }

    const nextPage = () => {
        if(name === 1){
            if(news.totalPages >= parseInt(PAGE!.toString()) + 1) {
                router.replace({ 
                    pathname: router.pathname, 
                    query: { ...router.query, page_f: encodeURIComponent(parseInt(router.query.page_f!.toString()) + 1)} 
                })
                setCurrentButton(parseInt(router.query.page_f!.toString()) + 1)
            }
        }
        else {
            if(news.totalPages >= parseInt(PAGE!.toString()) + 1) {
                router.replace({ 
                    pathname: router.pathname, 
                    query: { ...router.query, page_s: encodeURIComponent(parseInt(router.query.page_s!.toString()) + 1)} 
                })
                setCurrentButton(parseInt(router.query.page_s!.toString()) + 1)
            }
        }
    }

    const prevPage = () => {
        if(name === 1) {
            if(parseInt(PAGE!.toString()) - 1 >= 1) {
                router.replace({ 
                    pathname: router.pathname, 
                    query: { ...router.query, page_f: encodeURIComponent(parseInt(router.query.page_f!.toString()) - 1)} 
                })
                setCurrentButton(parseInt(router.query.page_f!.toString()) - 1)
            }
        }
        else { 
            if(parseInt(PAGE!.toString()) - 1 >= 1) {
                router.replace({ 
                    pathname: router.pathname, 
                    query: { ...router.query, page_s: encodeURIComponent(parseInt(router.query.page_s!.toString()) - 1)} 
                })
                setCurrentButton(parseInt(router.query.page_s!.toString()) - 1)
            } 
        }
    }

    const [ value, setValue ] = useState<Date | null>(null)

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
                {news.allPage ?
                        <>
                        <form className={`${styles.form_filter} ${styles.item}`} style={{marginTop: ".5em"}} method="GET" onSubmit={e => { if(name === 1) { handleSubmit_f(e); } else if(name === 2) { handleSubmit_s(e); } } }>
                            <label>Date:</label>    
                            <div>
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <KeyboardDatePicker
                                            clearable
                                            value={value}
                                            placeholder="10/10/2018"
                                            onChange={date => setValue(date)}
                                            minDate={format(new Date(2021, 11, 28), 'yyyy/MM/dd')}
                                            maxDate={format(new Date(), 'yyyy/MM/dd')}
                                            format="dd/MM/yyyy"
                                        />
                                    </MuiPickersUtilsProvider>
                                </ThemeProvider>
                                <Button type="submit" variant="outlined" size="small" endIcon={<FilterAltOutlinedIcon />}>FILTER</Button>
                                <Button type="button" variant="outlined" size="small" endIcon={<FilterAltOffOutlinedIcon />} onClick={e => { if(name === 1) { resetFilter_f(e) } else if(name === 2) { resetFilter_s(e) } } }>RESET</Button>
                            </div>
                        </form>
                            <div className={styles.all_news_container}>
                                    {news.allPage.map((article: any, index: number) => {
                                        return (
                                        <Link key={index} href={article.linkURL}>
                                            <a key={index + 1} target="_blank" href={article.linkURL} className={styles.item_flex} rel="noreferrer">
                                                    <figure key={index + 1} className={styles.image}>
                                                        <Image key={index} src={article.image} alt='article-title' width={500} height={330}/>
                                                        <figcaption className={styles.date_creation}>{formatDate(article.date)}</figcaption>
                                                    </figure>
                                                    <h5 key={index} className={styles.headline}>{article.title}</h5>
                                                    <p key={index + 2} className={styles.intro_paragraph}>{article.desc}</p>
                                            </a>
                                        </Link>
                                        )
                                    })}
                            </div>
                            <div className={nav.container_flex}>
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

export default SelectionMenu;