import { useContext, useState } from 'react'
import { Box, Paper } from '@mui/material'
import Generate from './4. Generate'
import CourseSearchBar from './2. SearchBar'
import { CourseColorContext } from '../../context/CourseColorContext'
import { Course } from '../../data/DataDefinition/SearchWordDD'
import { checkCourseCreditLimit, checkDuplicateCourse } from './Exceptions'
import CourseInfo from './3. CourseInfo'
import { SectionsContext } from '../../context/SectionsContext'
import { Section } from '../../data/DataDefinition/SectionDD'
import { Term } from './1. Term'
import { getSections } from '../../api/ApiWebCrawler'
import { Recommendation } from '../../data/DataDefinition/Recommendation'
import { UndoRedoContext } from '../../context/UndoRedoContext'

/**
 * TODO:
 * 1. Prevent user from exceeding over 18 credits
 * 2. Fix Run button to have spinner/loading icon working
 * 3. Enable history
 * 4. Width of window
 */

const CoursePanel = () => {
    /** courses that users looked up and want to get schedule */
    const [term, setTerm] = useState<string>('1')
    const [session, setSession] = useState<string>('W')
    const [courses, setCourses] = useState<Course[]>([])
    const [totalCredits, setTotalCredits] = useState<number>(0)
    const [fetchReady, setFetchReady] = useState(false)
    const { setSections, recommended, setRecommended, changeCurrentSections } = useContext(SectionsContext)
    const { addCourseColor, removeCourseColor } = useContext(CourseColorContext)
    const { clearUndoRedo } = useContext(UndoRedoContext)

    const addCourse = async (courseOption: any) => {
        if (courseOption === null) throw Error('NULL')
        checkCourseCreditLimit(courseOption, totalCredits)
        checkDuplicateCourse(courseOption, courses)

        addCourseColor(courseOption.key)
        const newCourse = createNewCourse(courseOption)
        setFetchReady(false)
        const newSections = await getSections(newCourse.department, newCourse.courseNumber, term, session)
        setFetchReady(true)
        setSections((sections: Section[]) => [...sections, ...newSections])
        setCourses((courses: Course[]) => [...courses, newCourse])
        setTotalCredits((totalCredits) => totalCredits + newCourse.credit)
    }

    const createNewCourse = (courseOption: any) => {
        return {
            department: courseOption.department,
            courseNumber: courseOption.courseNumber,
            courseName: courseOption.courseName,
            credit: courseOption.credit,
        }
    }

    const removeCourse = (course: Course) => {
        const courseName = course.department + ' ' + course.courseNumber

        setSections((sections: Section[]) => sections.filter((section) => section.subject + ' ' + section.course !== courseName))

        let recommended_: Recommendation = { compact: [], consistent: [], scatter: [], freeDay: [] }
        for (let [t, sections] of Object.entries<any>(recommended)) {
            const newSections = sections.filter((section: Section) => section.subject + ' ' + section.course !== courseName)
            recommended_[t as keyof Recommendation] = newSections
        }

        setRecommended(recommended_)
        changeCurrentSections(recommended_)
        setCourses((courses: Course[]) =>
            courses.filter((existingCourse: Course) => {
                return existingCourse.department + ' ' + existingCourse.courseNumber !== courseName
            })
        )
        setTotalCredits((credits) => credits + course.credit)
        removeCourseColor(courseName)
        clearUndoRedo()
    }

    return (
        <>
            <Paper className="Paper" elevation={0} style={{ minWidth: '20rem' }} sx={{ borderRadius: '20px' }}>
                <Box p={3}>
                    <Term term={term} setTerm={setTerm} session={session} setSession={setSession} />
                    <CourseSearchBar addCourse={addCourse} />
                    <Generate fetchReady={fetchReady} />
                </Box>
            </Paper>
            {courses.length > 0 && (
                <Paper className="Paper custom-scrollbar" elevation={0} style={{ minWidth: '20rem' }} sx={{ borderRadius: '20px', overflow: 'scroll', height: '60vh' }}>
                    <Box p={3}>
                        {courses.map((course) => (
                            // Analyze.ts +
                            <CourseInfo key={course.courseNumber} course={course} removeCourse={removeCourse} />
                        ))}
                    </Box>
                </Paper>
            )}
        </>
    )
}
export default CoursePanel
