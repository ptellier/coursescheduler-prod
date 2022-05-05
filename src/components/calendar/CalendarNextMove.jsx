import React, { useContext, useEffect } from 'react'
import {useDrop} from "react-dnd";
import { timeToGridRow } from './CalendarConstants';
import { NextMoveContext } from './NextMoveContext';
import { TimeSlotContext } from './TimeSlotContext';

const CalendarNextMove = ({ section, timeSlot }) => {

    const {focusedNextMove, focusNextMove, blurNextMove} = useContext(NextMoveContext);
    const {displayedSections, setDisplayedSections} = useContext(TimeSlotContext)

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

    /**
     * TODO: move this function to drop context + rename it better
     * MODIFIES: displayedSections
     * EFFECTS: filter 'from' and insert 'to' in displayedSections
     */
         const handleDrop = (from, to) => {
          const filtered = displayedSections.filter(section => section.id !== from.id)
          const inserted = [...filtered, to]
          setDisplayedSections(inserted)
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