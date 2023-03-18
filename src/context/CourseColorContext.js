import { useState, createContext } from 'react'
import { red, pink, green, lime, lightBlue, grey, purple, yellow, orange, brown, teal, deepOrange } from '@mui/material/colors';

export const CourseColorContext = createContext();

let availableColors = [
    {colorName : "pink" , "color":pink[900], "backgroundColor":pink[100]},
    {colorName : "lime" , "color":lime[900], "backgroundColor":lime[100]},
    {colorName : "grey" , "color":grey[900], "backgroundColor":grey[100]},
    {colorName : "deepOrange" , "color":deepOrange[900], "backgroundColor":deepOrange[100]},
    {colorName : "yellow" , "color":yellow[900], "backgroundColor":yellow[100]},
    {colorName : "teal" , "color":teal[900], "backgroundColor":teal[100]},
    {colorName : "brown" , "color":brown[900], "backgroundColor":brown[100]},
    {colorName : "orange" , "color":orange[900], "backgroundColor":orange[100]},
    {colorName : "purple" , "color":purple[900], "backgroundColor":purple[100]},
    {colorName : "green" , "color":green[900], "backgroundColor":green[100]},
    {colorName : "lightBlue" , "color":lightBlue[900], "backgroundColor":lightBlue[100]},
 ]

let usedColors = []

export const CourseColorProvider = (props) => {

    const [courseColors, setCourseColors] = useState({})

    const addCourseColor = (courseName) => {
        let addingCourseColor = {}
        const color = availableColors.pop()
        usedColors.push(color)
        addingCourseColor[courseName] = color
        setCourseColors(courseColors => ({
            ...courseColors,
            ...addingCourseColor
        }))
    }

    const removeCourseColor = (courseName) => {  
        if (courseName in courseColors) {
            const removedColor = courseColors[courseName]
            usedColors = usedColors.filter(usedColor => 
                usedColor.colorName !== removedColor.colorName
            )
            // push the removed color to availableColors
            availableColors.push(removedColor)
            // amend hashmap
            let copiedCourseColors = {...courseColors}
            delete copiedCourseColors[courseName]
            setCourseColors(courseColors => ({
                ...copiedCourseColors,
            }))
        }
    }

    const getColor = (courseName) => {
        const item = courseColors[courseName]
        return item["color"]
    }

    const getBackgroundColor = (courseName) => {
        const item = courseColors[courseName]
        return item["backgroundColor"]
    }

    return (
        <CourseColorContext.Provider value={{
            courseColors: courseColors,
            addCourseColor: addCourseColor,
            removeCourseColor: removeCourseColor,
            getColor:getColor,
            getBackgroundColor:getBackgroundColor
        }} >
            {props.children}
        </CourseColorContext.Provider>
    )
}