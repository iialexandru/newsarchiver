import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { useState, FC, useEffect } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import { useRouter } from 'next/router'
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface Section { 
    section: number;
    setPosts: Dispatch<SetStateAction<number>>;
    posts: number;
}

export const ViewsPerPage: FC<Section> = ({ section, posts, setPosts }) => {

    const router = useRouter()


    const customSelectColor = createTheme({
        palette: {
            primary: {
                main: '#646464'
            }
        }
    })

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

    return (
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <ThemeProvider theme={customSelectColor}>
                <Select
                labelId="posts-per-page-selection"
                id="posts-per-page"
                value={posts}
                onChange={handleChange}
                label="Posts"
                >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={12}>12</MenuItem>
                    <MenuItem value={14}>14</MenuItem>
                    <MenuItem value={16}>16</MenuItem>
                    <MenuItem value={18}>18</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                </Select>
            </ThemeProvider>
      </FormControl>
    )
}

export default ViewsPerPage;