import { Accordion, AccordionDetails, AccordionSummary, Tooltip, Typography } from '@mui/material'
import React, { memo, ReactChildren, ReactChild, useContext, useEffect, useState, useMemo, useCallback } from 'react'
import { SectionsContext } from '../../context/SectionsContext'
import { Course } from '../../data/DataDefinition/SearchWordDD'
import { ExpandMore, Clear, Check } from '@mui/icons-material'
import { convertTimeslotsToTime } from './hooks/useGenerateSchedule/time'
import { Section } from '../../data/DataDefinition/SectionDD'
import { getSection } from '../../api/APIWebCrawler'
import { AccessTime, PersonOutline, BusinessOutlined, DoorFrontOutlined, FmdGoodOutlined } from '@mui/icons-material'

interface IProps {
    classType: string
    course: Course
    icon?: any
    isFirstSectionRendered: boolean
}

const ClassInfo = memo(({ classType, course, icon, isFirstSectionRendered }: IProps) => {
    console.log('Class Info')
    const [accordionExpanded, setAccordionExpanded] = useState<boolean>(false)
    const { currentSections } = useContext(SectionsContext)
    const [sectionInfo, setSectionInfo] = useState<any>(null)

    // API Call - Get Specific Course Section Info
    const getSectionInfo = async (courseSection: any) => {
        let schedulePrettier = convertTimeslotsToTime(courseSection.schedule)
        // Scrap SSC Info
        // @ts-ignore
        const scrapedSectionInfo = await getSection(courseSection.subject, courseSection.course, course.courseTerm, course.courseSession, courseSection.section)
        let newCourseSection = { schedulePrettier: schedulePrettier, ...courseSection, ...scrapedSectionInfo }
        setSectionInfo(newCourseSection)
    }

    // Gets when specific course section for this specific component - eg CPSC 110 LAB
    const getSpecificSection = () => {
        return currentSections.filter((currentSection: Section) => currentSection.activity === classType && currentSection.subject === course.department && currentSection.course == course.courseNumber)
    }

    const currentSpecificSection = getSpecificSection()

    useEffect(() => {
        // Gets the specific couse section from currentSections - eg CPSC 110 LAB
        const current = currentSpecificSection

        if (current.length > 0) {
            // Force First Section of First course to open on clicking "Generate Schedule"
            if (isFirstSectionRendered && sectionInfo == null) {
                setAccordionExpanded(true)
            }

            // Prevents API Call if Accordion is not expanded
            // 1. Fetch if => Accordion Expanded && Have Never Fetched
            // 2. Fetch if => Accordion Expanded && Dragged and Dropped to New Section
            if (accordionExpanded && (sectionInfo === null || currentSpecificSection[0].courseName !== sectionInfo.name)) {
                getSectionInfo(current[0])
            }
        }
        // Gets the specific couse section from currentSections - eg CPSC 110 LAB
    }, [currentSpecificSection[0], accordionExpanded])
    console.log('info', sectionInfo)
    return (
        <>
            <Accordion onChange={() => setAccordionExpanded((isExpanded: boolean) => !isExpanded)} expanded={accordionExpanded} disableGutters disabled={!currentSpecificSection[0]?.selectedForScheduleSolver}>
                <AccordionSummary expandIcon={currentSpecificSection[0]?.selectedForScheduleSolver && <ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                    <div className="flex-space-between">
                        <RowIconText icon={icon} info={<b style={{ fontSize: '0.8rem', paddingLeft: 10 }}>{classType}</b>} />
                    </div>
                </AccordionSummary>

                <AccordionDetails>
                    {sectionInfo?.name && (
                        <div className="flex-space-between">
                            <Tooltip title="More Info">
                                <Typography variant="body1">
                                    <a style={{ textDecoration: 'underline' }} target="_blank" rel="noreferrer" href={`https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=${sectionInfo?.subject}&course=${sectionInfo?.course}&section=${sectionInfo?.section}`}>
                                        {sectionInfo?.name}
                                    </a>
                                </Typography>
                            </Tooltip>
                            <RowIconText icon={<FmdGoodOutlined sx={{ fontSize: 20 }} />} info={sectionInfo?.mode} reverseDirection={true} />
                        </div>
                    )}
                    {sectionInfo?.schedulePrettier.length > 0 && sectionInfo.schedulePrettier.map((x: any) => <RowIconText icon={<AccessTime sx={{ fontSize: 18 }} />} info={`${x.start_time} - ${x.end_time} | ${x.days}`} />)}
                    {sectionInfo?.building && <RowIconText icon={<BusinessOutlined sx={{ fontSize: 18 }} />} info={sectionInfo?.building} />}
                    {sectionInfo?.room && <RowIconText icon={<DoorFrontOutlined sx={{ fontSize: 18 }} />} info={`Room: ${sectionInfo?.room}`} />}
                    {sectionInfo?.instructor && (
                        <RowIconText
                            icon={<PersonOutline sx={{ fontSize: 20 }} />}
                            info={
                                sectionInfo?.instructor == 'TBA' ? (
                                    'Instructor: TBA'
                                ) : (
                                    <a target="_blank" href={sectionInfo?.instructorUrl}>
                                        {sectionInfo?.instructor}
                                    </a>
                                )
                            }
                        />
                    )}
                    {sectionInfo?.currentlyRegistered.length > 0 && (
                        <RowIconText
                            icon={<SeatsRemainingIcon condition={parseInt(sectionInfo?.totalSeatsRemaining) > 0} />}
                            info={<SeatsRemainingRow description={'Total Seats'} seats={`${sectionInfo.totalSeatsRemaining} / ${parseInt(sectionInfo.totalSeatsRemaining) + parseInt(sectionInfo.currentlyRegistered)}`} paddingLeft={'36px'} />}
                        />
                    )}
                    {sectionInfo?.generalSeatsRemainings.length > 0 && (
                        <RowIconText icon={<SeatsRemainingIcon condition={parseInt(sectionInfo?.generalSeatsRemainings) > 0} />} info={<SeatsRemainingRow description={'General Seats'} seats={sectionInfo.generalSeatsRemainings} paddingLeft={'36px'} />} />
                    )}
                    {sectionInfo?.restrictedSeatsRemaining.length > 0 && (
                        <RowIconText icon={<SeatsRemainingIcon condition={parseInt(sectionInfo?.restrictedSeatsRemaining) > 0} />} info={<SeatsRemainingRow description={'Restricted Seats'} seats={sectionInfo.restrictedSeatsRemaining} paddingLeft={'20px'} />} />
                    )}
                </AccordionDetails>
            </Accordion>
        </>
    )
})

export default ClassInfo

interface InfoProps {
    icon: React.ReactNode
    info: string | React.ReactNode
    reverseDirection?: Boolean
}

const RowIconText = ({ icon, info, reverseDirection = false }: InfoProps) => {
    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Typography variant="body1" style={{ display: 'flex', alignItems: 'center' }}>
                {reverseDirection ? (
                    <>
                        {info} {icon}
                    </>
                ) : (
                    <>
                        {icon} <span style={{ paddingLeft: 5 }}>{info}</span>
                    </>
                )}
            </Typography>
        </div>
    )
}

const SeatsRemainingRow = ({ description, seats, paddingLeft }: { description: string; seats: string; paddingLeft: string }) => {
    return (
        <div className="flex-space-between" style={{ width: 200 }}>
            <div>{description}: </div>
            <div style={{ paddingLeft: paddingLeft }}>
                <b>{seats}</b>
            </div>
        </div>
    )
}

const SeatsRemainingIcon = ({ condition }: { condition: boolean }) => {
    return condition ? <Check sx={{ fontSize: 20, color: 'green' }} /> : <Clear sx={{ fontSize: 20, color: 'red' }} />
}
