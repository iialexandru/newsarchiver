import styles from '../../styles/scss/ArchivedNews.module.scss'
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import formatDate from '../../utils/formatDate'

import React, { useRef, useState } from 'react'
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import axios from 'axios'

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper'

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
    console.log(all_latest_news[0].allPage[0].linkURL)
    
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
    return (
        <div>
            <div className={styles.swiper_wrapper}>
                <Swiper
                modules={[Navigation, Pagination]}
                autoplay
                slidesPerView={2}
                loop={true}
                navigation
                centeredSlides={true}
                onSlideChange={(swiper) => setSwiperIndex(swiper.realIndex)}>
                    {all_latest_news.map((post, index) => {
                        return ( 
                            <SwiperSlide key={index} className={`${styles.slide_abimg} ${swiperIndex === index ? styles.swiper_slide_hover : styles.swiper_inactive_slider}`}> 
                                <figure>
                                <Image key={index} alt="An image was not provided by the news site" src={post.allPage[0].image} width={550} height={400}/>
                                <span style={{ position: "absolute", top: '40%', left:'37%',}}>Check out the article</span>
                                <figcaption>
                                    <Link href={post.allPage[0].linkURL.toString()}><a target="_blank"><span style={{position: 'absolute', fontSize: '.6rem', color: 'rgb(190, 190, 190)', cursor: 'pointer'}}>{post.allPage[0].channel}</span></a></Link>
                                    <p style={{margin: 0, textAlign: 'right', fontSize: '.6rem', color: 'rgb(190, 190, 190)', cursor: 'default'}}>{formatDate(post.allPage[0].date)}</p>
                                    <h4 style={{margin: 0, textAlign: 'center', cursor: 'default'}}>{post.allPage[0].title}</h4>
                                </figcaption>
                                </figure>
                            </SwiperSlide>
                        )
                    })}
                    {/* ... */}
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
    const url = 'http://localhost:9000/api/news/'
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