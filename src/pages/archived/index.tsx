import styles from '../../styles/scss/ArchivedNews.module.scss'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import formatDate from '../../utils/formatDate'
import chooseSite from '../../utils/chooseSite'
import { server } from '../../config/index'

import React, { useRef, useState } from 'react'
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import axios from 'axios'

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

interface ChildPropsComponent { 
    all_latest_news: Array<any>;
}

const ArchivedNews: NextPage<ChildPropsComponent> = ({ all_latest_news }) => {

    const [ swiperIndex, setSwiperIndex ] = useState(0)

    const router = useRouter()
        
    const newsRomania: string[] = ['DIGI24', 'Antena3']
    const newsGermany: string[] = ['WELT', 'DW']
    const newsFrance: string[] = ['France24', 'Lemonde']
    const newsAustralia: string[] = ['9News', 'SBS.AU']
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
    return (
        <div>
            <div className={styles.swiper_wrapper}>
                {/* <h1>Latest news</h1> */}
                <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                slidesPerView={2}
                spaceBetween={50}
                loop={true}
                navigation
                autoplay={{ delay: 3000, disableOnInteraction: true }}
                centeredSlides={true}
                onSlideChange={(swiper) => setSwiperIndex(swiper.realIndex)}>
                    {all_latest_news.map((post, index) => {
                        return ( 
                            <SwiperSlide key={index} className={`${styles.slide_abimg} ${swiperIndex !== index ? styles.swiper_inactive_slider : ''}`}> 
                                <figure key={index}>
                                    <div className={swiperIndex === index ? styles.slide_img_but : styles.fill_space}>
                                        <Image key={index} alt="An image was not provided by the news site" src={post.allPage[0].image ? post.allPage[0].image : '/'} width={550} height={400}/>
                                        <button key={index + 1}><Link href={post.allPage[0].linkURL}><a target="_blank">Read more</a></Link></button>
                                    </div>
                                    <figcaption key={index + 2}>
                                        <div key={index} className={styles.wrap_fig_bb}>
                                            <Link key={index} href={chooseSite(post.allPage[0].channel.toString().toUpperCase())}><a target="_blank"><span style={{position: 'absolute', fontSize: '.6rem', cursor: 'pointer'}}>{post.allPage[0].channel.toUpperCase()}</span></a></Link>
                                            <p key={index + 1} style={{margin: 0, textAlign: 'right', fontSize: '.6rem', cursor: 'default'}}>{formatDate(post.allPage[0].date)}</p>
                                        </div>
                                        <h4 key={index + 1} style={{margin: 0, textAlign: 'center', cursor: 'default', fontSize: 'clamp(.7, 1, 1.3rem)', marginTop: '5px'}}><Link href={post.allPage[0].linkURL}><a target='_blank'>{post.allPage[0].title}</a></Link></h4>
                                    </figcaption>
                                </figure>
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