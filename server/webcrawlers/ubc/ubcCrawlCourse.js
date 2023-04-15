const cheerio = require('cheerio')
const helperFn = require('../retrieveHTML')
/**
 * Given a 'tr' element, read and parse necessary information and write into the 'tr' object
 * @param {string} url
 * @param {string} term
 */
const ubcCrawlCourse = async (url, term) => {
    let sections = []
    let html = await helperFn.retrieveHTML(url)
    const $ = cheerio.load(html)
    const trs = $('.table.table-striped.section-summary tbody tr')
    trs.each((idx, tr) => {
        const newSection = readSectionFromTr($, tr, term)
        if (newSection !== null) {
            sections.push(newSection)
        }
    })
    return sections
}

const readSectionFromTr = ($, tr, userSelectedTerm) => {
    const tds = $(tr).children('td')

    //TODO skip the rest, if term != term from Tr
    if (!$(tds[3]).text().includes(userSelectedTerm)) return null

    // parse information from tr element:
    const id = createUUID()
    const status = $(tds[0]).text() === ' ' ? 'Available' : $(tds[0]).text()
    const name = $(tds[1]).text()
    const [subject, course, section] = name.split(' ')
    const activity = $(tds[2]).text()
    const term = $(tds[3]).text()
    const mode = $(tds[4]).text().trim()
    const days = $(tds[6]).text().trimStart()
    const start_time = $(tds[7]).text()
    const end_time = $(tds[8]).text()
    const schedule = days.split(' ').map((d) => createTimeslot(start_time, end_time, d, term))

    // write in newSection object
    let newSection = {}
    newSection['id'] = id
    newSection['status'] = status
    newSection['name'] = name
    newSection['subject'] = subject
    newSection['course'] = course
    newSection['section'] = section
    newSection['activity'] = activity
    newSection['term'] = term
    newSection['mode'] = mode
    newSection['schedule'] = schedule

    return newSection
}

/**
 * Creates new timeslot given startTime, endTime, day and term
 */

const createTimeslot = (startTime, endTime, day, term) => {
    let startArr = startTime.split(':').map((s) => parseInt(s))
    let endArr = endTime.split(':').map((s) => parseInt(s))
    let nstart = startArr[0] * 60 + startArr[1]
    let nend = endArr[0] * 60 + endArr[1]
    return { start_time: nstart, end_time: nend, day: day, term: term }
}

/**
 * Creates UUID, universal unique ID. This becomes id for each section
 * @returns
 */
const createUUID = () => {
    let dt = new Date().getTime()
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (dt + Math.random() * 16) % 16 | 0
        dt = Math.floor(dt / 16)
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
}

module.exports = ubcCrawlCourse