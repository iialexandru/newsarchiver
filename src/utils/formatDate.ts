import { DateTime } from 'luxon'

export default function formatDate(date: string) {
    const fullDateObj = DateTime.fromISO(date)
    const year = fullDateObj.year
    const month = fullDateObj.month
    const day = fullDateObj.day
    const hour = fullDateObj.hour < 10 ? `0${fullDateObj.hour}` : fullDateObj.hour
    const minute = fullDateObj.minute < 10 ? `0${fullDateObj.minute}` : fullDateObj.minute
    
    const formattedDate: string = `Date Of Fetching: ${year.toString()}/${month.toString()}/${day.toString()}  ${hour.toString()}:${minute.toString()}`
    return formattedDate
}