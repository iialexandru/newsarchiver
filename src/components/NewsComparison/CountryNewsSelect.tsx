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

interface ChildPropsComponent { 
    selectNews: string;
    setSelectNews: Dispatch<SetStateAction<string>>;
    section: number;
}

const CountryNewsSelect: FC<ChildPropsComponent> = ({ selectNews, setSelectNews, section}) => {

    const router = useRouter()

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
    const allNews = [newsRomania, newsGermany, newsFrance]


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

    return (
        <ThemeProvider theme={customBreakpoints}>
        <Stack direction={{xs: 'column', sm: 'row'}} justifyContent="center" spacing={2} alignItems="center">
             <FormControl required sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="country">Country</InputLabel>
                <Select
                    labelId="country"
                    autoWidth
                    id="country"
                    value={selectCountry}
                    label="Country*"
                    // size={{xs: 'small', sm: 'medium'}}
                    // size='small'
                    onChange={e => { setSelectCountry(e.target.value); setSelectNews(""); } }
                >
                    <MenuItem value=" " disabled>
                        <em>Please select a country</em>
                    </MenuItem>
                    <MenuItem value='romania'>Romania</MenuItem>
                    <MenuItem value='germany'>Germany</MenuItem>
                    <MenuItem value='france'>France</MenuItem>
                </Select>
            </FormControl>
                <FormControl required sx={{ m: 1, minWidth: 120 }}>
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
