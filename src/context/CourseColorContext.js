import { useState, createContext } from 'react'
import { red, pink, green, lime, lightGreen, lightBlue, grey, purple, yellow, orange, brown, teal, deepOrange } from '@mui/material/colors';

export const CourseColorContext = createContext();

const colors = [red[900], lightBlue[900], green[900], purple[900], orange[900], brown[900], teal[900]]
const backgroundColors = [red[100], lightBlue[100], green[100], purple[100], orange[100], brown[100], teal[100]]

export const CourseColorProvider = (props) => {

    const [courseColors, setCourseColors] = useState({})
    const [n, setN] = useState(0)

    const addCourseColor = (courseName) => {
        let addingCourseColor = {}
        addingCourseColor[courseName] = {"color":colors[n], "backgroundColor":backgroundColors[n]}
        setCourseColors(courseColors => ({
            ...courseColors,
            ...addingCourseColor
        }))
        setN(n + 1)
    }

    const removeCourseColor = (courseName) => {  
        if (courseName in courseColors) {
            let copiedCourseColors = {...courseColors}
            delete copiedCourseColors[courseName]
            setCourseColors(courseColors => ({
                ...copiedCourseColors,
            }))
            setN(n - 1)
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