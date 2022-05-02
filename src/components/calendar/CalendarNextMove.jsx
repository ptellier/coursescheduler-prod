import React from 'react'
import {useDrop} from "react-dnd";
import { timeToGridRow } from './CalendarConstants';

const CalendarNextMove = ({section, timeSlot}) => {

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "calendarTimeSlot",
        // function invokes whenever drops
        drop: (item) => {},
        collect: (monitor) => ({
          isOver: !!monitor.isOver(),
        }),
    }));

  return (
    <div className="outlined-cal-slot cal-slot"
         ref={drop}
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
  )
}

export default CalendarNextMove