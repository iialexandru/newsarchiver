const chooseSite = (news: string) => {
        switch(news) {
            case 'DIGI24':
                return 'https://www.digi24.ro';
            case 'ANTENA3':
                return 'https://www.antena3.ro';
            case 'WELT': 
                return 'https://www.welt.de';
            case 'DW':
                return 'https://www.dw.com/de/themen/s-9077';
            case 'FRANCE24':
                return 'https://www.france24.com/fr';
            case 'LEMONDE':
                return 'https://www.lemonde.fr';
            case '9NEWS':
                return 'https://www.9news.com.au';
            case 'SBS.AU':
                return 'https://www.sbs.com.au/news';
            case 'EXPATS':
                return 'https://www.expats.cz';
            case 'PRAGUEMORNING':
                return 'https://praguemorning.cz';
            case 'LENEWS':
                return 'https://lenews.ch';
            case 'SWISSINFO':
                return 'https://www.swissinfo.ch/eng';
        }
        return '/';
    }

export default chooseSite;