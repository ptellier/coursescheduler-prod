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
import { tCoursesInfo, tCourseOption, tCourseColors } from '../../data/DataDefinition/CourseInfoDD'
import { Section } from '../../data/DataDefinition/SectionDD'
import { addCourse } from './addCourse/addCourse'
import { generateSchedule } from './generateSchedule/generateSchedule'

type SearchPanelProps = {
    coursesInfo: tCoursesInfo
    setCoursesInfo: React.Dispatch<React.SetStateAction<tCoursesInfo>>
}

const SearchPanel = memo(({ coursesInfo, setCoursesInfo }: SearchPanelProps) => {
    const [courseOptions, setCourseOptions] = useState([])
    const { sections, setSections, setRecommended } = useContext(SectionsContext)
    const { addCourseColor } = useContext(CourseColorContext)
    const { clearUndoRedo } = useContext(UndoRedoContext)

    /**
     * parse user's raw input of search word then fetch course description data
     * Note1: course description data includes course code, name, description, credits
     * Note2: course description data are options available for user to choose
     * Note3: course data are different from section data
     * Note4: fetches from Ben Cheung's API (so much more efficient than Liang's)
     * @param searchWord
     */
    let loadCourseOptions = async (event: React.ChangeEvent<HTMLInputElement>) => {
        //: any
        if (event.nativeEvent.type === 'input') {
            const searchWord = event.target.value
            const data = await fetchCourseDesc(searchWord)
            // c.name === the description main desription of the course
            const options = data.map((c: any) => ({
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
                    onChange={(_, courseOption) => addCourse({ courseOption, coursesInfo, setCoursesInfo, addCourseColor, setSections })}
                    onInputChange={(e) => debounceLoadCourseOptions(e)}
                />
                <LoadingButton className="w-100" variant="contained" color="primary" onClick={() => generateSchedule({ sections, setSections, setRecommended, clearUndoRedo })}>
                    Run
                </LoadingButton>
            </Box>
        </Paper>
    )
})

type TermProps = {
    coursesInfo: any
    setCoursesInfo: Function
}

const Term = ({ coursesInfo, setCoursesInfo }: TermProps) => {
    //

    const { flushAllSections } = useContext(SectionsContext)

    const setTermAndSession = (val: string) => {
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
