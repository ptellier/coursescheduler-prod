import { useState, useContext, memo } from 'react'
import { Autocomplete, Box, debounce, Paper, TextField, MenuItem, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { fetchCourseDesc } from '../../api/APICourseListing'
import { SectionsContext } from '../../context/SectionsContext'
import { UndoRedoContext } from '../../context/UndoRedoContext'

import { CourseColorContext } from '../../context/CourseColorContext'
import { tCoursesInfo, tSectionTypes } from '../../data/DataDefinition/CourseInfoDD'
import { useAddCourse } from './hooks/useAddCourse/useAddCourse'
import { useGenerateSchedule } from './hooks/useGenerateSchedule/useGenerateSchedule'
import { DialogRestrictedClassesAvailable } from './4. DialogClassesRestricted'
import { tCourseRestrictedOrFullProps } from '../../data/DataDefinition/CourseInfoDD'
import { useCoursesInfoSetState } from '../../context/CoursesInfoContext'
import { DialogClassesFull } from './5. DialogClassesFull'

type SearchPanelProps = {
    coursesInfo: tCoursesInfo
}

const SearchPanel = memo(({ coursesInfo }: SearchPanelProps) => {
    console.log('Search Panel')
    const [loading, setLoading] = useState(false)
    const [clearInputBox, setClearInputBox] = useState(0)
    const [courseOptions, setCourseOptions] = useState([])
    const [courseRestrictedOrFull, setCourseRestrictedOrFull] = useState<tCourseRestrictedOrFullProps>({ full: false, restricted: false, courseName: '', restrictedSectionTypes: {} })
    const generateSchedule = useGenerateSchedule({ setLoading })
    const addCourse = useAddCourse({ setClearInputBox, setCourseRestrictedOrFull })
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
        <>
            <Paper className="Paper" elevation={0} sx={{ borderRadius: '20px' }}>
                <Box p={3}>
                    <Term coursesInfo={coursesInfo} />
                    <Autocomplete
                        key={clearInputBox}
                        autoSelect={true}
                        options={courseOptions}
                        sx={{ [`& fieldset`]: { borderRadius: '10px' }, mb: 2 }}
                        renderInput={(params) => <TextField {...params} label="Search Courses" />}
                        onChange={(_, courseOption) => {
                            addCourse(courseOption, coursesInfo.term, coursesInfo.session)
                        }}
                        onInputChange={(e) => debounceLoadCourseOptions(e)}
                    />
                    <LoadingButton className="w-100" variant="contained" color="primary" loading={loading} onClick={() => generateSchedule()}>
                        Generate Schedule
                    </LoadingButton>
                    <br />
                </Box>
            </Paper>
            {courseRestrictedOrFull.restricted && <DialogRestrictedClassesAvailable courseRestrictedOrFull={courseRestrictedOrFull} setCourseRestrictedOrFull={setCourseRestrictedOrFull} />}
            {courseRestrictedOrFull.full && !courseRestrictedOrFull.restricted && <DialogClassesFull courseRestrictedOrFull={courseRestrictedOrFull} setCourseRestrictedOrFull={setCourseRestrictedOrFull} />}
        </>
    )
})

type TermProps = {
    coursesInfo: any
}

const Term = ({ coursesInfo }: TermProps) => {
    const setCoursesInfo = useCoursesInfoSetState()

    const { flushAllSections } = useContext(SectionsContext)

    const setTermAndSession = (val: string) => {
        const session = val[0]
        const term = val[1]
        setCoursesInfo({ courses: [], totalCredits: 0, session: session, term: term })
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
