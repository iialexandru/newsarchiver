export default function selectCountry(country: string, news: string[][]) {
    switch(country) {
        case 'romania':
            return news[0]
        case 'germany':
            return news[1]
        case 'france':
            return news[2]
    }
    return ['ERR', 'ERR', 'ERR', 'ERR', 'ERR']
}