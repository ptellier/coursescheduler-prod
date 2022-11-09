import { useState, createContext } from 'react'
import { red, pink, green, lime, lightGreen, lightBlue, grey, purple, yellow, orange, brown, teal, deepOrange } from '@mui/material/colors';

export const CourseColorContext = createContext();

let colors = [red[900], lightBlue[900], green[900], purple[900], orange[900], brown[900], teal[900]]
let backgroundColors = [red[100], lightBlue[100], green[100], purple[100], orange[100], brown[100], teal[100]]

let availableColors = [
    {"color":red[900], "backgroundColor":red[100]},
    {"color":lightBlue[900], "backgroundColor":lightBlue[100]},
    {"color":green[900], "backgroundColor":green[100]},
    {"color":purple[900], "backgroundColor":purple[100]},
    {"color":orange[900], "backgroundColor":orange[100]},
    {"color":brown[900], "backgroundColor":brown[100]},
    {"color":teal[900], "backgroundColor":teal[100]},
 ]
let usedColors = []

export const CourseColorProvider = (props) => {

    const [courseColors, setCourseColors] = useState({})

    const addCourseColor = (courseName) => {
        let addingCourseColor = {}
        const c = availableColors.pop()
        usedColors.push(c)
        addingCourseColor[courseName] = c
        setCourseColors(courseColors => ({
            ...courseColors,
            ...addingCourseColor
        }))
        // setN(n + 1)
    }

    const removeCourseColor = (courseName) => {  
        if (courseName in courseColors) {
            const c = usedColors.pop()
            availableColors.push(c)
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