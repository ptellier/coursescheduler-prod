import { getSections } from '../../../api/APIWebCrawler'
import { tCourseInfo, tCoursesInfo, tCourseOption, tCourseColors } from '../../../data/DataDefinition/CourseInfoDD'
import { checkCourseCreditLimit, checkDuplicateCourse } from '../generateSchedule/Exceptions'
import { Section } from '../../../data/DataDefinition/SectionDD'
import { organizeSections } from '../generateSchedule/organizeSections'

type AddCourseProps = {
    courseOption: tCourseOption | null
    coursesInfo: tCoursesInfo
    setCoursesInfo: React.Dispatch<React.SetStateAction<tCoursesInfo>>
    addCourseColor: (key: string) => tCourseColors
    setSections: React.Dispatch<React.SetStateAction<Section[]>>
    setClearInputBox: React.Dispatch<React.SetStateAction<number>>
}

export const addCourse = async ({ courseOption, coursesInfo, setCoursesInfo, addCourseColor, setSections, setClearInputBox }: AddCourseProps) => {
    try {
        // Error Handling
        if (courseOption === null) throw Error('NULL')
        checkCourseCreditLimit(courseOption, coursesInfo.totalCredits)
        checkDuplicateCourse(courseOption, coursesInfo.courses)

        // Get Course Colors
        const courseColors: tCourseColors = addCourseColor(courseOption.key)

        // Get Course Sections
        const newSections = await getSections(courseOption.department, courseOption.courseNumber, coursesInfo.term, coursesInfo.session)

        // If there are no sections in that semester the course isn't offered
        if (newSections.length === 0) {
            throw Error("This Course isn't offered in this term ")
        }

        setSections((sections: Section[]) => [...sections, ...newSections])

        // Clear "Search Course" Input Box -> Does this by rerendering Autocomplete Component
        setClearInputBox((prevState) => (prevState === 1 ? 0 : 1))

        // Sort Sections into labs, lectures, tutorial etc...
        // Add Property "selected" to Sections
        const organizedSections = organizeSections(newSections)

        // Get Total Credits
        const totalCredits = coursesInfo.totalCredits + courseOption.credit

        // Create New Course
        const newCourse = {
            department: courseOption.department,
            courseNumber: courseOption.courseNumber,
            courseDescription: courseOption.courseDescription,
            credit: courseOption.credit,
            courseColors: courseColors,
            courseSections: organizedSections,
            courseTerm: coursesInfo.term,
            courseSession: coursesInfo.session,
            courseName: courseOption.department + ' ' + courseOption.courseNumber,
        }

        // Add New Course to Courses that will be passed to CourseInfo State
        setCoursesInfo((coursesInfo: tCoursesInfo) => {
            const courses = [...coursesInfo.courses, newCourse]
            return { ...coursesInfo, courses, totalCredits }
        })
    } catch (e: any) {
        if (e.message === 'NULL') return
        alert(e)
    }
}
