import { tCourseInfo } from '../../../../data/DataDefinition/CourseInfoDD'
import { Section } from '../../../../data/DataDefinition/SectionDD'

export const getSectionsSelectedForScheduleSolver = (courses: tCourseInfo[]) => {
    let schedulerSections: Section[] = []
    // courses = [course, course, course]
    courses.forEach((course) => {
        // courseSections = {"Lecture": [section, section], "Tutorial": [section, section]}
        Object.entries(course.courseSections).forEach(([courseActivity, sections]) => {
            let countSectionsAdded = 0

            sections.forEach((section) => {
                // If section was selected put it in section solver
                // section = {selectedForScheduleSolver: true, ...}
                if (section.selectedForScheduleSolver) {
                    schedulerSections.push(section)
                    countSectionsAdded++
                }
            })

            // If 0 sections added from this activity, add full sections
            // eg. if no CPSC 110 lectures added, add CPSC 110 full lectures
            if (countSectionsAdded === 0) {
                sections.forEach((section) => {
                    // If section was selected put it in section solver
                    if (section.status === 'Full') {
                        schedulerSections.push(section)
                        countSectionsAdded++
                    }
                })
            }

            // If 0 sections added from this activity, add restricted sections
            // eg. if no CPSC 110 lectures added, add CPSC 110 restricted lectures
            if (countSectionsAdded === 0) {
                sections.forEach((section) => {
                    // If section was selected put it in section solver
                    if (section.status === 'Restricted') {
                        schedulerSections.push(section)
                        countSectionsAdded++
                    }
                })
            }
        })
    })
    return schedulerSections
}
