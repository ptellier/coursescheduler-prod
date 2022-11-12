import {useContext, useEffect} from "react";
import {timeToGridRow} from "../CalendarConstants";
import {useDrag} from "react-dnd";
import { SectionsContext } from "../../../context/SectionsContext";
import ReportIcon from '@mui/icons-material/Report';
import { CourseColorContext } from "../../../context/CourseColorContext";


const CurrentTimeSlot = ({section, timeSlot, isInOverlapGroup}) => {
    const {showNextSections, hideNextSections} = useContext(SectionsContext);
    const {getColor, getBackgroundColor} = useContext(CourseColorContext)
    const courseName = section.subject + " " + section.course
    
    /**
     * EFFECTS: set isDragging to true when drag start
     *          invoke hideNextSections when drag ends
     * NOTE: 'item: section' passes this section to 
     *        the call sequence of drop function in
     *        NextTimeSlot.jsx file
     */
    const [{isDragging}, drag] = useDrag(() => ({
        type: "calendarTimeSlot",
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),            
        }),
        item: (monitor) => { 
            return section
        }, // this section is the section being moved from 
        end: () => {
            hideNextSections()
        }
    }));
    
    /**
     * EFFECTS: When drag starts, show next sections
     */
    useEffect(() => {
        isDragging && showNextSections(section);
    }, [isDragging])

    

    const provideStyle = () => {
        const gridStyle = {
            gridRow: timeToGridRow(timeSlot.start_time) + " / " 
                    + timeToGridRow(timeSlot.end_time),
            gridColumn:timeSlot.day,   
            color: getColor(courseName),
            backgroundColor: getBackgroundColor(courseName),
        }
        const overlapGroupStyle = {
            height: (timeSlot.end_time - timeSlot.start_time)
        }
        return isInOverlapGroup ? {...gridStyle, ...overlapGroupStyle} : gridStyle
    }
    

    return (
        <div className="solid-cal-slot cal-slot"
             ref={drag}
             style={provideStyle()}
        >   
            {isInOverlapGroup && <ReportIcon fontSize="small" />}
            <div>{section.subject}</div>
            <div>{section.course + " " + section.section}</div>
        </div>
    );
}

export default CurrentTimeSlot;
