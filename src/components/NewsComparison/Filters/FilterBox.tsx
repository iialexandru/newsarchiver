import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

import FilterAltOffOutlinedIcon from '@mui/icons-material/FilterAltOffOutlined';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';

import specStyles from '../../../styles/scss/FilterBox.module.scss'

import {useState, FC, useEffect} from 'react'
import { useRouter } from 'next/router'
import { isAfter, isBefore, startOfTomorrow } from 'date-fns'
import ArrowDropDownRoundedIcon from "@mui/icons-material/ArrowDropDownRounded";
import ArrowDropUpRoundedIcon from "@mui/icons-material/ArrowDropUpRounded";
import DatePicker from "@mui/lab/DatePicker";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

interface ChildPropsComponent { 
    section: number;
}


const FilterBox: FC<ChildPropsComponent> = ({ section }) => {
    
    const router = useRouter()

    const [ openedFilters, setOpenedFilters ] = useState(false)
    const [ openedFilter, setOpenedFilter ] = useState({ order: false, date: false, ppp: false})
    const [ value, setValue ] = useState<Date | null>(null) // For calendar filter

    const [ posts, setPosts ] = useState(12) // For posts per page filter

    const handleChange = (e: any) => {
        setPosts(e.target.value)
    }

    useEffect(() => {
        if(section === 1){
            router.replace({
                query: {...router.query, ppp_f: encodeURIComponent(posts)}
            })
        } else {
            router.replace({
                query: {...router.query, ppp_s: encodeURIComponent(posts)}
            })
        }
    }, [posts])

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
                main: 'rgb(240, 240, 240)'
            }
        }
    })

    const customSelectColor = createTheme({
        palette: {
            primary: {
                main: '#646464'
            }
        }
    })



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
        <div style={{ display: 'flex', flexFlow: 'column wrap', alignItems: 'center', marginLeft: -20}}>
            <div className={specStyles.filters_buttons}>
                <ThemeProvider theme={defaultMaterialTheme}>
                    <WHButton type="button" variant="outlined" size="small" endIcon={!openedFilters ? <KeyboardArrowDownRoundedIcon /> : <KeyboardArrowUpRoundedIcon />} onClick={e => { setOpenedFilters(!openedFilters); setOpenedFilter({ order: false, date: false, ppp: false }) }}>FILTERS</WHButton>
                    <WHButton type="button" variant="outlined" size="small" endIcon={<FilterAltOffOutlinedIcon />} onClick={e => resetAllFilters()}>RESET</WHButton>
                </ThemeProvider>
            </div>
            {openedFilters &&
                <div className={specStyles.filters_ph_content}>
                    <ul>
                        <li className={`${specStyles.list_item_filter} ${openedFilter.order ? specStyles.bt_ani : ''}`}><button onClick={e => { setOpenedFilter({order: !openedFilter.order, date: false, ppp: false}); } }>ORDER OF NEWS{!openedFilter.order ? <ArrowDropDownRoundedIcon /> : <ArrowDropUpRoundedIcon />}</button></li>
                        {openedFilter.order &&
                            <div className={specStyles.order_news}>
                                <ThemeProvider theme={filterButtonsTheme}>
                                    <WHButton type="button" variant="contained" type-order="latest" size="small" onClick={e => orderingFilter(e)}>latest</WHButton>
                                    <WHButton type="button" variant="contained" type-order="oldest" size="small" onClick={e => orderingFilter(e)}>oldest</WHButton>
                                </ThemeProvider>
                            </div>
                        }
                        <li className={`${specStyles.list_item_filter} ${openedFilter.order ? specStyles.bt_ani : ''}`}><button onClick={e => { setOpenedFilter({order: false, date: !openedFilter.date, ppp: false}); } }>DATE ADDED{!openedFilter.date ? <ArrowDropDownRoundedIcon /> : <ArrowDropUpRoundedIcon />}</button></li>
                        {openedFilter.date &&
                            <>
                                <div className={specStyles.calendar}>
                                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                                        <DatePicker
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
                                    <div className={specStyles.submission_buttons}>
                                        <ThemeProvider theme={filterButtonsTheme}>
                                            <WHButton size='small' variant="contained" onClick={e => handleDateFilter()}>submit</WHButton>
                                            <WHButton size='small' variant="contained" onClick={e => resetDateFilter()}>clear</WHButton>
                                        </ThemeProvider>
                                    </div>
                                </div>
                            </>
                        }
                        <li className={`${specStyles.list_item_filter} ${openedFilter.order ? specStyles.bt_ani : ''}`}><button onClick={e => { setOpenedFilter({order: false, date: false, ppp: !openedFilter.ppp}); } }>POSTS PER PAGE{!openedFilter.ppp ? <ArrowDropDownRoundedIcon /> : <ArrowDropUpRoundedIcon />}</button></li>
                        {openedFilter.ppp &&
                            <div className={specStyles.ppp_select}>
                                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                                    <ThemeProvider theme={customSelectColor}>
                                        <Select
                                            labelId="posts-per-page-selection"
                                            id="posts-per-page"
                                            value={posts}
                                            onChange={handleChange}
                                            label="Posts"
                                        >
                                            <MenuItem value={12}>12</MenuItem>
                                            <MenuItem value={15}>15</MenuItem>
                                            <MenuItem value={18}>18</MenuItem>
                                            <MenuItem value={21}>21</MenuItem>
                                            <MenuItem value={24}>24</MenuItem>
                                            <MenuItem value={27}>27</MenuItem>
                                        </Select>
                                    </ThemeProvider>
                                </FormControl>
                            </div>
                        }
                    </ul>
                </div>
            }
        </div>
    )
}

export default FilterBox;