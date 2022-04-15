import Image from 'next/image';
import { useState, useEffect, FC } from 'react'
import { useRouter } from 'next/router'

import styles from '../../styles/scss/Pagination.module.scss'
import useWindowSize from '../../utils/windowSize'


interface ChildPropsComponent { 
    section: number;
    numberOfPages: number;
    PAGE: string | string[] | undefined;
}

const Pagination: FC<ChildPropsComponent> = ({ section, numberOfPages, PAGE }) => {

    const router = useRouter()

    const [ width, height ] = useWindowSize()

    const nextPage = () => {
        if(section === 1){
            if(numberOfPages >= parseInt(PAGE!.toString()) + 1) {
                router.replace({ 
                    pathname: router.pathname, 
                    query: { ...router.query, page_f: encodeURIComponent(parseInt(router.query.page_f!.toString()) + 1)} 
                })
                setCurrentButton(parseInt(router.query.page_f!.toString()) + 1)
            }
        }
        else {
            if(numberOfPages >= parseInt(PAGE!.toString()) + 1) {
                router.replace({ 
                    pathname: router.pathname, 
                    query: { ...router.query, page_s: encodeURIComponent(parseInt(router.query.page_s!.toString()) + 1)} 
                })
                setCurrentButton(parseInt(router.query.page_s!.toString()) + 1)
            }
        }
    }

    const prevPage = () => {
        if(section === 1) {
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

    const sendToFirstPage = () => {
        if(section === 1) {
            if(parseInt(PAGE!.toString()) - 1 >= 1) {
                router.replace({
                    pathname: router.pathname,
                    query: { ...router.query, page_f: encodeURIComponent(1)}
                })
                setCurrentButton(1)
            }
        }
        else {
            if(parseInt(PAGE!.toString()) - 1 >= 1) {
                router.replace({
                    pathname: router.pathname,
                    query: { ...router.query, page_s: encodeURIComponent(1)}
                })
                setCurrentButton(1)
            }
        }
    }

    const sendToLastPage = () => {
        if(section === 1){
            if(numberOfPages >= parseInt(PAGE!.toString()) + 1) {
                router.replace({
                    pathname: router.pathname,
                    query: { ...router.query, page_f: encodeURIComponent(numberOfPages)}
                })
                setCurrentButton(numberOfPages)
            }
        }
        else {
            if(numberOfPages >= parseInt(PAGE!.toString()) + 1) {
                router.replace({
                    pathname: router.pathname,
                    query: { ...router.query, page_s: encodeURIComponent(numberOfPages)}
                })
                setCurrentButton(numberOfPages)
            }
        }
    }

    const[ arrCurBtn, setArrCurBtn] = useState<any[]>([])
    const [currentButton, setCurrentButton] = useState<number>(parseInt(PAGE as string) > 0 ? parseInt(PAGE as string) : 1)
  
    let numberPages: number[] = []
    for(let i = 1; i <= numberOfPages; i++)
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
    }, [currentButton, dotsLeft, dotsRight, dotsInitial, numberOfPages])

    const change_first_page = (page: string) => {
        router.replace({
            pathname: router.pathname,
            query: { ...router.query, page_f: encodeURIComponent(page.toLowerCase()) }
        })
    }

    const change_second_page = (page: string) => {
        router.replace({
            pathname: router.pathname,
            query: { ...router.query, page_s: encodeURIComponent(page.toLowerCase()) }
        })
    }

    const changePage = (value: number) => {
        setCurrentButton(value)
        if(currentButton !== value){
            if(section === 1)
                change_first_page(value.toString());  
            else change_second_page(value.toString())
        }
    }

    return (
        <div className={styles.container_flex}>
            {width <= 620 &&
                <button onClick={sendToFirstPage} style={{opacity: `${currentButton <= 1 ? '0.5' : '1'}`}} disabled={currentButton <= 1}>
                    <Image
                        src="https://res.cloudinary.com/multimediarog/image/upload/v1640607832/NewsArchiver/arrows/clipart2203023_vvyiac.png"
                        width={width > 481 ? 10 : 5} height={width > 481 ? 15 : 10} priority/>
                    <Image
                        src="https://res.cloudinary.com/multimediarog/image/upload/v1640607832/NewsArchiver/arrows/clipart2203023_vvyiac.png"
                        width={width > 481 ? 10 : 5} height={width > 481 ? 15 : 10} priority/>
                </button>
            }
            <button onClick={prevPage} style={{opacity: `${currentButton <= 1 ? '0.5' : '1'}`}} disabled={currentButton <= 1}>
                <Image
                    src="https://res.cloudinary.com/multimediarog/image/upload/v1640607832/NewsArchiver/arrows/clipart2203023_vvyiac.png"
                    width={width > 481 ? 10 : 5} height={width > 481 ? 15 : 10} priority/>
            </button>
            {width > 620 ?
                arrCurBtn.map((value: number, index: number) =>
                        <div key={index}>
                            {value.toString() !== dotsInitial && value.toString() !== dotsRight && value.toString() !== dotsLeft ?
                                <button type="button" key={index}
                                        className={currentButton !== value ? styles.disactivated : ''}
                                        onClick={e => changePage(value)}>{value}</button>
                                : <span key={index}>{value}</span>}
                        </div>
                    )
                :
                <div className={styles.pag_ph_nc}>
                    <p>{currentButton}/{numberOfPages}</p>
                </div>
            }
            <button onClick={nextPage} style={{opacity: `${currentButton >= numberOfPages ? '0.5' : '1'}`}} disabled={currentButton >= numberOfPages}>
                <Image
                    src="https://res.cloudinary.com/multimediarog/image/upload/v1640607832/NewsArchiver/arrows/clipart2826625_fd0ave.png"
                    width={width > 481 ? 10 : 5} height={width > 481 ? 15 : 10} priority/>
            </button>
            {width <= 620 &&
                <button onClick={sendToLastPage} style={{opacity: `${currentButton >= numberOfPages ? '0.5' : '1'}`}}
                        disabled={currentButton >= numberOfPages}>
                    <Image
                        src="https://res.cloudinary.com/multimediarog/image/upload/v1640607832/NewsArchiver/arrows/clipart2826625_fd0ave.png"
                        width={width > 481 ? 10 : 5} height={width > 481 ? 15 : 10} priority/>
                    <Image
                        src="https://res.cloudinary.com/multimediarog/image/upload/v1640607832/NewsArchiver/arrows/clipart2826625_fd0ave.png"
                        width={width > 481 ? 10 : 5} height={width > 481 ? 15 : 10} priority/>
                </button>
            }
        </div>
    )
}

export default Pagination;