import * as React from "react";
import {timeToGridRow} from "./CalendarConstants";



// Gonna be Droppable === next available
const CalendarSlotOutline = ({section}) => {
    return section.schedule.map((timeSlot) => {
        return (

            //Next courses/moves information
            <div className="outlined-cal-slot cal-slot"
                 style={{
                     gridRow: timeToGridRow(timeSlot.start_time) + " / " + timeToGridRow(timeSlot.end_time),
                     gridColumn:timeSlot.day}}
            >
                <div>{section.subject}</div>
                <div>{section.course}</div>
            </div>
        );
    });
}

export default CalendarSlotOutline;