const request = require('request')

/**
 * Connects and retrieve data from SSC. Main execution function for web scrapping SSC data.
 * @param {string} url
 */
exports.retrieveHTML = async (url) => {
    return httpRequestMultipleTimes(url)
}

const httpRequestMultipleTimes = async (url) => {
    let html = ''
    let success = false
    let trial = 50
    while (!success && trial > 0) {
        try {
            html = await getHTML(url)
            success = true
            trial = 0
        } catch (e) {
            // if blocked, try again
            success = false
            trial--
        }
    }
    return html
}

/**
 * Send request to given url and fetch html body then return as promise
 * @param {string} url
 * @returns
 */
const getHTML = (url) => {
    return new Promise(function (resolve, reject) {
        request(url, (error, response, html) => {
            if (!error && response.statusCode === 200) {
                //console.log('success')
                resolve(html)
            } else {
                //console.log('fail')
                reject(error)
            }
        })
    })
}

// const httpRequest = async (url) => {
//     let html = ''
//     try {
//         html = await getHTML(url)
//     } catch (e) {
//         throw e
//     }
//     return html
// }