import { useState, useContext, memo } from 'react'
import { Autocomplete, Box, debounce, Paper, TextField, MenuItem, LinearProgress } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { fetchCourseDesc } from '../../api/APICourseListing'
import { filterDuplicatedSchedules } from './generateSchedule/filter'
import { solve } from './generateSchedule/solve_newengine'
import { groupSections } from './generateSchedule/groupby'
import { recommend } from './generateSchedule/recommend'
import { SectionsContext } from '../../context/SectionsContext'
import { UndoRedoContext } from '../../context/UndoRedoContext'
import { checkCourseCreditLimit, checkDuplicateCourse } from './generateSchedule/Exceptions'
import { getSections } from '../../api/APIWebCrawler'
import { CourseColorContext } from '../../context/CourseColorContext'
import { organizeSections } from './generateSchedule/organizeSections'

const SearchPanel = memo(({ coursesInfo, setCoursesInfo }) => {
    const [courseOptions, setCourseOptions] = useState([])
    const { sections, setSections, setRecommended } = useContext(SectionsContext)
    const { addCourseColor } = useContext(CourseColorContext)
    const [isGeneratingSchedule, setIsGeneratingSchedule] = useState(false)
    const { clearUndoRedo } = useContext(UndoRedoContext)

    /** solve and generate schedule recommendation */
    const handleGenerate = () => {
        setIsGeneratingSchedule(true)
        const sectionsNoDuplicate = filterDuplicatedSchedules(sections)
        const sectionsGroup = groupSections(sectionsNoDuplicate)
        const sectionsSolved = solve(sectionsGroup)
        const sectionsRecommended = recommend(sectionsSolved)
        setSections(sectionsGroup.flatMap((section) => section))
        setRecommended(sectionsRecommended)
        clearUndoRedo()
        setIsGeneratingSchedule(false)
    }

    const handleAddCourse = async (event, courseOption, coursesInfo) => {
        try {
            // Error Handling
            if (courseOption === null) throw Error('NULL')
            checkCourseCreditLimit(courseOption, coursesInfo.totalCredits)
            checkDuplicateCourse(courseOption, coursesInfo.courses)

            // Get Course Colors
            const courseColors = addCourseColor(courseOption.key)

            // Get Course Sections
            const newSections = await getSections(courseOption.department, courseOption.courseNumber, coursesInfo.term, coursesInfo.session)

            setSections((sections) => [...sections, ...newSections])

            // Sort Sections into labs, lectures, tutorial etc...
            const organizedSections = organizeSections(newSections)

            // Get Total Credits
            const totalCredits = coursesInfo.totalCredits + courseOption.credits

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
            }

            // Add New Course to Courses that will be passed to CourseInfo State
            setCoursesInfo((courseInfo) => {
                const courses = [...coursesInfo.courses, newCourse]
                return { ...courseInfo, courses, totalCredits }
            })
        } catch (e) {
            if (e.message === 'NULL') return
            alert(e)
        }
    }

    /**
     * parse user's raw input of search word then fetch course description data
     * Note1: course description data includes course code, name, description, credits
     * Note2: course description data are options available for user to choose
     * Note3: course data are different from section data
     * Note4: fetches from Ben Cheung's API (so much more efficient than Liang's)
     * @param searchWord
     */
    let loadCourseOptions = async (event) => {
        //: any
        if (event.nativeEvent.type === 'input') {
            const searchWord = event.target.value
            const data = await fetchCourseDesc(searchWord)
            // c.name === the description main desription of the course
            const options = data.map((c) => ({
                key: c.code,
                label: c.code + ' - ' + c.name,
                department: c.dept,
                courseNumber: c.code.split(' ')[1],
                courseDescription: c.name,
                credit: c.cred,
            }))
            setCourseOptions(options)
        }
    }

    /**
     * Debounce - delay searching for course options by 500ms
     */
    const debounceLoadCourseOptions = debounce((e) => {
        loadCourseOptions(e)
    }, 500)

    return (
        <Paper className="Paper" elevation={0} sx={{ borderRadius: '20px' }}>
            <Box p={3}>
                <Term coursesInfo={coursesInfo} setCoursesInfo={setCoursesInfo} />
                <Autocomplete
                    options={courseOptions}
                    sx={{ [`& fieldset`]: { borderRadius: '10px' }, mb: 2 }}
                    renderInput={(params) => <TextField {...params} label="Search Courses" />}
                    onChange={(e, option) => handleAddCourse(e, option, coursesInfo)}
                    onInputChange={(e) => debounceLoadCourseOptions(e)}
                />
                <LoadingButton loading={isGeneratingSchedule} className="w-100" variant="contained" color="primary" onClick={handleGenerate}>
                    Run
                </LoadingButton>
            </Box>
        </Paper>
    )
})

// type TermProps = {
//     coursesInfo: any
//     setCoursesInfo: Function
// }

const Term = ({ coursesInfo, setCoursesInfo }) => {
    //: TermProps

    const { flushAllSections } = useContext(SectionsContext)

    const setTermAndSession = (val) => {
        //: string
        const session = val[0]
        const term = val[1]
        setCoursesInfo(() => {
            return { courses: [], totalCredits: 0, session: session, term: term }
        })
        flushAllSections()
    }
    const termOptions = [
        { name: 'Winter 1 (Sep - Dec)', value: 'W1' },
        { name: 'Winter 2 (Jan - Apr)', value: 'W2' },
        { name: 'Summer 1 (May - Jun)', value: 'S1' },
        { name: 'Summer 2 (Jul - Aug)', value: 'S2' },
    ]
    return (
        <TextField id="term-choice-field" select label="Term" value={coursesInfo.session + coursesInfo.term} onChange={(e) => setTermAndSession(e.target.value)} sx={{ [`& fieldset`]: { borderRadius: '10px' }, width: '100%', mb: 2 }}>
            {termOptions.map((termOption, key) => {
                return (
                    <MenuItem key={key} value={termOption.value}>
                        {termOption.name}
                    </MenuItem>
                )
            })}
        </TextField>
    )
}

export default SearchPanel
