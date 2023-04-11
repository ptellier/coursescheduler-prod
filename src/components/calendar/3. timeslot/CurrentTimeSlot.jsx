import {useContext, useEffect} from "react";
import {timeToGridRow} from "../CalendarConstants";
import {useDrag} from "react-dnd";
import { SectionsContext } from "../context/SectionsContext";
import { useTheme } from '@mui/material';
import ReportIcon from '@mui/icons-material/Report';


const CurrentTimeSlot = ({section, timeSlot, isInOverlapGroup}) => {
    // eslint-disable-next-line no-unused-vars
    const {showNextSections, hideNextSections, nextSections} = useContext(SectionsContext);
    const theme = useTheme();
    const backgroundColors = theme.palette.calendarTimeSlotBackgroundColors;
    const textColors = theme.palette.calendarTimeSlotTextColors;

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
        // eslint-disable-next-line
    }, [isDragging])

    

    const provideStyle = () => {
        const gridStyle = {
            gridRow: timeToGridRow(timeSlot.start_time) + " / " 
                    + timeToGridRow(timeSlot.end_time),
            gridColumn:timeSlot.day,   
            color: textColors[timeSlot.colorIndex],
            backgroundColor: backgroundColors[timeSlot.colorIndex],
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
            {isInOverlapGroup && <ReportIcon />}
            <div>{section.subject}</div>
            <div>{section.course + " " + section.section}</div>
        </div>
    );
}

export default CurrentTimeSlot;
