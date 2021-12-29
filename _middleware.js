// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// const allowedParams = ['news_f', 'news_s', 'page_f', 'page_s']

// export function middleware(req: NextRequest) {
//     const url = req.nextUrl

//     const allowedParamsPresent = ['news_f', 'news_s', 'page_f', 'page_s']
//     let changed = false

//     url.searchParams.forEach((_, key) =>{
//         if(!allowedParams.includes(key)) {
//             url.searchParams.delete(key)
//             changed = true
//         }
//         if(allowedParamsPresent.includes(key)){
//             const pos = allowedParamsPresent.indexOf(key.toString())
//             allowedParamsPresent.splice(pos, 1)
//         }
//     })

//     if(allowedParamsPresent.length !== 0){
//         url.searchParams.forEach((_, key) => {
//             url.searchParams.delete(key)
//         })
//         url.searchParams.append('news_f', '')
//         url.searchParams.append('news_s', '')
//         return NextResponse.redirect(url)
//     }

//     if(changed) {
//         return NextResponse.redirect(url)
//     }

//     return NextResponse.next()
// }