import React, { useContext, useEffect } from 'react'
import {useDrop} from "react-dnd";
import { timeToGridRow } from './CalendarConstants';
import { NextMoveContext } from './NextMoveContext';

const CalendarNextMove = ({ section, timeSlot, handleDrop }) => {

    const {focusedNextMove, focusNextMove, blurNextMove} = useContext(NextMoveContext);

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "calendarTimeSlot",
        drop: (item) => {
          // parse from and to sections 
          //       then invoke handleDrop(from, to)
          const from = item
          const to = section
          handleDrop(from, to)
        }, 
        collect: (monitor) => ({
          isOver:  monitor.isOver(),
        }),
        hover: () => {
            focusNextMove(section)
        }
    }));


    /**
     * EFFECTS: blur (uncolor) the user moves the mouse away from this next move
     *          as a result, ensure all the next moves get uncolored
     */
    useEffect(() => {
      !isOver && blurNextMove();
    }, [isOver])

    /**
     * EFFECTS: Check if the Calendar timeslot being hovered over is of 
     *          the same course section as this Calendar timeslot
     * @returns {boolean}
     */
    function isHoverTheSameSection() {
      return (section.id === focusedNextMove.id );
    }

    
  return (
    <div className="outlined-cal-slot cal-slot"
         ref={drop}
         style={{
            gridRow: timeToGridRow(timeSlot.start_time) 
                   + " / " 
                   + timeToGridRow(timeSlot.end_time),
            gridColumn:timeSlot.day,
            backgroundColor: isHoverTheSameSection() && "purple"
         }}
    >
        <div>{section.subject}</div>
        <div>{section.course + " " + section.section}</div>
    </div>
  )
}

export default CalendarNextMove