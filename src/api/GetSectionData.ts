import { Course } from '../data/DataDefinition/SearchWordDD'
import { cleanSections } from './DataCleaner'
import { fetchSection } from './fetch'

export const getSectionData = async (course: Course, term: string, session: string) => {
    const url: string = getURL(course, term, session)
    const sections = await fetchSection(url)
    return cleanSections(sections, { term: term })
}

const getURL = (course: Course, term: string, session: string) => {
    let dev = true
    let url = ``
    if (dev) {
        url = `http://localhost:8000/`
    } else {
        url = `https://busy-jade-toad-toga.cyclic.app/`
    }
    url += `api/${session}/sections?subject=${course.department}&number=${course.courseNumber}&term=${term}`
    return url
}
