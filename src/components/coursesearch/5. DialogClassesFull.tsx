import { Button } from '@mui/material'
import React, { memo } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { tCourseRestrictedOrFullProps } from '../../data/DataDefinition/CourseInfoDD'
import { useCoursesInfoSetState } from '../../context/CoursesInfoContext'
import { useRemoveCourse } from './hooks/useRemoveCourse/useRemoveCourse'
import { selectAllSectionsForScheduleSolver, useUpdateSectionsForSolver } from './hooks/useUpdateSectionsForSolver/useUpdateSectionsForSolver'

type DialogClassesFullProps = {
    courseRestrictedOrFull: tCourseRestrictedOrFullProps
    setCourseRestrictedOrFull: React.Dispatch<React.SetStateAction<tCourseRestrictedOrFullProps>>
}

export const DialogClassesFull = memo(({ courseRestrictedOrFull, setCourseRestrictedOrFull }: DialogClassesFullProps) => {
    console.log('Dialog Classes Full ')

    // const removeCourse = useRemoveCourse()
    const updateSectionsForSolver = useUpdateSectionsForSolver()

    const handleRemoveCourse = (e: any) => {
        e.preventDefault()
        // removeCourse(courseRestrictedOrFull.courseName)
        handleDialogClose()
    }

    const handleAddAllClassesToScheduleSolver = (e: any) => {
        e.preventDefault()
        // Notice fnCreateNewSection used - selectAllSectionsForScheduleSolver
        updateSectionsForSolver({
            courseName: courseRestrictedOrFull.courseName,
            fnCreateNewSection: selectAllSectionsForScheduleSolver,
            fnData: '',
        })

        handleDialogClose()
    }

    const handleDialogClose = () => {
        setCourseRestrictedOrFull({ full: false, restricted: false, courseName: '', restrictedSectionTypes: {} })
    }

    // VERY IMPORTANT!!!!!!
    // DIALOG CLASSES FULL ONLY OPENS IF
    // 1. courseRestrictedOrFull.full       == true
    // 2. courseRestrictedOrFull.restricted == false
    return (
        <Dialog open={courseRestrictedOrFull.full && !courseRestrictedOrFull.restricted}>
            <DialogTitle>All Lectures for {courseRestrictedOrFull.courseName} are Full</DialogTitle>
            <DialogContent>
                <DialogContentText>Would you like to add full classes to your schedule?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleRemoveCourse} variant="contained" color={'error'}>
                    Remove Course
                </Button>
                <Button onClick={handleAddAllClassesToScheduleSolver} variant="contained" color={'success'}>
                    Add Full Lectures
                </Button>
            </DialogActions>
        </Dialog>
    )
})

// lecture open -> Other Full Sections -> Give Full Others

// Restricted -> Other Full Sections -> Give Other

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Pop Up Dialog
// 1. Restricted Classes Available
// 2. All Classes Full
// 3. Restricted + Full Classes Available

// 1. If Lecture not full
// 1. If subsection not full
//      -> Do Nothing
// 2. If subsection full
//      -> include full subsections

// 2. If Lecture full
// Course Is Full

//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Pop Up Dialog for when schedule doesn't work

// export const DialogClassesFullAndRestrictedAvailable = memo(({ courseRestrictedOrFull, setCourseRestrictedOrFull }: DialogRestrictedClassesAvailableProps) => {
//     const removeCourse = useRemoveCourse()
//     const setCoursesInfo = useCoursesInfoSetState()
//     const handleClassesInScheduleSolver = (e: any) => {
//         e.preventDefault()

//         const submitButtonType = e.nativeEvent.submitter.value

//         if (submitButtonType === 'Remove Course') {
//             removeCourse(courseRestrictedOrFull.courseName)
//             return handleDialogClose()
//         }

//         let formCheckboxes = retrieveCheckboxFormData(e)

//         if (submitButtonType === 'Add Full and Restricted Classes') {
//             // Notice fnHelper used - selectAllSectionsForScheduleSolver
//             modifyAllSectionsSelectedForScheduleSolver(setCoursesInfo, courseRestrictedOrFull.courseName, selectAllSectionsForScheduleSolver, formCheckboxes)
//             return handleDialogClose()
//         }

//         if (submitButtonType === 'Add Restricted Classes') {
//             // Notice fnHelper used - selectSpecificRestrictedSectionsForScheduleSolver
//             modifyAllSectionsSelectedForScheduleSolver(setCoursesInfo, courseRestrictedOrFull.courseName, selectSpecificRestrictedSectionsForScheduleSolver, formCheckboxes)

//             return handleDialogClose()
//         }
//         alert('Dialog Error - Need to rename buttons')
//     }

//     const handleDialogClose = () => {
//         setCourseRestrictedOrFull({ full: false, restricted: false, courseName: '', restrictedSectionTypes: {} })
//     }

//     return (
//         <Dialog open={courseRestrictedOrFull.full && courseRestrictedOrFull.restricted}>
//             <form onSubmit={handleClassesInScheduleSolver}>
//                 <DialogTitle>
//                     All Classes for {courseRestrictedOrFull.courseName} are full. <br />
//                     <br /> Would you like to register in restricted classes?
//                 </DialogTitle>
//                 <DialogContent>
//                     <DialogContentText>
//                         Restricted Classes are reserved for students from specific faculities.
//                         <br />
//                         <br />
//                         Click on each class to see if you meet the critera. If you meet restricted criteria check off the class.
//                     </DialogContentText>
//                 </DialogContent>
//                 <RestrictedSectionsCheckBoxes restrictedSectionTypes={courseRestrictedOrFull.restrictedSectionTypes} />
//                 <DialogActions>
//                     <Button type="submit" value="Remove_Course" variant="contained" color={'error'}>
//                         Remove Course
//                     </Button>
//                     <Button type="submit" value="Add Full and Restricted Classes" variant="contained" color={'success'}>
//                         Add Full and Restricted Classes
//                     </Button>
//                     <Button type="submit" value="Add Restricted Classes" variant="contained" color={'success'}>
//                         Add Restricted Classes
//                     </Button>
//                 </DialogActions>
//             </form>
//         </Dialog>
//     )
// })
