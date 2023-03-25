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
    const { setSections, setRecommended } = useContext(SectionsContext)
    const { clearUndoRedo } = useContext(UndoRedoContext)
    const { courses } = useCoursesInfo()

    const generateSchedule = useCallback(() => {
        setLoading(true)
        const sections = getSectionsSelectedForScheduleSolver(courses)
        const sectionsNoDuplicate = filterDuplicatedSchedules(sections)
        const sectionsGroup = groupSections(sectionsNoDuplicate)
        const sectionsSolved = solve(sectionsGroup)
        const sectionsRecommended = recommend(sectionsSolved)
        setSections(sectionsGroup.flatMap((section) => section)) // Do we Need this?
        setRecommended(sectionsRecommended)
        clearUndoRedo()
        setLoading(false)
    }, [courses, setRecommended, setSections, clearUndoRedo])

    return generateSchedule
}
