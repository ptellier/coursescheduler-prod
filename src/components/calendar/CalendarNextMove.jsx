import React from 'react'
import {useDrop} from "react-dnd";
import { timeToGridRow } from './CalendarConstants';

const CalendarNextMove = ({ section, timeSlot }) => {

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: "calendarTimeSlot",
        canDrop: (item) => {
            console.log("Dragging: ", item, "To: ", section.id)
            // section.id === currentHoverId
            return section.id === section.id
        },
        drop: (item) => {},
        collect: (monitor) => ({
          isOver:  monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
        hover: (item, monitor) => {
            // console.log("from:",item.draggableId, "to: ", section.id)
            console.log("Current: ", section.id)
        }
    }));


  return (
    <div className="outlined-cal-slot cal-slot"
         ref={drop}
         style={{
            gridRow: timeToGridRow(timeSlot.start_time) 
                   + " / " 
                   + timeToGridRow(timeSlot.end_time),
            gridColumn:timeSlot.day,
            backgroundColor: (canDrop) && "purple"
         }}
    >
        <div>{section.subject}</div>
        <div>{section.course + " " + section.section}</div>
    </div>
  )
}

export default CalendarNextMove