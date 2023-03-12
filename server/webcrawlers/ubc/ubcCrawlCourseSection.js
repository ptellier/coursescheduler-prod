const cheerio = require('cheerio')
const helperFn = require('../retrieveHTML')
/**
 * Go to a Course Section and get infomation such as:
 * @param building
 * @param room
 * @param roomUrl
 * @param totalSeatsRemaining
 * @param currentlyRegistered
 * @param generalSeatsRemainings
 * @param restrictedSeatsRemaining
 */
const ubcCrawlCourseSection = async (url, term) => {
    let html = await helperFn.retrieveHTML(url)
    const $ = cheerio.load(html)
    // const course = $('body > div.container > div.content.expand > h4').text()
    const building = $('body > div.container > div.content.expand > table.table.table-striped:not(.sortable) > tbody > tr > td:nth-child(5)').first().text()
    const room = $('body > div.container > div.content.expand > table.table.table-striped:not(.sortable) > tbody > tr > td:nth-child(6) > a').first().text()
    const roomUrl = $('body > div.container > div.content.expand > table.table.table-striped:not(.sortable) > tbody > tr > td:nth-child(6) > a').attr('href')

    const totalSeatsRemaining = $('body > div.container > div.content.expand > table:not(.table) > tbody > tr:nth-child(1) > td > strong').html()
    const currentlyRegistered = $('body > div.container > div.content.expand > table:not(.table) > tbody > tr:nth-child(2) > td > strong').text()
    const generalSeatsRemainings = $('body > div.container > div.content.expand > table:not(.table) > tbody > tr:nth-child(3) > td > strong').text()
    const restrictedSeatsRemaining = $('body > div.container > div.content.expand > table:not(.table) > tbody > tr:nth-child(4) > td > strong').text()
    const restrictedconditions = $('body > div.container > div.content.expand > table:not(.table) > tbody > tr:nth-child(5) > td').html()
    let instructor = $('body > div.container > div.content.expand > .table-striped + .table > tbody > tr > td:nth-child(2) > a ').text()
    let instructorUrl = 'https://courses.students.ubc.ca' + $('body > div.container > div.content.expand > .table-striped + .table > tbody > tr > td:nth-child(2) > a ').attr('href')
    // There is no instructor
    if (!instructor) {
        instructor = 'TBA'
        instructorUrl = ''
    }

    return { building, room, roomUrl, totalSeatsRemaining, currentlyRegistered, generalSeatsRemainings, restrictedSeatsRemaining, restrictedconditions, instructor, instructorUrl }
}

module.exports = ubcCrawlCourseSection
