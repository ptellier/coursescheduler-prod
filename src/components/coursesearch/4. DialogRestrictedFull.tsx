import { Button, Typography } from '@mui/material'
import React, { memo, useMemo, useState, Dispatch, SetStateAction } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { tCoursesInfo, tSectionTypes } from '../../data/DataDefinition/CourseInfoDD'
import {} from '../../data/DataDefinition/CourseInfoDD'

import { tCourseInfo, tCourseRestrictedOrFullProps } from '../../data/DataDefinition/CourseInfoDD'
import { Section } from '../../data/DataDefinition/SectionDD'
import { useCoursesInfoSetState } from '../../context/CoursesInfoContext'

type DialogRestrictedClassesAvailableProps = {
    courseRestrictedOrFull: tCourseRestrictedOrFullProps
    setCourseRestrictedOrFull: React.Dispatch<React.SetStateAction<tCourseRestrictedOrFullProps>>
}

// eg. {"CPSC 110 L1J": {selectedForScheduleSolver: true}, "CPSC 110 L1K": {selectedForScheduleSolver: false}....}
type FormInputData = {
    [key: string]: { selectedForScheduleSolver: boolean }
}

export const DialogRestrictedClassesAvailable = memo(({ courseRestrictedOrFull, setCourseRestrictedOrFull }: DialogRestrictedClassesAvailableProps) => {
    const setCoursesInfo = useCoursesInfoSetState()
    const handlClassesInScheduleSolver = (e: any) => {
        e.preventDefault()

        const submitButtonType = e.nativeEvent.submitter.value
        console.log('submitButtonType', submitButtonType)
        if (submitButtonType === "Don't Add Restricted Classes") {
            return handleDialogClose()
        }

        if (submitButtonType === 'Add Restricted Classes') {
            let formCheckboxes = retrieveCheckboxFormData(e)
            modifyAllCourseSelectedForScheduleSolver(setCoursesInfo, courseRestrictedOrFull.courseName, selectSpecificRestrictedSectionsForScheduleSolver, formCheckboxes)
            return handleDialogClose()
        }
        alert('Dialog Error - Need to rename buttons')
    }

    const handleDialogClose = () => {
        setCourseRestrictedOrFull({ full: false, restricted: false, courseName: '', restrictedSectionTypes: {} })
    }

    return (
        <Dialog open={courseRestrictedOrFull.restricted}>
            <form onSubmit={handlClassesInScheduleSolver}>
                <DialogTitle>Would you like to include {courseRestrictedOrFull.courseName} restricted classes?</DialogTitle>
                <DialogContent>
                    <DialogContentText>There are additional classes of {courseRestrictedOrFull.courseName} that you may qualify for. Check off the classes that you qualify for.</DialogContentText>
                </DialogContent>
                <RestrictedSectionsCheckBoxes restrictedSectionTypes={courseRestrictedOrFull.restrictedSectionTypes} />
                <DialogActions>
                    <Button type="submit" value="Don't Add Restricted Classes" variant="contained" color={'error'}>
                        Don't Add Restricted Classes
                    </Button>
                    <Button type="submit" value="Add Restricted Classes" variant="contained" color={'success'}>
                        Add Restricted Classes
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
})

export const DialogClassesFullAndRestrictedAvailable = memo(({ courseRestrictedOrFull, setCourseRestrictedOrFull }: DialogRestrictedClassesAvailableProps) => {
    const setCoursesInfo = useCoursesInfoSetState()
    const handleClassesInScheduleSolver = (e: any) => {
        e.preventDefault()

        const submitButtonType = e.nativeEvent.submitter.value
        console.log('submitButtonType', submitButtonType)
        if (submitButtonType === 'Remove Course') {
            //To Do remove Course
            return handleDialogClose()
        }

        let formCheckboxes = retrieveCheckboxFormData(e)

        if (submitButtonType === 'Add Full and Restricted Classes') {
            modifyAllCourseSelectedForScheduleSolver(setCoursesInfo, courseRestrictedOrFull.courseName, selectAllSectionsForScheduleSolver, formCheckboxes)
            return handleDialogClose()
        }

        if (submitButtonType === 'Add Restricted Classes') {
            modifyAllCourseSelectedForScheduleSolver(setCoursesInfo, courseRestrictedOrFull.courseName, selectSpecificRestrictedSectionsForScheduleSolver, formCheckboxes)
            return handleDialogClose()
        }
        alert('Dialog Error - Need to rename buttons')
    }

    const handleDialogClose = () => {
        setCourseRestrictedOrFull({ full: false, restricted: false, courseName: '', restrictedSectionTypes: {} })
    }

    return (
        <Dialog open={courseRestrictedOrFull.full && courseRestrictedOrFull.restricted}>
            <form onSubmit={handleClassesInScheduleSolver}>
                <DialogTitle>Regular Classes are Full. Would you like to include {courseRestrictedOrFull.courseName} restricted classes?</DialogTitle>
                <DialogContent>
                    <DialogContentText>There are additional classes of {courseRestrictedOrFull.courseName} that you may qualify for. Check off the classes that you qualify for.</DialogContentText>
                </DialogContent>
                <RestrictedSectionsCheckBoxes restrictedSectionTypes={courseRestrictedOrFull.restrictedSectionTypes} />
                <DialogActions>
                    <Button type="submit" value="Remove_Course" variant="contained" color={'error'}>
                        Remove Course
                    </Button>
                    <Button type="submit" value="Add Full and Restricted Classes" variant="contained" color={'success'}>
                        Add Full and Restricted Classes
                    </Button>
                    <Button type="submit" value="Add Restricted Classes" variant="contained" color={'success'}>
                        Add Restricted Classes
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
})

export const DialogClassesFull = memo(({ courseRestrictedOrFull, setCourseRestrictedOrFull }: DialogRestrictedClassesAvailableProps) => {
    const setCoursesInfo = useCoursesInfoSetState()
    const handleRemoveCourse = (e: any) => {
        e.preventDefault()
        // To Do remove Course
        handleDialogClose()
    }

    const handleAddAllClassesToScheduleSolver = (e: any) => {
        e.preventDefault()
        modifyAllCourseSelectedForScheduleSolver(setCoursesInfo, courseRestrictedOrFull.courseName, selectAllSectionsForScheduleSolver, '')
        handleDialogClose()
    }

    const handleDialogClose = () => {
        setCourseRestrictedOrFull({ full: false, restricted: false, courseName: '', restrictedSectionTypes: {} })
    }

    return (
        <Dialog open={courseRestrictedOrFull.full && !courseRestrictedOrFull.restricted}>
            <DialogTitle>All Classes for {courseRestrictedOrFull.courseName} are Full</DialogTitle>
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

// Create Hashmap of restricted sections and their checkboxes
// {"CPSC 110 L1J": {selectedForScheduleSolver: true}, "CPSC 110 L1K": {selectedForScheduleSolver: false}....}
const retrieveCheckboxFormData = (e: any) => {
    // See if checkbox for section was checked
    let formCheckboxes: FormInputData = {}
    for (let i = 0; i < e.target.length; i++) {
        if (e.target[i].nodeName === 'INPUT') {
            const name = e.target[i].name
            const checked = e.target[i].checked
            formCheckboxes[name] = { selectedForScheduleSolver: checked }
        }
    }
    return formCheckboxes
}

// Creates a Scrollable List of Restricted Sections
// Each restricted section has a checkbox for the user to determine if they want to include it in their schedule
const RestrictedSectionsCheckBoxes = ({ restrictedSectionTypes }: { restrictedSectionTypes: tSectionTypes }) => {
    return (
        <div style={{ height: 200, overflow: 'auto', marginInline: '10%', marginBottom: 20, paddingInline: 10, paddingBottom: 20, border: '1px solid grey' }}>
            {Object.entries(restrictedSectionTypes).map(([courseActivity, sections]) => {
                return (
                    <>
                        <Typography variant="subtitle1">{courseActivity}</Typography>
                        {sections.map((section) => {
                            return (
                                <div className="flex-row">
                                    <input type="checkbox" defaultChecked={true} id={courseActivity} name={section.name} />
                                    <Typography style={{ paddingLeft: 10 }} variant="body2">
                                        {section.name}
                                    </Typography>
                                </div>
                            )
                        })}
                    </>
                )
            })}
        </div>
    )
}

// Helper Function - Modify State
// Selects Restricted Sections
const selectSpecificRestrictedSectionsForScheduleSolver = (section: Section, _: any) => {
    return { ...section, selectedForScheduleSolver: true }
}

// Helper Function - Modify State
// Selects All Sections
const selectAllSectionsForScheduleSolver = (section: Section, data: any) => {
    const formInputDataObject: FormInputData = data
    // if restricted section was selected in FormInputData then modify selectedForScheduleSolver: boolean
    return formInputDataObject[section.name] ? ({ ...section, selectedForScheduleSolver: formInputDataObject[section.name].selectedForScheduleSolver } as Section) : section
}

// Main Function - Modify State
// Modify All Sections of a Course to be selectedForScheduleSolver
const modifyAllCourseSelectedForScheduleSolver = (setCoursesInfo: Dispatch<SetStateAction<tCoursesInfo>>, courseName: string, fnCreateNewSction: (section: Section, fnData: any) => Section, fnData: any) => {
    // Modify If section is "selectedForScheduleSolver"
    setCoursesInfo((coursesInfo) => {
        // Get Current Course
        const index = coursesInfo.courses.findIndex((course) => course.courseName === courseName)
        let currentCourse = coursesInfo.courses[index]

        // tSectionTypes == {"Lectures": Sections[] , "Labs": Sections, ...}
        let newSectionTypes: tSectionTypes = {}

        // iterate: --- ["Lectures" , Sections[]] --- ["Labs" , Sections[]] ....
        Object.entries(currentCourse.courseSections).map(([courseActivity, sections]) => {
            const newSections = sections.map((section) => {
                // If section was modified in Input Data -> Modify State
                const newSection = fnCreateNewSction(section, fnData)
                return newSection
            })
            // recreate this object {"Lectures": Sections[] , "Labs": Sections, ...}
            newSectionTypes[courseActivity] = newSections
        })
        let newCourse = { ...currentCourse, courseSections: newSectionTypes }

        // Filter Out Current course from coursesInfo
        let oldCourses = coursesInfo.courses.filter((course) => course.courseName !== courseName)

        return { ...coursesInfo, courses: [...oldCourses, newCourse] }
    })
}
//XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// Remove Course Button

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
