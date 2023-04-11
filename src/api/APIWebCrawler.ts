import { cleanSections } from './DataCleaner'

export const getSections = async (department: string, courseNumber: string, term: string, session: string) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}api/${session}/sections?subject=${department}&number=${courseNumber}&term=${term}`)
    const data = await res.json()
    return cleanSections(data.sections, { term: term })
}
//getSectionDetail
export const getSection = async (department: string, courseNumber: string, term: string, session: string, section: string) => {
    const res = await fetch(`${process.env.REACT_APP_API_URL}api/${session}/sections/detail?subject=${department}&number=${courseNumber}&term=${term}&section=${section}`)
    const data = await res.json()
    return data.sections
}
