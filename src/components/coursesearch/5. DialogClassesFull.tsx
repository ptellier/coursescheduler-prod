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
    const removeCourse = useRemoveCourse()
    const updateSectionsForSolver = useUpdateSectionsForSolver()

    const handleRemoveCourse = (e: any) => {
        e.preventDefault()
        removeCourse(courseRestrictedOrFull.courseName)
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
