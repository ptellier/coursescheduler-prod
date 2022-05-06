import React, { useContext, useEffect } from 'react'
import {useDrop} from "react-dnd";
import { timeToGridRow } from '../CalendarConstants';
import { SectionsContext } from '../context/SectionsContext';

const NextTimeSlot = ({ section, timeSlot }) => {

    const {focusedNextSection, focusNextSection, blurNextSection} = useContext(SectionsContext);
    const {currentSections, setCurrentSections} = useContext(SectionsContext);
    

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "calendarTimeSlot",
        drop: (item) => {
          // parse from and to sections 
          // then invoke handleDrop(from, to)
          const from = item
          const to = section
          handleDrop(from, to)
        }, 
        collect: (monitor) => ({
          isOver:  monitor.isOver(),
        }),
        hover: () => {
          focusNextSection(section)
        }
    }));

    /**
     * EFFECTS: blur (uncolor) the available next sections when user moves the mouse away 
     *          from this next section. As a result, ensure all the next sections get uncolored
     */
    useEffect(() => {
      !isOver && blurNextSection();
    }, [isOver])

    /**
     * TODO: fix the specification V
     * EFFECTS: produce true if the section being hovered by user is
     *          the same section as this section
     * @returns {boolean}
     */
    function isHoverTheSameSection() {
      return (section.id === focusedNextSection.id);
    }

    /**
     * MODIFIES: currentSections
     * EFFECTS: filter 'from' and insert 'to' in currentSections
     */
     const handleDrop = (from, to) => {
          const filtered = currentSections.filter(section => section.id !== from.id)
          const inserted = [...filtered, to]
          setCurrentSections(inserted)
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

export default NextTimeSlot