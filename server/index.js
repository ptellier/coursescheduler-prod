const express = require('express')
const app = express()
const cors = require('cors')
const ubcCrawler = require('./webcrawlers/ubc/index')

app.use(
    cors({
        // origin:"https://ubcscheduler.pythonanywhere.com",
        // origin:"https://ubcscheduler.onrender.com",
        origin: '*',
        optionsSuccessStatus: 200,
        methods: ['GET'],
    })
)

app.listen(process.env.PORT || 8000, () => {
    console.log('api running on http://localhost:8000/')
})

// ROUTES:
app.all('/', (req, res) => {
    res.send('UBC Course Scheduler API')
})

/**
 * Main endpoint to trigger web crawler, winter courses
 * Use of Directory Example: /api/W/sections?subject=CPSC&number=210&term=1
 */
app.get('/api/W/sections', async (req, res) => {
    const { subject, number, term } = req.query
    const data = await ubcCrawler.ubcCrawlCourse(`https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-course&dept=${subject}&course=${number}`, term)
    res.status(200).json({ sections: data })
})

app.get('/api/W/sections/detail', async (req, res) => {
    const { subject, number, section } = req.query
    const data = await ubcCrawler.ubcCrawlCourseSection(`https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=${subject}&course=${number}&section=${section}`)
    res.status(200).json({ sections: data })
})

/**
 * Main endpoint to trigger web crawler, summer courses
 * Use of Directory Example: /api/S/sections?subject=CPSC&number=210&term=1
 */
app.get('/api/S/sections', async (req, res) => {
    const { subject, number, term, section } = req.query
    const year = '2022'
    let data = await ubcCrawler.ubcCrawlCourse(`https://courses.students.ubc.ca/cs/courseschedule?tname=subj-course&course=${number}&sessyr=${year}&sesscd=S&dept=${subject}&pname=subjarea&section=${section}`, term)
    res.status(200).json({ sections: data })
})

app.get('/api/S/sections/detail', async (req, res) => {
    const { subject, number, section } = req.query //TODO => fix year
    const year = '2022'
    const data = await ubcCrawler.ubcCrawlCourseSection(`https://courses.students.ubc.ca/cs/courseschedule?tname=subj-section&course=${number}&sessyr=${year}&sesscd=S&dept=${subject}&pname=subjarea&section=${section}`)

    res.status(200).json({ sections: data })
})
