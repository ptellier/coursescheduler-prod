import { useState, createContext } from 'react'
import { red, pink, green, lime, lightGreen, lightBlue, grey, purple, yellow, orange, brown, teal, deepOrange } from '@mui/material/colors';
import { useColorScheme } from '@mui/material';

export const CourseColorContext = createContext();

// let colors = [red[900], lightBlue[900], green[900], purple[900], orange[900], brown[900], teal[900]]
// let backgroundColors = [red[100], lightBlue[100], green[100], purple[100], orange[100], brown[100], teal[100]]

let availableColors = [
    {colorName : "teal" , "color":teal[900], "backgroundColor":teal[100]},
    {colorName : "brown" , "color":brown[900], "backgroundColor":brown[100]},
    {colorName : "orange" , "color":orange[900], "backgroundColor":orange[100]},
    {colorName : "purple" , "color":purple[900], "backgroundColor":purple[100]},
    {colorName : "green" , "color":green[900], "backgroundColor":green[100]},
    {colorName : "lightBlue" , "color":lightBlue[900], "backgroundColor":lightBlue[100]},
    {colorName : "red" , "color":red[900], "backgroundColor":red[100]},
 ]

let usedColors = []

export const CourseColorProvider = (props) => {

    const [courseColors, setCourseColors] = useState({})
    // const [usedColors, setUsedColors] = useState([])

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
            // remove color from usedColors
            // setUsedColors(usedColors => 
            //     usedColors.filter(color => 
            //         color.colorName !== removedColor.colorName)
            // )
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