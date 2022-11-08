export class DateUtil {

    monthsArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul","Aug","Sep","Oct","Nov","Dec"]

    buildMonthsArray() {
        return this.monthsArray
    }

    addLeadingZero(timeUnit) {
        return timeUnit <= 9 ? '0' + timeUnit : timeUnit
    }

    formatDateAndTime(rawDate) {
        const date = new Date(rawDate)
        return this.monthsArray[date.getMonth()] + " " + date.getDate() + " " + date.getFullYear() + " at " + this.addLeadingZero(date.getHours()) + ":" + this.addLeadingZero(date.getMinutes())
    }

    formatDate(rawDate) {
        const date = new Date(rawDate)
        return ((this.monthsArray[(date.getMonth())] + " " + date.getDate() + " " + date.getFullYear()))
    }

    formatTime(rawDate) {
        let minutes = rawDate.getMinutes()
        let hours = rawDate.getHours()
        minutes = minutes <= 9 ? '0' + minutes : minutes
        hours = hours <= 9 ? '0' + hours : hours
        return hours + ":" + minutes
    }

    getTimeZone() {
        return Intl.DateTimeFormat().resolvedOptions().timeZone
    }

    convertToLocalDateTime(rawDate) {
        const date = new Date(rawDate)
        const offset = (date.getTimezoneOffset() / 60) * -1
        const utc = date.getTime()
        
        return new Date(utc + (3600000*offset))
    }

    convertToUTCDateTime(date) {
        const utcYear = date.getUTCFullYear()
        const utcMonth = date.getUTCMonth()
        const utcDay = date.getUTCDate()
        const utcHours = date.getUTCHours()
        const utcMinutes = date.getUTCMinutes()
        const utcSeconds = date.getUTCSeconds()
        const utcMillis = date.getUTCMilliseconds()

        return new Date(utcYear, utcMonth, utcDay, utcHours, utcMinutes, utcSeconds, utcMillis)
    }

    // convertToFullUTCDateTime(date) {
    //     const utcYear = date.getUTCFullYear()
    //     const utcMonth = date.getUTCMonth()
    //     const utcDay = date.getUTCDate()
    //     const utcHours = date.getUTCHours()
    //     const utcMinutes = date.getUTCMinutes()
    //     const utcSeconds = date.getUTCSeconds()
    //     const utcMillis = date.getUTCMilliseconds()

    //     return new Date(utcYear, utcMonth, utcDay, utcHours, utcMinutes, utcSeconds, utcMillis)
    // }

}