import * as React from "react";
import {timeToGridRow} from "./CalendarConstants";
// import {useDrag} from "react-dnd";


const CalendarSlot = ({section}) => {
    // const [{isDragging}, drag] = useDrag(() => ({
    //     type: "calendarSlot",
    //     collect: monitor => ({
    //         isDragging: !!monitor.isDragging(),
    //     }),
    // }));


    return section.schedule.map((timeSlot) => {
        return (
            <div className="solid-cal-slot cal-slot"
                 // ref={drag}
                 style={{
                     gridRow: timeToGridRow(timeSlot.start_time) + " / " + timeToGridRow(timeSlot.end_time),
                     gridColumn:timeSlot.day}}
            >
                <div>{section.subject}</div>
                <div>{section.course + " " + section.section}</div>
            </div>
        );
    });
}

export default CalendarSlot;
