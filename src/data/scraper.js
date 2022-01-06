// import { puppeteer } from "puppeteer";
const puppeteer = require('puppeteer')

const scrapeData = async(url) => {
    const browser = await puppeteer.launch({headless: false})
    const page = await browser.newPage()
    await page.goto(url)


    const grabTable = await page.evaluate(() => {
        const trTags = document.querySelectorAll('.table.table-striped.section-summary tr')
        let acc = []
        trTags.forEach(tag => {
            acc.push(tag.innerHTML)
        })
        return acc
    })
    
    console.log(grabTable)
    await browser.close()
}   


scrapeData('https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=CPSC&course=110')

