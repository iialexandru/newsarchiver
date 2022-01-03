const chooseName = (name: string) => {
    switch(name){
        case '/':
            return 'Home'
        case '/ncomparison':
            return 'News Comparison'
        case '/archived':
            return 'Archived News'
        case '/archived/[country]':
            return 'Archived News'
    }   
    return '';
}

export default chooseName;