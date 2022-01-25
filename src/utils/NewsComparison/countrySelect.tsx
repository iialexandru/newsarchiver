export default function selectCountry(country: string, news: string[][]) {
    switch(country) {
        case 'romania':
            return news[0]
        case 'germany':
            return news[1]
        case 'france':
            return news[2]
        case 'australia':
            return news[3]
        case 'czrep':
            return news[4]
        case 'switzerland':
            return news[5]
    }
    // return ['ERR'];
}