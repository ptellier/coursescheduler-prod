import {useContext, useEffect} from "react";
import {timeToGridRow} from "../CalendarConstants";
import {useDrag} from "react-dnd";
import { NextMoveContext } from "../context/NextMoveContext";


const CurrentTimeSlot = ({section, timeSlot}) => {
    const {showNextMoves, hideNextMoves} = useContext(NextMoveContext);

    /**
     * EFFECTS: set isDragging to true when drag start
     *          invoke hideNextMoves when drag ends
     * NOTE: 'item: section' passes this section to 
     *        the call sequence of drop function in
     *        CalendarNextMove.jsx file
     */
    const [{isDragging}, drag] = useDrag(() => ({
        type: "calendarTimeSlot",
        item: section, // this section is the section being moved from 
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),            
        }),
        end: () => hideNextMoves()
    }));
    
    /**
     * EFFECTS: When drag starts, show next moves
     */
    useEffect(() => {
      isDragging && showNextMoves(section);
    }, [isDragging])
    

    return (
        <div className="solid-cal-slot cal-slot"
                ref={drag}
                style={{
                    gridRow: timeToGridRow(timeSlot.start_time) 
                    + " / " 
                    + timeToGridRow(timeSlot.end_time),
                    gridColumn:timeSlot.day,
                }}
        >
            <div>{section.subject}</div>
            <div>{section.course + " " + section.section}</div>
        </div>
    );
}

export default CurrentTimeSlot;
