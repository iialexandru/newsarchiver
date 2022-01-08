import styles from '../../styles/scss/NewsComparison.module.scss'
import { FC, useState, useEffect } from 'react'
import formatDate from '../../utils/formatDate'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'



import CountryNewsSelect from './CountryNewsSelect'
import FilterBox from './FilterBox'
import Pagination from './Pagination'

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
    change_page_query: (page: string) => void;
    PAGE: string | string[] | undefined;
    URL: string | string[] | undefined;
}

const SelectionMenu: FC<ChildPropsComponent> = ({ name, news, change_page_query, PAGE, URL }) => {

    const router = useRouter()

    const [ selectNews, setSelectNews ] = useState<string>('')

    return (
        <div className={styles.tot_container}>
      
      <CountryNewsSelect selectNews={selectNews} setSelectNews={setSelectNews} section={name} />
            
        <div className={styles.flexbox_n}>
            {(selectNews === URL && selectNews !== '') && 
            <>
                {news.allPage &&
                        <>
                            <FilterBox section={name} />
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
                            <Pagination section={name} numberOfPages={news.totalPages} PAGE={PAGE} />
                        </>
                }
        </>
        }

    </div>
    </div>
    )
}

export default SelectionMenu;