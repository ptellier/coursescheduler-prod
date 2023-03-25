import { Recommendation } from '../../../../data/DataDefinition/Recommendation'
import { filterDuplicatedSchedules } from './filter'
import { groupSections } from './groupby'
import { solve } from './solve_newengine'
import { recommend } from '../../../../helpers/recommend'

import { Dispatch, SetStateAction, useCallback, useContext } from 'react'
import { useCoursesInfo } from '../../../../context/CoursesInfoContext'
import { SectionsContext } from '../../../../context/SectionsContext'
import { UndoRedoContext } from '../../../../context/UndoRedoContext'
import { getSectionsSelectedForScheduleSolver } from './getSectionsSelectedForScheduleSolver'
/** solve and generate schedule recommendation */

type GenerateScheduleProps = {
    setLoading: Dispatch<SetStateAction<boolean>>
}

export const useGenerateSchedule = ({ setLoading }: GenerateScheduleProps) => {
    const { setSections, setRecommended, sections } = useContext(SectionsContext)
    const { clearUndoRedo } = useContext(UndoRedoContext)
    const { courses } = useCoursesInfo()

    const generateSchedule = useCallback(() => {
        setLoading(true)
        let sectionsSelected = getSectionsSelectedForScheduleSolver(courses)
        let sectionsNoDuplicate = filterDuplicatedSchedules(sectionsSelected)
        let sectionsGroup = groupSections(sectionsNoDuplicate)
        let sectionsSolved = solve(sectionsGroup)
        if (sectionsSolved.length === 0) {
            // Try again with full classes
            let sectionsSelected = sections
            const sectionsNoDuplicate = filterDuplicatedSchedules(sectionsSelected)
            const sectionsGroup = groupSections(sectionsNoDuplicate)
            const sectionsSolved = solve(sectionsGroup)

            // Full Classes Solved Schedule
            if (sectionsSolved.length > 0) {
                alert('Schedule is only possible when using full classes')
            }
            // Full Classes Didn't Solve Overlap Issue
            else {
                setLoading(false)
                return alert('No Possible Schedule With These Courses. Please Remove a Course and Try Again')
            }
        }
        const sectionsRecommended = recommend(sectionsSolved)
        setSections(sectionsGroup.flatMap((section) => section)) // Do we Need this?
        setRecommended(sectionsRecommended)
        clearUndoRedo()
        setLoading(false)
    }, [courses, setRecommended, setSections, clearUndoRedo])

    return generateSchedule
}
