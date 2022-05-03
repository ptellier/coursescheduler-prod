import React, { useEffect } from 'react'
import {useDrop} from "react-dnd";
import { timeToGridRow } from './CalendarConstants';

const CalendarNextMove = ({ section, timeSlot, current, handler }) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "calendarTimeSlot",
        drop: (item) => handler, // TODO
        collect: (monitor) => ({
          isOver:  monitor.isOver(),
        }),
        hover: (monitor) => {
            // sets currentHover to thiscurrently hovered next move's id
            current.setCurrentHover(section.id)
        }
    }));

    //Check if the Calendar timeslot being hovered over is of 
    // the same course section as this Calendar timeslot
    function isHoverTheSameSection() {
      return (section.id === current.currentHover );
    }

    //Resets currently hovering's id to nothing
    //this ensures all the next moves get uncolored
    //when user takes off his mouse away from a next move
    useEffect(() => {
        !isOver && current.setCurrentHover("")
    }, [isOver])
    
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