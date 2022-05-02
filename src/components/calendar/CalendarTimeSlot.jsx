import {useEffect} from "react";
import {timeToGridRow} from "./CalendarConstants";
import {useDrag} from "react-dnd";


const CalendarTimeSlot = ({section, timeSlot, showNextMoves}) => {

    const [{isDragging}, drag] = useDrag(() => ({
        type: "calendarTimeSlot",
        item: { draggableId: section.id },
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),            
        }),
        end: (item, monitor) => {
            // Cancel this drag if invalid drop
            console.log("User Stopped Drag", item)
        }
    }));
    
    useEffect(() => {
      // Show next moves
      isDragging && showNextMoves(section);
    }, [isDragging])
    

    return (
        <div className="solid-cal-slot cal-slot"
                ref={drag}
                style={{
                    gridRow: timeToGridRow(timeSlot.start_time) 
                    + " / " 
                    + timeToGridRow(timeSlot.end_time),
                    gridColumn:timeSlot.day
                }}
        >
            <div>{section.subject}</div>
            <div>{section.course + " " + section.section}</div>
        </div>
    );
}

export default CalendarTimeSlot;
