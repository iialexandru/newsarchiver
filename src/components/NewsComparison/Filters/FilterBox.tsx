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

import styles from '../../../styles/scss/NewsComparison.module.scss'
import ViewsPerPage from './ViewsPerPage';

import { useState, FC } from 'react'
import { useRouter } from 'next/router'
import { isAfter, isBefore, startOfTomorrow } from 'date-fns'

interface ChildPropsComponent { 
    section: number;
}


const FilterBox: FC<ChildPropsComponent> = ({ section }) => {
    
    const router = useRouter()

    const [ openedFilters, setOpenedFilters ] = useState(false)
    const [ value, setValue ] = useState<Date | null>(null) // For calendar filter

    const [ posts, setPosts ] = useState(10) // For posts per page filter


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
    }); //custom primary color

    const filterButtonsTheme = createTheme({
        palette: {
            primary: {
                main: '#fff'
            }
        }
    }) // pure white


    const resetDateFilter = () => {
        if(section === 1){
            (router.query.year_f && router.query.month_f && router.query.day_f) && router.replace({
                pathname: router.pathname,
                query: { ...router.query, page_f: encodeURIComponent(1), year_f: null, month_f: null, day_f: null}
            })
        } else {
            (router.query.year_s && router.query.month_s && router.query.day_s) && router.replace({
                pathname: router.pathname,
                query: { ...router.query, page_s: encodeURIComponent(1), year_s: null, month_s: null, day_s: null}
            })
        }
        setValue(null)
    }

    const orderingFilter = (e: any) => {
        if(section === 1) {
            router.replace({
                pathname: router.pathname,
                query: { ...router.query, page_f: encodeURIComponent(1), sort_f: e.target.getAttribute('type-order') === 'oldest' ? encodeURIComponent('oldest') : encodeURIComponent('latest') }
            })
        } else {
            router.replace({
                pathname: router.pathname,
                query: { ...router.query, page_s: encodeURIComponent(1), sort_s: e.target.getAttribute('type-order') === 'oldest' ? encodeURIComponent('oldest') : encodeURIComponent('latest') }
            })
        }
    }

    const resetAllFilters = () => {
        if(section === 1){
            router.replace({
                query: { news_f: router.query.news_f, news_s: router.query.news_s, page_f: encodeURIComponent(1), page_s: encodeURIComponent(1), sort_s: router.query.sort_s && router.query.sort_s , year_s: router.query.year_s, month_s: router.query.month_s, day_s: router.query.day_s, ppp_s: router.query.ppp_s  }
                
            })
        } else {
            router.replace({
                query: { news_f: router.query.news_f, news_s: router.query.news_s, page_f: encodeURIComponent(1), page_s: encodeURIComponent(1), sort_f: router.query.sort_f, year_f: router.query.year_f, month_f: router.query.month_f, day_f: router.query.day_f, ppp_f: router.query.ppp_f  }
            })
        }
        setValue(null)
        setPosts(12)
    }

    const handleDateFilter = () => {
        if(section === 1) {
            (value && isAfter(value, new Date(2021, 11, 27)) && isBefore(value, startOfTomorrow())) && router.replace({
                pathname: router.pathname,
                query: { ...router.query, year_f: encodeURIComponent(value.getFullYear()), month_f: encodeURIComponent(value.getMonth() + 1), day_f: encodeURIComponent(value.getDate())}
            })
        } else {
            (value && isAfter(value, new Date(2021, 11, 27)) && isBefore(value, startOfTomorrow())) && router.replace({
                pathname: router.pathname,
                query: { ...router.query, year_s: encodeURIComponent(value.getFullYear()), month_s: encodeURIComponent(value.getMonth() + 1), day_s: encodeURIComponent(value.getDate())}
            })
        }
    }

    return (
        <>
            <div className={styles.filters_buttons}>
                <ThemeProvider theme={defaultMaterialTheme}>
                    <Button type="button"  onClick={e => setOpenedFilters(!openedFilters)} variant="outlined" color="primary" size="small" endIcon={!openedFilters ? <KeyboardArrowDownRoundedIcon /> : <KeyboardArrowUpRoundedIcon />}>FILTERS</Button>
                    <Button type="button" variant="outlined" size="small" endIcon={<FilterAltOffOutlinedIcon />} color="primary" onClick={e => resetAllFilters() }>RESET</Button>
                </ThemeProvider>
            </div>
            {openedFilters &&
                <div className={styles.filters_container}>
                    <div className={styles.order_news}>
                        <Stack direction="row" alignItems='center' spacing={2}>
                                <label>Date added: </label>
                            <ThemeProvider theme={filterButtonsTheme}>
                                <WHButton type="button" variant="contained" type-order="latest" size="small" onClick={e => orderingFilter(e)}>latest</WHButton>
                                <WHButton type="button" variant="contained" type-order="oldest" size="small" onClick={e => orderingFilter(e)}>oldest</WHButton>
                            </ThemeProvider>
                        </Stack>
                    </div>


                    <div>
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
                        <div className={styles.submission_buttons}>
                                <ThemeProvider theme={filterButtonsTheme}>
                                        <WHButton type="button" variant="contained" onClick={e => handleDateFilter()}>submit</WHButton>
                                        <WHButton type="button" variant="contained" onClick={e => resetDateFilter()}>clear</WHButton>
                                </ThemeProvider>
                        </div>
                    </div>

                    <div className={styles.ppp_select}>
                        <label htmlFor="postsperpage">Posts per page:</label>
                        <ViewsPerPage section={section} posts={posts} setPosts={setPosts} />
                    </div>
                </div>
            }
        </>
    )
}

export default FilterBox;