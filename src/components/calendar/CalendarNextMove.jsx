import React, { useEffect } from 'react'
import {useDrop} from "react-dnd";
import { timeToGridRow } from './CalendarConstants';

const CalendarNextMove = ({ section, timeSlot, current }) => {

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: "calendarTimeSlot",
        drop: (item) => {},
        collect: (monitor) => ({
          isOver:  monitor.isOver(),
        }),
        hover: (item, monitor) => {
            // sets currentHover to thiscurrently hovered next move's id
            if (monitor.isOver) {
                current.setCurrentHover(section.id)
            }
        }
    }), [current.currentHover]);

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
            backgroundColor: (section.id === current.currentHover) && "purple"
         }}
    >
        <div>{section.subject}</div>
        <div>{section.course + " " + section.section}</div>
    </div>
  )
}

export default CalendarNextMove