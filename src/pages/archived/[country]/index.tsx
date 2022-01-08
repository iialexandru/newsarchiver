import styles from '../../../styles/scss/NewsComparison.module.scss'
import specStyles from '../../../styles/scss/CountryNews.module.scss'
import nav from '../../../styles/scss/Pagination.module.scss'
import formatDate from '../../../utils/formatDate'
import { server } from '../../../config/index'

import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { isAfter, isBefore, startOfTomorrow } from 'date-fns'

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

interface Data {
    allPage: {[
        key: string
    ]: any
    }
    totalPages: number;
}

interface News { news: Data }

const SingleCountryNews: NextPage<News> = ({ news }) => {

    const WHButton = styled(Button)(() => ({
        ':hover': {
          backgroundColor: '#e6e6e6',
        },
    }));
      
    const defaultMaterialTheme = createTheme({
        palette: {
            primary: {
                main: '#5B554F'
            }
        }
    });

    const filterButtonsTheme = createTheme({
        palette: {
            primary: {
                main: '#fff'
            }
        }
    })

    const router = useRouter()

    const [ value, setValue ] = useState<Date | null>(null)
    const [ openedFilters, setOpenedFilters ] = useState(false)


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
        if(currentButton !== value){
            router.replace({
                pathname: router.pathname,
                query: { ...router.query, page: encodeURIComponent(value.toString().toLowerCase()) }
            })
        }
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

    const handleDateFilter = () => {
        value && router.replace({
            pathname: router.pathname,
            query: { ...router.query, year: encodeURIComponent(value.getFullYear()), month: encodeURIComponent(value.getMonth() + 1), day: encodeURIComponent(value.getDate())}
        })
        return false
    }

    const resetDateFilter = () => {
        value && router.replace({
            pathname: router.pathname,
            query: { ...router.query, page: encodeURIComponent(1), year: router.query.year && null, month: router.query.month && null, day: router.query.day && null}
        })
        setValue(null)
    }
    
    const resetAllFilters = () => {
        router.replace({
            pathname: router.pathname,
            query: { news: router.query.news, page: encodeURIComponent(1) }
        })
        setValue(null)   
    }
    
    const orderingFilter = (e: any) => {
        router.replace({
            pathname: router.pathname,
            query: { ...router.query, page: encodeURIComponent(1), sort: e.target.getAttribute('type-order') === 'oldest' ? encodeURIComponent('oldest') : encodeURIComponent('latest')}
        })
    }

    useEffect(() => {
        (value && value.getFullYear() && value.getMonth() + 1 && value.getDate() && isAfter(value, new Date(2021, 11, 27)) && isBefore(value, startOfTomorrow()) ) ? handleDateFilter() : resetDateFilter()
    console.log(value)
    }, [value])

    return (
        <>
            <div className={specStyles.filters_buttons}>
                <ThemeProvider theme={defaultMaterialTheme}>
                    <WHButton type="button" variant="outlined" size="small" endIcon={!openedFilters ? <KeyboardArrowDownRoundedIcon /> : <KeyboardArrowUpRoundedIcon />} onClick={e => setOpenedFilters(!openedFilters)}>FILTERS</WHButton>
                    <WHButton type="button" variant="outlined" size="small" endIcon={<FilterAltOffOutlinedIcon />} onClick={e => resetAllFilters()}>RESET</WHButton>
                </ThemeProvider>
            </div>
            {openedFilters &&
                <div className={specStyles.filters_container}>
                    <div className={styles.order_news}>
                        <Stack direction="row" alignItems='center' spacing={2}>
                                <label>Date added: </label>
                            <ThemeProvider theme={filterButtonsTheme}>
                                <WHButton type="button" variant="contained" type-order="latest" size="small" onClick={e => orderingFilter(e)}>latest</WHButton>
                                <WHButton type="button" variant="contained" type-order="oldest" size="small" onClick={e => orderingFilter(e)}>oldest</WHButton>
                            </ThemeProvider>
                        </Stack>
                    </div>
                    
                    <div className={styles.calendar}>
                        <label htmlFor="calendar">Specific date:</label>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                                label="DATE"
                                value={value}
                                onChange={(newValue) => {
                                setValue(newValue);
                                }}
                                maxDate={new Date()}
                                minDate={new Date(2021, 11, 28)}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                    </div>
                </div>
                }
            <div className={specStyles.all_news_container}>
                {news.allPage.map((article: any, index: number) => {
                    return(
                    <Link key={index} href={article.linkURL} >
                        <a key={index + 1} target="_blank" rel="noreferrer" className={`${specStyles.item_flex}`}>
                                <figure key={index + 1} className={specStyles.image}>
                                    <Image key={index} src={article.image} alt='article-title' width={455} height={250} priority/>
                                    <figcaption key={index + 1} className={specStyles.date_creation}>{formatDate(article.date)}</figcaption>
                                </figure>
                                <h5 key={index} className={specStyles.headline}>{article.title}</h5>
                                <p key={index + 2} className={specStyles.intro_paragraph}>{article.desc}</p>
                        </a>
                    </Link>
                    )
                })}
            </div>

            <div className={nav.container_flex} style={{marginTop: '2em'}}>
                <button onClick={prevPage}>
                    <Image src="https://res.cloudinary.com/media-cloud-dw/image/upload/v1640607832/NewsArchiver/arrows/clipart2203023_vvyiac.png" 
                            width={10} height={15} alt="left-arrow" priority/>
                </button>
                {arrCurBtn.map((value: number, index: number) => 
                <div key={index}>
                        { value.toString() !== dotsInitial && value.toString() !== dotsRight && value.toString() !== dotsLeft ?
                            <button type="button" key={index} className={currentButton !== value ? nav.disactivated : ''} 
                        onClick={e => changePage(value)} >{value}</button>
                        : <span key={index}>{value}</span> }
                </div>
                )}  
                <button onClick={nextPage}>
                    <Image src="https://res.cloudinary.com/media-cloud-dw/image/upload/v1640607832/NewsArchiver/arrows/clipart2826625_fd0ave.png" 
                        width={10} height={15} alt="right-arrow" priority/>
                </button>
            </div>
    </>
    )
}

export default SingleCountryNews;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const { query } = context;
    const { news, page, year, month, day, sort } = query;

    const variants = [ 'digi24', 'antena3' ]
 
    if(!variants.includes(news.toString()) && news)
        return {
            notFound: true
        }

    const response = (parseInt(year) && parseInt(month) && parseInt(day) && news) ? await fetch(`${server}/api/news/${news}_nc/filter_by_date?page=${(parseInt(page) - 1).toString()}&year=${year}&month=${month}&day=${day}&limit=12&sort=${sort}`) : (news && await fetch(`${server}/api/news/${news}_nc?page=${(parseInt(page) - 1).toString()}&limit=12&sort=${sort}`) )
    const data = response && await response.json()

    return {
        props: {
            news: data,
        }
    }
}