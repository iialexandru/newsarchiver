export default function optionReturn(news: string[]){
    return (
        news.map((n, i) => {
            <option key={i} value={n.toLowerCase()}>{n}</option>
        })
    )
}   