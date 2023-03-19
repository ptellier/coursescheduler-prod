import { Section } from '../../../data/DataDefinition/SectionDD'
import { Recommendation } from '../../../data/DataDefinition/Recommendation'
import { filterDuplicatedSchedules } from './filter'
import { groupSections } from './groupby'
import { solve } from './solve_newengine'
import { recommend } from '../../../helpers/recommend'

/** solve and generate schedule recommendation */
type GenerateScheduleProps = {
    sections: Section[]
    setSections: React.Dispatch<React.SetStateAction<Section[]>>
    setRecommended: React.Dispatch<React.SetStateAction<Recommendation>>
    clearUndoRedo: () => void
}

export const generateSchedule = ({ sections, setSections, setRecommended, clearUndoRedo }: GenerateScheduleProps) => {
    const sectionsNoDuplicate = filterDuplicatedSchedules(sections)
    const sectionsGroup = groupSections(sectionsNoDuplicate)
    const sectionsSolved = solve(sectionsGroup)
    const sectionsRecommended = recommend(sectionsSolved)
    setSections(sectionsGroup.flatMap((section) => section))
    setRecommended(sectionsRecommended)
    clearUndoRedo()
}
