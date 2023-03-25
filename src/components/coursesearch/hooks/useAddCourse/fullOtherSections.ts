export {}
// import {tSectionTypes} from '../../../../data/DataDefinition/CourseInfoDD'

// export const checkAllSectionsFull = (sectionTypes: tSectionTypes) => {
//     Object.entries(sectionTypes).map(([courseActivity, sections]) => {

//         sections.forEach((section) => {
//             if (section.status === 'Full' || section.status === 'Blocked') {
//                 return false
//             }
//         })
// })
//     return true
// }

//     const newSections = sections.map((section) => {
//         // If section was modified in Input Data -> Modify State
//         const newSection = fnCreateNewSction(section, fnData)
//         return newSection
//     })
//     // recreate this object {"Lectures": Sections[] , "Labs": Sections, ...}
//     newSectionTypes[courseActivity] = newSections
// })

// // Main Function - Modify State
// // Modify All Sections of a Course to be selectedForScheduleSolver
// const modifyAllCourseSelectedForScheduleSolver = (sectionTypes: tSectionTypes) => {
//         // tSectionTypes == {"Lectures": Sections[] , "Labs": Sections, ...}
//         let newSectionTypes: tSectionTypes = {}

//         // iterate: --- ["Lectures" , Sections[]] --- ["Labs" , Sections[]] ....
//         Object.entries(sectionTypes).map(([courseActivity, sections]) => {
//             if(courseActivity === 'Lecture') {
//                 newSectionTypes[courseActivity] = sections
//                 return
//             }
//             const AllBlockedOrFull = true
//             const newSections = sections.map((section) => {
//                 // If section was modified in Input Data -> Modify State
//                 if(section.status === 'Available') {
//                     section.selectedForScheduleSolver = false
//                     return section
//                 }

//                 }
//             })
//             // recreate this object {"Lectures": Sections[] , "Labs": Sections, ...}
//             newSectionTypes[courseActivity] = newSections
//         })
//         return newSectionTypes
// }
