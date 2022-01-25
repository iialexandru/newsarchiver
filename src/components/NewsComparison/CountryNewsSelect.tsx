import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';  
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';


import { useState, FC } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import countries from '../../utils/NewsComparison/countrySelect'
import useWindowSize from '../../utils/windowSize'

interface ChildPropsComponent { 
    selectNews: string;
    setSelectNews: Dispatch<SetStateAction<string>>;
    section: number;
}

const CountryNewsSelect: FC<ChildPropsComponent> = ({ selectNews, setSelectNews, section}) => {

    const router = useRouter()

    const [ width, height ] = useWindowSize()

    const customBreakpoints = createTheme({
        breakpoints: {
            values: {
                xs: 0,
                sm: 481,
                md: 768,
                lg: 1024,
                xl: 1600

            }
        }
    })

    const [ selectCountry, setSelectCountry ] = useState("")

    
    const newsRomania: string[] = ['DIGI24', 'Antena3']
    const newsGermany: string[] = ['WELT', 'DW']
    const newsFrance: string[] = ['France24', 'Lemonde']
    const newsAustralia: string[] = ['9News', 'SBS']
    const newsCzRep: string[] = ['Expats', 'PragueMorning']
    const newsSwitzerland: string[] = ['LeNews', 'SwissInfo']
    const allNews = [newsRomania, newsGermany, newsFrance, newsAustralia, newsCzRep, newsSwitzerland]


    const change_news_query = (news: string) => {
        if(section === 1){
            router.replace({
                pathname: router.pathname,
                query: { ...router.query, news_f: encodeURIComponent(news.toLowerCase()) }
            })
        } else {
            router.replace({
                pathname: router.pathname,
                query: { ...router.query, news_s: encodeURIComponent(news.toLowerCase()) }
            })
        }
    }

    const change_country = (e: any) => {
        setSelectCountry(e.target.value); 
        setSelectNews("");
        if(section === 1) {
            router.replace({
                query: { ...router.query, news_f: null, sort_f: null, year_f: null, month_f: null, day_f: null}
            })
        } else {
            router.replace({
                query: { ...router.query, news_s: null, sort_s: null, year_s: null, month_s: null, day_s: null}
            })
        }
    }   

    return (
        <ThemeProvider theme={customBreakpoints}>
            <Stack direction={{xs: 'column', md: 'row'}} justifyContent="center" spacing={2} alignItems="center">

                 <FormControl required sx={{ m: 1, minWidth: { xs: 110, sm: 120 } }} size={`${width < 500 ? 'small' : 'medium'}`}>
                    <InputLabel id="country" >Country</InputLabel>
                    <Select
                        labelId="country"
                        autoWidth
                        id="country"
                        value={selectCountry}
                        label="Country*"
                        onChange={e => change_country(e) }
                    >
                        <MenuItem value=" " disabled>
                            <em>Please select a country</em>
                        </MenuItem>
                        <MenuItem value='romania'>Romania</MenuItem>
                        <MenuItem value='germany'>Germany</MenuItem>
                        <MenuItem value='france'>France</MenuItem>
                        <MenuItem value='australia'>Australia</MenuItem>
                        <MenuItem value='czrep'>Czech Republic</MenuItem>
                        <MenuItem value='switzerland'>Switzerland</MenuItem>
                    </Select>
                </FormControl>

                <FormControl required sx={{ m: 1, minWidth: { xs: 110, sm: 120 } }} size={width < 500 ? 'small' : 'medium'}>
                    <InputLabel id="news">News</InputLabel>
                        <Select
                            labelId="news"
                            id="news"
                            value={selectNews}
                            label="News*"
                            onChange={e => { setSelectNews(e.target.value); change_news_query(e.target.value); } }
                        >
                            <MenuItem value=" " disabled>
                                {selectCountry !== "" && selectCountry !== " " ? <em>Please select a news channel</em> : <em>Please select a country</em> }
                            </MenuItem>
                                {countries(selectCountry, allNews) && countries(selectCountry, allNews)!.map((n: string, i: number) => {
                                return <MenuItem key={i} value={n.toLowerCase()}>{n}</MenuItem>
                            }) }
                    </Select>
                </FormControl>

            </Stack>
        </ThemeProvider>
    )
}

export default CountryNewsSelect;
