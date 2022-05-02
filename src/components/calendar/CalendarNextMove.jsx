import React from 'react'
import {useDrop} from "react-dnd";
import { timeToGridRow } from './CalendarConstants';

const CalendarNextMove = ({ section, timeSlot, current }) => {

    const [{ isOver, canDrop }, drop] = useDrop(() => ({
        accept: "calendarTimeSlot",

        //EFFECTS: produce true if section.id matches currentHoverId
        canDrop: (item) => {
            // console.log("Dragging: ", item, "To: ", section.id)
            return section.id === current.currentHover
        },
        drop: (item) => {},
        collect: (monitor) => ({
          isOver:  monitor.isOver(),
          canDrop: monitor.canDrop(),
        }),
        hover: (item, monitor) => {
            current.setCurrentHover(section.id)
        }
    }));

    //Check if the Calendar timeslot being hovered over is of the same course section as this Calendar timeslot
    function isHoverTheSameSection() {
      return (section.id === current.currentHover );
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