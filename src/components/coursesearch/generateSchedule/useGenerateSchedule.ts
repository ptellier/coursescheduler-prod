import { Section } from '../../../data/DataDefinition/SectionDD'
import { Recommendation } from '../../../data/DataDefinition/Recommendation'
import { filterDuplicatedSchedules } from './filter'
import { groupSections } from './groupby'
import { solve } from './solve_newengine'
import { recommend } from '../../../helpers/recommend'
import { tCourseInfo } from '../../../data/DataDefinition/CourseInfoDD'
import { useCallback, useContext } from 'react'
import { useCoursesInfo } from '../../../context/CoursesInfoContext'
import { SectionsContext } from '../../../context/SectionsContext'
import { UndoRedoContext } from '../../../context/UndoRedoContext'
/** solve and generate schedule recommendation */

export const useGenerateSchedule = () => {
    const { setSections, setRecommended } = useContext(SectionsContext)
    const { clearUndoRedo } = useContext(UndoRedoContext)
    const coursesInfo = useCoursesInfo()

    const generateSchedule = useCallback(() => {
        const sections = getSectionsSelectedForScheduleSolver(coursesInfo.courses)
        const sectionsNoDuplicate = filterDuplicatedSchedules(sections)
        const sectionsGroup = groupSections(sectionsNoDuplicate)
        const sectionsSolved = solve(sectionsGroup)
        const sectionsRecommended = recommend(sectionsSolved)
        setSections(sectionsGroup.flatMap((section) => section))
        setRecommended(sectionsRecommended)
        clearUndoRedo()
    }, [coursesInfo.courses, setRecommended, setSections, clearUndoRedo])

    return generateSchedule
}

const getSectionsSelectedForScheduleSolver = (courses: tCourseInfo[]) => {
    let schedulerSections: Section[] = []
    // courses = [course, course, course]
    courses.forEach((course) => {
        // courseSections = {"Lecture": [section, section], "Tutorial": [section, section]}
        Object.entries(course.courseSections).forEach(([courseActivity, sections]) => {
            // section = {selectedForScheduleSolver: true, ...}
            sections.forEach((section) => {
                // If section was selected put it in section solver
                if (section.selectedForScheduleSolver) {
                    schedulerSections.push(section)
                }
            })
        })
    })

    return schedulerSections
}
