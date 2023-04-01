import { Button, Typography } from '@mui/material'
import React, { memo } from 'react'
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { tCourseRestrictedOrFullProps } from '../../data/DataDefinition/CourseInfoDD'
import { Section } from '../../data/DataDefinition/SectionDD'
import { selectSpecificRestrictedSectionsForScheduleSolver, useUpdateSectionsForSolver } from './hooks/useUpdateSectionsForSolver/useUpdateSectionsForSolver'

type DialogRestrictedClassesAvailableProps = {
    courseRestrictedOrFull: tCourseRestrictedOrFullProps
    setCourseRestrictedOrFull: React.Dispatch<React.SetStateAction<tCourseRestrictedOrFullProps>>
}

// eg. {"CPSC 110 L1J": {selectedForScheduleSolver: true}, "CPSC 110 L1K": {selectedForScheduleSolver: false}....}
export type FormCheckBoxData = {
    [key: string]: { selectedForScheduleSolver: boolean }
}

export const DialogRestrictedClassesAvailable = memo(({ courseRestrictedOrFull, setCourseRestrictedOrFull }: DialogRestrictedClassesAvailableProps) => {
    const updateSectionsForSolver = useUpdateSectionsForSolver()

    const handlClassesInScheduleSolver = (e: any) => {
        e.preventDefault()

        const submitButtonType = e.nativeEvent.submitter.value
        let isClassFull = courseRestrictedOrFull.full

        if (submitButtonType === 'Add Restricted Classes') {
            let formCheckboxes = retrieveCheckboxFormData(e)
            // Notice fnHelper used - selectSpecificRestrictedSectionsForScheduleSolver
            isClassFull = updateSectionsForSolver({
                courseName: courseRestrictedOrFull.courseName,
                fnCreateNewSection: selectSpecificRestrictedSectionsForScheduleSolver,
                fnData: formCheckboxes,
            })
        }

        // If 0 lectures selected => Open DialogClassesFull.tsx
        if (isClassFull) {
            return handleOpenDialogClassesFull()
        }
        return handleDialogClose()
    }

    const handleDialogClose = () => {
        setCourseRestrictedOrFull({ full: false, restricted: false, courseName: '', restrictedSectionTypes: {} })
    }

    const handleOpenDialogClassesFull = () => {
        setCourseRestrictedOrFull((courseRestrictedOrFull) => ({ ...courseRestrictedOrFull, full: true, restricted: false }))
    }

    const restrictedSectionTypes = courseRestrictedOrFull.restrictedSectionTypes

    return (
        <Dialog open={courseRestrictedOrFull.restricted}>
            <form onSubmit={handlClassesInScheduleSolver}>
                <DialogTitle>Add {courseRestrictedOrFull.courseName} restricted classes?</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Restricted Classes are reserved for students from specific programs.
                        <br />
                        <br />
                        Click on each class to see if you meet the restricted criteria.
                    </DialogContentText>
                </DialogContent>
                {/* Creates a Scrollable List of Restricted Sections */}
                <div style={{ maxHeight: 150, overflow: 'auto', marginInline: '10%', marginBottom: 20, paddingInline: 10, paddingBottom: 20, border: '1px solid grey' }}>
                    {/* 1. Show Restricted Lecture */}
                    {restrictedSectionTypes !== undefined && restrictedSectionTypes['Lecture'] && restrictedSectionTypes['Lecture'].length > 0 && <RestrictedRows courseActivity={'Lecture'} sections={restrictedSectionTypes['Lecture']} />}
                    {Object.entries(restrictedSectionTypes).map(([courseActivity, sections], index) => {
                        // 2. Show Restricted Other Activity Types eg. Labs, Tutorial, etc.
                        if (courseActivity !== 'Lecture') return <RestrictedRows key={courseActivity + index} courseActivity={courseActivity} sections={sections} />
                        return null
                    })}
                </div>
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

// Each restricted section has a checkbox for the user to determine if they want to include it in their schedule
const RestrictedRows = ({ courseActivity, sections }: { courseActivity: string; sections: Section[] }) => {
    return (
        <>
            <Typography variant="subtitle1">{courseActivity}</Typography>
            {sections.map((section, index) => {
                return (
                    <div key={courseActivity + section.name + index} className="flex-row">
                        <input type="checkbox" defaultChecked={true} id={courseActivity} name={section.name} />
                        <Typography style={{ paddingLeft: 10 }} variant="body2">
                            {/* TODO: Need API to send Proper Link */}
                            <a href="www.google.com">{section.name}</a>
                        </Typography>
                    </div>
                )
            })}
        </>
    )
}

// Create Hashmap of restricted sections and their checkboxes
// {"CPSC 110 L1J": {selectedForScheduleSolver: true}, "CPSC 110 L1K": {selectedForScheduleSolver: false}....}
const retrieveCheckboxFormData = (e: any) => {
    // See if checkbox for section was checked
    let formCheckboxes: FormCheckBoxData = {}
    for (let i = 0; i < e.target.length; i++) {
        if (e.target[i].nodeName === 'INPUT') {
            const name = e.target[i].name
            const checked = e.target[i].checked
            formCheckboxes[name] = { selectedForScheduleSolver: checked }
        }
    }
    return formCheckboxes
}
