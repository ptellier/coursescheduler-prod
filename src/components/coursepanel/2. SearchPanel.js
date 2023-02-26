import { useState, useContext, memo } from 'react'
import { Autocomplete, Box, debounce, Paper, TextField, MenuItem, Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle, Alert, Button, Typography } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { fetchCourseDesc } from '../../api/ApiCourseListing'
import { filterDuplicatedSchedules } from './generateSchedule/filter'
import { solve } from './generateSchedule/solve_newengine'
import { groupSections } from './generateSchedule/groupby'
import { recommend } from './generateSchedule/recommend'
import { SectionsContext } from '../../context/SectionsContext'
import { UndoRedoContext } from '../../context/UndoRedoContext'
import { Course } from '../../data/DataDefinition/SearchWordDD'
import { checkCourseCreditLimit, checkDuplicateCourse } from './Exceptions'
import { getSections } from '../../api/ApiWebCrawler'
import { CourseColorContext } from '../../context/CourseColorContext'
import { Section } from '../../data/DataDefinition/SectionDD'
import useCoursesInfo from './hooks/useCoursesInfo'
import { organizeSections } from './generateSchedule/organizeSections'
import { WarningAmber, ErrorOutline } from '@mui/icons-material'

// interface SearchPanelProps {
//     coursesInfo: any
//     setCoursesInfo: Function
// }

const SearchPanel = memo(({ coursesInfo, setCoursesInfo }) => {
    //: SearchPanelProps
    const [courseOptions, setCourseOptions] = useState([])
    const { sections, setSections, setRecommended } = useContext(SectionsContext)
    const { addCourseColor } = useContext(CourseColorContext)
    const [fetchReady, setFetchReady] = useState(false)
    const { clearUndoRedo } = useContext(UndoRedoContext)
    const [open, setOpen] = useState(false)
    const [open1, setOpen1] = useState(false)
    const [open2, setOpen2] = useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleClickOpen1 = () => {
        setOpen1(true)
    }

    const handleClose1 = () => {
        setOpen1(false)
    }

    const handleClickOpen2 = () => {
        setOpen2(true)
    }

    const handleClose2 = () => {
        setOpen2(false)
    }

    /** solve and generate schedule recommendation */
    const handleGenerate = () => {
        console.log('fn - searchPanel - handle generate')
        const sectionsNoDuplicate = filterDuplicatedSchedules(sections)
        const sectionsGroup = groupSections(sectionsNoDuplicate)
        const sectionsSolved = solve(sectionsGroup)
        const sectionsRecommended = recommend(sectionsSolved)
        setSections(sectionsGroup.flatMap((section) => section))
        setRecommended(sectionsRecommended)
        clearUndoRedo()
    }

    const handleAddCourse = async (event, courseOption, coursesInfo) => {
        try {
            console.log('fn - searchPanel - add course')

            // Error Handling
            if (courseOption === null) throw Error('NULL')
            checkCourseCreditLimit(courseOption, coursesInfo.totalCredits)
            checkDuplicateCourse(courseOption, coursesInfo.courses)

            // Get Course Colors
            const courseColors = addCourseColor(courseOption.key)

            // Get Course Sections
            setFetchReady(false)
            const newSections = await getSections(courseOption.department, courseOption.courseNumber, coursesInfo.term, coursesInfo.session)
            setFetchReady(true)

            setSections((sections) => [...sections, ...newSections]) //: Section[]

            // Sort Sections into labs, lectures, tutorial etc...
            const organizedSections = organizeSections(newSections)

            // Get Total Credits
            const totalCredits = coursesInfo.totalCredits + courseOption.credits

            // Create New Course
            const newCourse = { department: courseOption.department, courseNumber: courseOption.courseNumber, courseName: courseOption.courseName, credit: courseOption.credit, courseColors: courseColors, courseSections: organizedSections }

            setCoursesInfo((courseInfo) => {
                const courses = [...coursesInfo.courses, newCourse]
                return { ...courseInfo, courses, totalCredits }
            })
        } catch (e) {
            //: any
            alert(e)
        }
    }

    // const handleAddCourse = async (event: any, courseOption: any) => {

    //         await addCourse(courseOption)
    //         if (e.message === 'NULL') return

    // }

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
            const options = data.map((c) => ({
                //: any
                key: c.code,
                label: c.code + ' - ' + c.name,
                department: c.dept,
                courseNumber: c.code.split(' ')[1],
                courseName: c.name,
                credit: c.cred,
            }))
            setCourseOptions(options)
        }
    }

    /**
     * Debounce
     */
    const debounceLoadCourseOptions = debounce((e) => {
        loadCourseOptions(e)
    }, 500)
    console.log('rerender - searchPanel')

    return (
        <Paper className="Paper" elevation={0} style={{ minWidth: '20rem' }} sx={{ borderRadius: '20px' }}>
            <Box p={3}>
                <Term coursesInfo={coursesInfo} setCoursesInfo={setCoursesInfo} />
                <Autocomplete
                    options={courseOptions}
                    sx={{ [`& fieldset`]: { borderRadius: '10px' }, mb: 2 }}
                    renderInput={(params) => <TextField {...params} label="Search Courses" />}
                    onChange={(e, option) => handleAddCourse(e, option, coursesInfo)}
                    onInputChange={(e) => debounceLoadCourseOptions(e)}
                />
                <LoadingButton disabled={!fetchReady} className="w-100" variant="contained" color="primary" onClick={handleGenerate}>
                    Run
                </LoadingButton>
            </Box>
            {/* FULL WITH WAITING LIST*/}
            <Button variant="outlined" onClick={handleClickOpen2}>
                Open FULL CLASS WITH WAITING LIST DIALOG
            </Button>

            <Dialog open={open2} onClose={handleClose2} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    <Paper square={true} elevation={0} style={{ backgroundColor: '#E1E1C2', padding: 10, display: 'flex', alignItems: 'center' }}>
                        <ErrorOutline color="warning" />
                        <Typography variant="h6">CPSC 110 Lecture is Full but has a Waiting List</Typography>
                    </Paper>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">This class is full but has a waiting list lectures. Would like to include on the waiting list lectures?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose2}>Remove this Class</Button>
                    <Button onClick={handleClose2} variant="contained" autoFocus>
                        Include Waiting List Lectures
                    </Button>
                </DialogActions>
            </Dialog>
            {/* FULL */}
            <Button variant="outlined" onClick={handleClickOpen}>
                Open FULL CLASS DIALOG
            </Button>

            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    <Paper square={true} elevation={0} style={{ backgroundColor: '#FFCCCB', padding: 10, display: 'flex', alignItems: 'center' }}>
                        <ErrorOutline color="error" />
                        <Typography variant="h6">CPSC 110 Lecture is Full</Typography>
                    </Paper>
                </DialogTitle>

                <DialogContent>
                    <DialogContentText id="alert-dialog-description">This class is full. Would you still like to include this course in your schedule?</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Keep this Course
                    </Button>
                    <Button onClick={handleClose} variant="contained">
                        Remove this Course
                    </Button>
                </DialogActions>
            </Dialog>
            {/* RESTRICTED */}
            <Button variant="outlined" onClick={handleClickOpen1}>
                Open Restricted Class
            </Button>
            <Dialog open={open1} onClose={handleClose1} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    <Paper square={true} elevation={0} style={{ backgroundColor: '#E1E1C2', padding: 10, display: 'flex', alignItems: 'center' }}>
                        <WarningAmber color="warning" />
                        <Typography variant="h6">Include Restricted CPSC 110 Lectures?</Typography>
                    </Paper>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Do you satisfy the restriction criteria for these classes? <br />
                        Please check off the lectures that you're allowed to attend
                    </DialogContentText>
                    <input type="checkbox" /> Add All Lectures
                    <div style={{ paddingLeft: 20 }}>
                        <input type="checkbox" />{' '}
                        <a style={{ textDecoration: 'underline' }} href="google.com">
                            CPSC 110 - 10
                        </a>
                        <br />
                        <input type="checkbox" />{' '}
                        <a style={{ textDecoration: 'underline' }} href="google.com">
                            CPSC 110 - 20
                        </a>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleClose1} autoFocus>
                        Next
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    )
})

// type TermProps = {
//     coursesInfo: any
//     setCoursesInfo: Function
// }

const Term = ({ coursesInfo, setCoursesInfo }) => {
    //: TermProps

    const setTermAndSession = (val) => {
        //: string
        setCoursesInfo((coursesInfo1) => {
            //: any
            const session = val[0]
            const term = val[1]
            return { ...coursesInfo1, session: session, term: term }
        })
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
