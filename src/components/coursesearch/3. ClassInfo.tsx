import { Accordion, AccordionDetails, AccordionSummary, Tooltip, Typography } from '@mui/material'
import React, { memo, ReactChildren, ReactChild, useContext, useEffect, useState } from 'react'
import { SectionsContext } from '../../context/SectionsContext'
import { Course } from '../../data/DataDefinition/SearchWordDD'
import { ExpandMore, Clear } from '@mui/icons-material'
import { convertTimeslotsToTime } from './generateSchedule/time'
import { Section } from '../../data/DataDefinition/SectionDD'
import { getSection } from '../../api/APIWebCrawler'
import { AccessTime, PersonOutline, BusinessOutlined, DoorFrontOutlined, FmdGoodOutlined } from '@mui/icons-material'

interface IProps {
    classType: string
    course: Course
    icon?: any
}

const ClassInfo = memo(({ classType, course, icon }: IProps) => {
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

    useEffect(() => {
        // Gets the specific couse section from currentSections - eg CPSC 110 LAB
        const current = currentSections.filter((currentSection: Section) => currentSection.activity == classType && currentSection.subject == course.department && currentSection.course == course.courseNumber)
        if (current.length > 0) {
            getSectionInfo(current[0])
        }
        // Only updates when specific course section changes - eg CPSC 110 LAB
    }, [currentSections.filter((currentSection: Section) => currentSection.activity == classType && currentSection.subject == course.department && currentSection.course == course.courseNumber)[0]])

    return (
        <>
            <Accordion disableGutters disabled={sectionInfo == null}>
                <AccordionSummary expandIcon={sectionInfo != null && <ExpandMore />} aria-controls="panel1a-content" id="panel1a-header">
                    <div className="flex-space-between">
                        <RowIconText icon={icon} info={<b style={{ fontSize: '0.8rem', paddingLeft: 10 }}>{classType}</b>} />
                    </div>
                </AccordionSummary>

                <AccordionDetails>
                    <div className="flex-space-between">
                        <Tooltip title="More Info">
                            <Typography variant="body1">
                                <a style={{ textDecoration: 'underline' }} target="_blank" href={`https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=${sectionInfo?.subject}&course=${sectionInfo?.course}&section=${sectionInfo?.section}`}>
                                    {sectionInfo?.name}
                                </a>
                            </Typography>
                        </Tooltip>
                        <RowIconText icon={<FmdGoodOutlined sx={{ fontSize: 20 }} />} info={sectionInfo?.mode} reverseDirection={true} />
                    </div>
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
