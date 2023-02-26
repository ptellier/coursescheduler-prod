import { Accordion, AccordionDetails, AccordionSummary, Alert, AlertTitle, Badge, Button, Checkbox, Chip, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, IconButton, TextField, Tooltip } from '@mui/material'
import React, { memo, ReactChildren, ReactChild, useContext, useEffect, useState } from 'react'
import { SectionsContext } from '../../context/SectionsContext'
import { Course } from '../../data/DataDefinition/SearchWordDD'
import { ExpandMore, Clear } from '@mui/icons-material'
import { convertTimeslotsToTime } from './generateSchedule/time'
import { Section } from '../../data/DataDefinition/SectionDD'
import { getSection } from '../../api/ApiWebCrawler'
import { BiBuildings, BiTime, BiUser, BiDoorOpen, BiMap } from 'react-icons/bi'

// interface IProps {
//     classType: string
//     course: Course
//     icon?: any
// }

const ClassInfo = memo(({ classType, course, icon }) => {
    const { currentSections } = useContext(SectionsContext)
    const [sectionInfo, setSectionInfo] = useState(null)
    // Get applicable course information from the current schedule

    // Query Database - Get Specific Course Info
    const getSectionInfo = async (courseSection) => {
        console.log('fn - ClassInfo - getSectionInfo')
        let schedulePrettier = convertTimeslotsToTime(courseSection.schedule)
        const scrapedSectionInfo = await getSection(courseSection.subject, courseSection.course, courseSection.term, 'W', courseSection.section)
        let newCourseSection = { schedulePrettier: schedulePrettier, ...courseSection, ...scrapedSectionInfo }
        setSectionInfo(newCourseSection)
    }

    useEffect(() => {
        const current = currentSections.filter((currentSection) => currentSection.activity == classType && currentSection.subject == course.department && currentSection.course == course.courseNumber)
        if (current.length > 0) {
            getSectionInfo(current[0])
        }
        // Only updates when specific course section updates - eg CPSC 110 LAB
    }, [currentSections.filter((currentSection) => currentSection.activity == classType && currentSection.subject == course.department && currentSection.course == course.courseNumber)[0]])
    console.log('rerender - ClassInfo')
    return (
        <>
            <Accordion disableGutters>
                <AccordionSummary expandIcon={sectionInfo != null && <ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                    <div>
                        <div className="flex-space-between" style={{ width: '10rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '0.5rem', fontSize: '0.8rem' }}>
                                {icon}
                                <Badge badgeContent={'Full'} color="error">
                                    <div style={{ paddingLeft: 10, paddingRight: 10, fontWeight: 'bold' }}>{classType}</div>
                                </Badge>
                            </div>
                        </div>
                        {/* <div style={{ width: 280 }}>
                            <div style={{ position: 'absolute', right: 30, top: 45 }}>
                                {' '}
                                <IconButton onClick={() => {}} aria-label="delete">
                                    <Clear fontSize="small" />
                                </IconButton>
                            </div>
                            <Alert severity="warning">
                                <AlertTitle>All Classes are Full</AlertTitle>
                                <div className="flex-space-between">
                                    <Button style={{ fontSize: '0.75rem' }} variant="contained" color="warning">
                                        Search Waitlisted Classes
                                    </Button>
                                </div>
                            </Alert>
                        </div> */}
                        {/* <Alert severity="warning">
                            <AlertTitle>All General Seats are Full</AlertTitle>
                            Search <u>Restricted</u> Sections?
                        </Alert>
                        <Alert severity="error">All seats are full</Alert> */}
                    </div>
                </AccordionSummary>

                <AccordionDetails>
                    <div className="flex-space-between">
                        <Tooltip title="More Info">
                            <a style={{ textDecoration: 'underline' }} target="_blank" href={`https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=${sectionInfo?.subject}&course=${sectionInfo?.course}&section=${sectionInfo?.section}`}>
                                {sectionInfo?.name}
                            </a>
                        </Tooltip>
                        {sectionInfo?.mode && (
                            <div>
                                {sectionInfo?.mode} <BiMap size={20} />
                            </div>
                        )}
                    </div>
                    {sectionInfo?.schedulePrettier.length > 0 &&
                        sectionInfo.schedulePrettier.map((x) => (
                            <InfoRow>
                                <BiTime />
                                <span>
                                    {x.start_time} - {x.end_time} | {x.days}
                                </span>
                            </InfoRow>
                        ))}
                    {sectionInfo?.building && (
                        <InfoRow>
                            <BiBuildings />
                            <span>{sectionInfo?.building}</span>
                        </InfoRow>
                    )}
                    {sectionInfo?.room && (
                        <InfoRow>
                            <BiDoorOpen size={18} />
                            <div>Room: {sectionInfo?.room}</div>
                        </InfoRow>
                    )}
                    {sectionInfo?.instructor && (
                        <InfoRow>
                            <BiUser color={'#BDBDB'} />
                            {sectionInfo?.instructor == 'TBA' ? (
                                'Instructor: TBA'
                            ) : (
                                <a target="_blank" href={sectionInfo?.instructorUrl}>
                                    {sectionInfo?.instructor}
                                </a>
                            )}
                        </InfoRow>
                    )}
                    <CourseSearchOptions course={course} classType={classType} />
                </AccordionDetails>
            </Accordion>
        </>
    )
})

export default ClassInfo

// interface InfoProps {
//     children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[]
// }

const InfoRow = ({ children }) => {
    // : InfoProps
    return <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
}

// interface CourseSeachProps {
//     course: Course
//     classType: string
// }

const CourseSearchOptions = memo(({ course, classType }) => {
    // : CourseSeachProps
    const [open, setOpen] = React.useState(false)

    const handleClickOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Button variant="outlined" onClick={handleClickOpen}>
                Filter Class Sections
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">Generate Schedule with Specific Classes</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">Check which classes you would like to have in your perfect schedule</DialogContentText>
                    <br />
                    <div style={{ display: 'flex' }}>
                        <div>
                            <div style={{ marginInline: 10, display: 'flex' }}>
                                <input type="checkbox" defaultChecked={true} />
                                <Chip style={{ width: 100, height: 20 }} label={'Full'} size="small" color="error" />
                            </div>

                            <DisplayList course={course} classType={classType} type={'Full'} />
                        </div>
                        <div>
                            <div style={{ marginInline: 10, display: 'flex' }}>
                                <input type="checkbox" defaultChecked={true} />
                                <Chip style={{ width: 100, height: 20 }} label={'Restricted'} size="small" color="warning" />
                            </div>
                            <DisplayList course={course} classType={classType} type={'Else'} />
                        </div>
                        <div>
                            <div style={{ marginInline: 10, display: 'flex' }}>
                                <input type="checkbox" defaultChecked={true} />
                                <Chip style={{ width: 100, height: 20 }} label={'Available'} size="small" color="success" />
                            </div>
                            <DisplayList course={course} classType={classType} type={'Available'} />
                        </div>
                    </div>
                    <br />
                    <FormControl component="fieldset"></FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained">
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
})

const DisplayList = ({ course, classType, type }) => {
    return (
        <Container>
            {course.courseSections[classType].length > 0 &&
                course.courseSections[classType].map((section) => {
                    if (section.status !== type || (section.status !== 'else' && section.status === 'Full' && section.status === 'Available')) return
                    let color = 'warning'
                    if (section.status === 'Full') color = 'error'
                    if (section.status === 'Available') color = 'success'
                    return (
                        <div style={{ display: 'flex' }}>
                            <input type="checkbox" defaultChecked={true} />
                            <a style={{ textDecoration: 'underline', fontSize: '0.5 em' }} target="_blank" href={`https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=${section.subject}&course=${section.course}&section=${section.section}`}>
                                {section.name}
                            </a>
                            {/* <Chip size="small" style={{ width: 100, height: 20 }} color={color} label={section.status} /> */}
                        </div>
                    )
                })}
        </Container>
    )
}

// All seats are full. Would you like to search Waitedlisted Sections?
// All s

// 'Available' | 'Full' | 'Restricted' |  | 'Waiting List'
// 'Has Seat Available' -
// 'Waiting List' - Same thing

// 'Blocked' - blocked from registration,
