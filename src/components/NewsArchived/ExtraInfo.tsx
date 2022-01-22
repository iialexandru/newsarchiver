import styles from '../../styles/scss/NewsArchived/ExtraInfo.module.scss'

import { FC, useState } from 'react'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

interface ChildPropsComponent { 
    text: string;
}

const ExtraInfo: FC<ChildPropsComponent> = ({ text }) => {

    const [ details, setDetails ] = useState(false)

    return (
        
        <div style={{borderTop: '1px solid black'}}>
            <p>{!details ? text.split(' ').slice(0, 21).join(' ') + '...' : text}</p>
            <button style={{background: 'none', border: 'none', cursor: 'pointer'}} onClick={e => setDetails(!details)}>{!details ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</button>
        </div>
    )
}

export default ExtraInfo;