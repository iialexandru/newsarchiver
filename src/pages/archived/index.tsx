import type { NextPage } from 'next'
import styles from '../../styles/scss/ArchivedNews.module.scss'
import Image from 'next/image'
import Link from 'next/link'

interface CountryLogo { 
    url: String;
    name: String;
}

const ArchivedNews: NextPage = () => {
    
    const newsRomania: string[] = ['DIGI24', 'Antena3']
    const newsGermany: string[] = ['WELT', 'DW']
    const newsFrance: string[] = ['France24', 'Lemonde']

    const CountryLogo = ({url, name}: CountryLogo) => {
        return(
            <div className={styles.mini_flexbox}>
                <Image src={url.toString()}
                       width={30} height={30} alt={`${name.toLowerCase()}_flag`} priority/>
                        <span className={styles.country_name_listed}>{name}</span>
            </div>
            )
    }
    return (
        <div>
            <div className={styles.flexbox}>
                
                <div>
                    <CountryLogo url="https://res.cloudinary.com/media-cloud-dw/image/upload/v1640252545/NewsArchiver/flags/Flag_of_Romania_etbciq.svg" name="Romania"/>
                    <div className={styles.list_all_channels}>
                        <ul>
                            {newsRomania.map((name, index) => {
                                return <Link key={index} href={`/archived/romania?news=${name.toLowerCase()}&page=1`}>
                                            <li key={index}>
                                                    {name}
                                            </li>
                                        </Link>
                            })}
                        </ul>
                    </div>
                </div>

                <div>
                    <CountryLogo url="https://res.cloudinary.com/media-cloud-dw/image/upload/v1640252544/NewsArchiver/flags/Flag_of_Germany_hr9lyu.svg" name="Germany"/>
                    <div className={styles.list_all_channels}>
                        <ul>
                            {newsGermany.map((name, index) => {
                                return <Link key={index} href={`/archived/germany?news=${name.toLowerCase()}&page=1`}>
                                            <li key={index}>
                                                {name}
                                            </li>
                                        </Link>
                            })}
                        </ul>
                    </div>
                </div>

                <div>
                    <CountryLogo url="https://res.cloudinary.com/media-cloud-dw/image/upload/v1640262682/NewsArchiver/flags/france-re_qsrpdn.png" name="France"/>
                    <div className={styles.list_all_channels}>
                        <ul>
                            {newsFrance.map((name, index) => {
                                return <Link key={index} href={`/archived/france?news=${name.toLowerCase()}&page=1`}>
                                            <li key={index}>
                                                {name}
                                            </li>
                                        </Link>
                            })}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default ArchivedNews
