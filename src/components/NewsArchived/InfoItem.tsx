import styles from '../../styles/scss/ArchivedNews.module.scss'

import { useState, FC } from 'react'
import Image from 'next/image'

interface ChildPropsComponent {
    url: string;
    name: string;
    text: string;
}

const InfoItem: FC<ChildPropsComponent> = ({ url, name, text }) => {

    const [ hovering, setHovering ] = useState(false)

  return (
    <div className={styles.text_item} onMouseEnter={e => setHovering(!hovering)} onMouseLeave={e => setHovering(!hovering)}>
        <div className={styles.logo_title}>
            <Image src={url} width={30} height={30} />
            <h4>{name}</h4>
        </div>
        <div style={{borderTop: '1px solid black'}}>
            <p>{!hovering ? text.split(' ').slice(0, 21).join(' ') + '...' : text}</p>
        </div>
    </div>
    )
};

export default InfoItem;