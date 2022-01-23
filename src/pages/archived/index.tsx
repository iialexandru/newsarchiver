import styles from '../../styles/scss/ArchivedNews.module.scss'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import formatDate from '../../utils/formatDate'
import chooseSite from '../../utils/chooseSite'
import { server } from '../../config/index'
import ExtraInfo from '../../components/NewsArchived/ExtraInfo'
import einfo from '../../utils/extraInfo.json'
import useWindowSize from '../../utils/windowSize'

import React, { useRef, useState, useEffect } from 'react'
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from 'axios'
import { useInView } from 'react-intersection-observer'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper'

interface CountryLogo { 
    url: string;
    name: string;
}

interface NewsInfo { 
    country: string;
    news: Array<string>;
}

interface ExtraInfo {
    name: string;
    url: string;
    text: string;
}
interface ChildPropsComponent { 
    all_latest_news: Array<any>;
}

const ArchivedNews: NextPage<ChildPropsComponent> = ({ all_latest_news }) => {

    const [ width, height ] = useWindowSize()
    const [ openInfoOnPhone, setOpenInfoOnPhone ] = useState(false)

    const { ref, inView, entry } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    })

    const router = useRouter()
        
    const newsRomania: string[] = ['DIGI24', 'Antena3']
    const newsGermany: string[] = ['WELT', 'DW']
    const newsFrance: string[] = ['France24', 'Lemonde']
    const newsAustralia: string[] = ['9News', 'SBS']
    const newsCzRep: string[] = ['Expats', 'PragueMorning']
    const newsSwitzerland: string[] = ['LeNews', 'SwissInfo']

    const CountryLogo = ({url, name}: CountryLogo) => {
        return (
            <div className={styles.mini_flexbox}>
                <Image src={url.toString()}
                       width={30} height={20} alt={`${name.toLowerCase()}_flag`} priority/>
                        <span className={styles.country_name_listed}>{name}</span>
            </div>
            )
    }

    const ListOfTheNews = ({ country, news } : NewsInfo ) => {
        return (
            <div className={styles.list_all_channels}>
                <ul>
                    {news.map((name, index) => {
                        return <Link key={index} href={`/archived/${country.toLocaleLowerCase()}?news=${name.toLowerCase()}&page=1`}>
                                    <li key={index}>
                                        {name}
                                    </li>
                                </Link>
                    })}
                </ul>
            </div>
        )
    }

    const InfoItem = ({ name, url, text }: ExtraInfo) => {
        return (
        <div className={`${styles.text_item}`}>
            <div className={styles.logo_title}>
                <Image src={url} width={30} height={30} />
                <Link href={chooseSite(name)}><a target="_blank"><h4>{name}</h4></a></Link>
            </div>
            <ExtraInfo text={text}/>
        </div>
        )
    }

    return (
        <div>
        <Head>
            <link
            rel="preload"
            href="/fonts/Roboto-Bold/Roboto-Bold.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Roboto-Bold/Roboto-Bold.woff"
            as="font"
            type="font/woff"
            crossOrigin="anonymous"
          />
            <link
            rel="preload"
            href="/fonts/Roboto-Bold/Roboto-Bold.ttf"
            as="font"
            type="font/ttf"
            crossOrigin="anonymous" 
          />

        </Head>
            <div className={styles.swiper_wrapper}>
                <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={width < 620 ? 1 : 2}
                spaceBetween={50}
                loop={true}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: true }}
                centeredSlides={true}
                >
                    {all_latest_news.map((post, index) => {
                        return ( 
                            <SwiperSlide key={index} className={`${styles.slide_abimg}`}> 
                                {({ isActive }) => (
                                    <div className={!isActive ? styles.swiper_inactive_slider : ''}>
                                        <figure key={index}>
                                            <div className={isActive ? styles.slide_img_but : ''}>
                                                <Image key={index} alt="An image was not provided by the news site" src={(post.allPage[0].image && post.allPage[0].image !== ' ') ? post.allPage[0].image : '/'} width={550} height={400} priority/>
                                                <button key={index + 1}><Link href={post.allPage[0].linkURL}><a target="_blank">Read more</a></Link></button>
                                            </div>
                                            <figcaption key={index + 2}>
                                                <div key={index} className={styles.wrap_fig_bb}>
                                                    <Link key={index} href={chooseSite(post.allPage[0].channel.toString().toUpperCase())}><a target="_blank"><span style={{position: 'absolute', cursor: 'pointer'}}>{post.allPage[0].channel.toUpperCase()}</span></a></Link>
                                                    <p key={index + 1} style={{margin: 0, textAlign: 'right', cursor: 'default'}}>{formatDate(post.allPage[0].date)}</p>
                                                </div>
                                                <h4 key={index + 1} style={{margin: 0, textAlign: 'center', cursor: 'default', marginTop: '5px'}}><Link href={post.allPage[0].linkURL}><a target='_blank'>{post.allPage[0].title}</a></Link></h4>
                                            </figcaption>
                                        </figure>
                                    </div>
                                )}
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
            <div className={styles.grid_container}>
                
                <div>
                    <CountryLogo url="https://res.cloudinary.com/media-cloud-dw/image/upload/v1640252545/NewsArchiver/flags/Flag_of_Romania_etbciq.svg" name="Romania"/>
                    <ListOfTheNews country='Romania' news={newsRomania} />
                </div>

                <div>
                    <CountryLogo url="https://res.cloudinary.com/media-cloud-dw/image/upload/v1640252544/NewsArchiver/flags/Flag_of_Germany_hr9lyu.svg" name="Germany"/>
                    <ListOfTheNews country='Germany' news={newsGermany} />
                </div>

                <div>
                    <CountryLogo url="https://res.cloudinary.com/media-cloud-dw/image/upload/v1642082820/NewsArchiver/flags/frenchflagframed_nf8kyi.svg" name="France"/>
                    <ListOfTheNews country='France' news={newsFrance} />
                </div>

                <div>
                    <CountryLogo url="https://res.cloudinary.com/media-cloud-dw/image/upload/v1642411448/NewsArchiver/flags/Flag_of_Australia_fsptnt.svg" name="Australia"/>
                    <ListOfTheNews country='Australia' news={newsAustralia} />
                </div>

                <div>
                    <CountryLogo url="https://res.cloudinary.com/media-cloud-dw/image/upload/v1642412526/NewsArchiver/flags/czech-flag_zehxfs.svg" name="Czech Republic"/>
                    <ListOfTheNews country='CzechRepublic' news={newsCzRep} />
                </div>

                <div>
                    <CountryLogo url="https://res.cloudinary.com/media-cloud-dw/image/upload/v1642411800/NewsArchiver/flags/flag-switzerland_c2a3xq.svg" name="Switzerland"/>
                    <ListOfTheNews country='Switzerland' news={newsSwitzerland} />
                </div>
            </div>
            <h1 className={styles.heading_secpart}>Extra Info</h1>
            
            <div className={styles.anim_item}>
                <div ref={ref} className={`${width > 1023 ? styles.grid_info : styles.grid_info_v}  ${(inView && width > 1023) ? styles.vis_true : ''}`}>
                        <InfoItem name={'DIGI24'} text={einfo.digi} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642524685/NewsArchiver/news-logos/Logo_Digi_24__2012_1_qrlpor.svg'} />
                        <InfoItem name={'Antena3'} text={einfo.antena} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642524964/NewsArchiver/news-logos/unnamed_y1rbgm.jpg'} />
                        <InfoItem name={'WELT'} text={einfo.welt} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642525000/NewsArchiver/news-logos/unnamed_cldqcz.png'} />
                        <InfoItem name={'DW'} text={einfo.dw} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642525017/NewsArchiver/news-logos/unnamed_1_fztcob.png'} />
                        {width < 400 ? 
                            <>
                                {openInfoOnPhone && 
                                    <>
                                        <InfoItem name={'France24'} text={einfo.france} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642525017/NewsArchiver/news-logos/unnamed_1_fztcob.png'} />
                                        <InfoItem name={'Le Monde'} text={einfo.lemonde} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642525076/NewsArchiver/news-logos/unnamed_2_plixas.png'} />
                                        <InfoItem name={'9News'} text={einfo.newsn} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642525098/NewsArchiver/news-logos/unnamed_3_xnzkj8.png'} />
                                        <InfoItem name={'SBS'} text={einfo.sbs} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642525137/NewsArchiver/news-logos/download_jhyjyb.png'} />
                                        <InfoItem name={'Expats'} text={einfo.expats} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642525164/NewsArchiver/news-logos/expats_zhlj93.jpg'} />
                                        <InfoItem name={'Prague Morning'} text={einfo.praguemorning} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642525198/NewsArchiver/news-logos/download_1_bzvzd6.png'} />
                                        <InfoItem name={'Le News'} text={einfo.lenews} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642525217/NewsArchiver/news-logos/download_dtcw0z.jpg'} />
                                        <InfoItem name={'SwissInfo'} text={einfo.swissinfo} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642525242/NewsArchiver/news-logos/icon_ntmu4q.webp'} />
                                    </>
                                }
                                <a style={{paddingBottom: 0, border: 'none', background: 'none', borderBottom: '1.5px solid black', textAlign: 'center', fontSize: '.7rem'}} onClick={e => setOpenInfoOnPhone(!openInfoOnPhone)}>
                                {openInfoOnPhone ? 'Read less...' : 'Read more...'} 
                                </a>
                                <style jsx>
                                    {`
                                    a:active {
                                        color: #a45ee5;
                                        background-color: #a45ee5;
                                    }
                                    `}
                                </style>
                            </>
                            :
                            <>
                                <InfoItem name={'France24'} text={einfo.france} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642525017/NewsArchiver/news-logos/unnamed_1_fztcob.png'} />
                                <InfoItem name={'Le Monde'} text={einfo.lemonde} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642525076/NewsArchiver/news-logos/unnamed_2_plixas.png'} />
                                <InfoItem name={'9News'} text={einfo.newsn} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642525098/NewsArchiver/news-logos/unnamed_3_xnzkj8.png'} />
                                <InfoItem name={'SBS'} text={einfo.sbs} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642525137/NewsArchiver/news-logos/download_jhyjyb.png'} />
                                <InfoItem name={'Expats'} text={einfo.expats} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642525164/NewsArchiver/news-logos/expats_zhlj93.jpg'} />
                                <InfoItem name={'Prague Morning'} text={einfo.praguemorning} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642525198/NewsArchiver/news-logos/download_1_bzvzd6.png'} />
                                <InfoItem name={'Le News'} text={einfo.lenews} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642525217/NewsArchiver/news-logos/download_dtcw0z.jpg'} />
                                <InfoItem name={'SwissInfo'} text={einfo.swissinfo} url={'https://res.cloudinary.com/media-cloud-dw/image/upload/v1642525242/NewsArchiver/news-logos/icon_ntmu4q.webp'} />
                            </>
                        }
                </div>
            </div>
        </div>
    )
}

export default ArchivedNews;

export const getServerSideProps: GetServerSideProps = async (context: any) => {
    const url = `${server}/api/news/`
    const createFetchLink = (id: string) => { return axios.get(`${url}${id}_nc`) }  
    const response = new Array(await createFetchLink('digi24'), await createFetchLink('antena3'), await createFetchLink('france24'), 
                     await createFetchLink('lemonde'), await createFetchLink('dw'), await createFetchLink('welt'), 
                     await createFetchLink('9news'), await createFetchLink('sbs'), await createFetchLink('expats'), 
                     await createFetchLink('praguemorning'), await createFetchLink('lenews'), await createFetchLink('swissinfo'))

    const data: any[] = [];

    for(let i in response){
        data.push(response[i].data)
    }

    return {
        props: {
            all_latest_news: data
        }
    }
}