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

import styles from '../../styles/scss/NewsComparison.module.scss'
import { useState, useEffect, FC } from 'react'
import { useRouter } from 'next/router'
import { isAfter, isBefore, startOfTomorrow } from 'date-fns'

interface ChildPropsComponent { 
    section: number;
}


const FilterBox: FC<ChildPropsComponent> = ({ section }) => {
    
    const router = useRouter()

    const [ openedFilters, setOpenedFilters ] = useState(false)
    const [ value, setValue ] = useState<Date | null>(null)


    const WHButton = styled(Button)(({ theme }) => ({
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
    });

    const filterButtonsTheme = createTheme({
        palette: {
            primary: {
                main: '#fff'
            }
        }
    })

    const resetFilters = () => {
                // e.preventDefault();
        if(section === 1){
            (value && router.query.year_f !== "" && router.query.month_f !== "" && router.query.day_f !== "") && router.replace({
                pathname: router.pathname,
                query: { ...router.query, year_f: "", month_f: "", day_f: ""}
            })
            setValue(null)
        } else {
            (value && router.query.year_s !== "" && router.query.month_s !== "" && router.query.day_s !== "") && router.replace({
                pathname: router.pathname,
                query: { ...router.query, year_s: "", month_s: "", day_s: ""}
            })
            setValue(null)
        }
    }

    const handleSubmits = () => {
        if(section === 1) {
            value && router.replace({
                pathname: router.pathname,
                query: { ...router.query, year_f: encodeURIComponent(value.getFullYear()), month_f: encodeURIComponent(value.getMonth() + 1), day_f: encodeURIComponent(value.getDate())}
            })
        } else {
            value && router.replace({
                pathname: router.pathname,
                query: { ...router.query, year_s: encodeURIComponent(value.getFullYear()), month_s: encodeURIComponent(value.getMonth() + 1), day_s: encodeURIComponent(value.getDate())}
            })
        }
    }

    useEffect(() => {
        (value && value.getFullYear() && value.getMonth() && value.getDate() && isAfter(value, new Date(2021, 11, 27)) && isBefore(value, startOfTomorrow()) ) ? handleSubmits() : resetFilters()
    }, [value])

    return (
        <>
            <div className={styles.filters_buttons}>
                <ThemeProvider theme={defaultMaterialTheme}>
                    <Button type="button"  onClick={e => setOpenedFilters(!openedFilters)} variant="outlined" color="primary" size="small" endIcon={!openedFilters ? <KeyboardArrowDownRoundedIcon /> : <KeyboardArrowUpRoundedIcon />}>FILTERS</Button>
                    <Button type="button" variant="outlined" size="small" endIcon={<FilterAltOffOutlinedIcon />} color="primary" onClick={e => resetFilters }>RESET</Button>
                </ThemeProvider>
            </div>
            {openedFilters &&
                <div className={styles.filters_container}>
                    <div className={styles.order_news}>
                        <Stack direction="row" alignItems='center' spacing={2}>
                                <label>Date added: </label>
                            <ThemeProvider theme={filterButtonsTheme}>
                                <WHButton type="button" variant="contained" size="small" color='primary'>latest</WHButton>
                                <WHButton type="button" variant="contained" size="small">oldest</WHButton>
                            </ThemeProvider>
                        </Stack>
                    </div>
                    
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
                </div>
            }
        </>
    )
}

export default FilterBox;