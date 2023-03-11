import { SearchWord } from '../data/DataDefinition/SearchWordDD'
/**
 * fetches course description with given sw (searchWord)
 * Note1: course description is the course user would
 * like to retrieve section data for
 * Note2:
 * @param sw; i.e CPSC/110
 */
export const fetchCourseDesc = async (sw: SearchWord) => {
    const url = processURL(sw)
    const res = await fetch(url)
    const data = await res.json()
    return data
}
//
/**
 * a helper for fetchCourseDesc, needed for url format
 * parse user's raw input of search word then return
 * appropriate url that is accepted by Ben Cheung's API call
 * @param sw
 * @returns
 */
const processURL = (sw: SearchWord) => {
    const base_url = 'https://ubcexplorer.io/searchAny/'
    const subject = sw.match(/([A-Za-z]+)/g)?.join('')
    const between = '%20'
    const number = sw.match(/(\d+)/g)?.join('')
    const url = base_url + (subject === undefined ? '' : subject) + between + (number === undefined ? '' : number)
    return url
}
