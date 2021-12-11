import type { NextPage } from 'next'
import { useState, useEffect } from 'react'
import options from '../../utils/NewsComparison/optionsExporter'
import countries from '../../utils/NewsComparison/countrySelect'

const Comparison: NextPage = () => {
    const[ selectCountry, setSelectCountry ] = useState("")
    const[ selectNews, setSelectNews ] = useState("")
    
    const newsRomania: string[] = ['DIGI24', 'Antena3']
    const newsGermany: string[] = ['WELT', 'DW']
    const newsFrance: string[] = ['France24', 'Lemonde']
    const allNews = [newsRomania, newsGermany, newsFrance]

    let chosenNews = ['ERROR']
    useEffect(() => {
        
        chosenNews = countries(selectCountry, allNews)
    }, [selectCountry])

    return (
        <div>
            <select value={selectCountry} onChange={e => setSelectCountry(e.target.value)}>
                <option value="" disabled>Please select country:</option>
                <option value="romania">Romania</option>
                <option value="germany">Germany</option>
                <option value="france">France</option>
            </select>
            {selectCountry !== "" && 
                <select value={selectNews} onChange={e => setSelectNews(e.target.value)}>
                    <option value="" disabled>Please choose news site:</option>
                    {chosenNews.map((n: any, i: any) => {
                        return <option key={i} value={n.toLowerCase()}>{n}</option>
                    }) }
                </select>

                    }
        </div>
    )
}

export default Comparison;