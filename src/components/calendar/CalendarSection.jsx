import React from 'react'
import CalendarNextMove from './CalendarNextMove';
import CalendarTimeSlot from './CalendarTimeSlot'

const CalendarSection = ({ section, isNextMove, handleDrop }) => {

  //Unique ID that separates one section to many by adding start and end time
  const findUniqueKey = (timeSlot) => {
    return section.id + timeSlot.day + timeSlot.start_time + timeSlot.end_time;
  }

  return (
    <>
    {isNextMove 
        ? section.schedule.map((timeSlot) =>  (
            <CalendarNextMove key={findUniqueKey(timeSlot)}
                              section={section} 
                              timeSlot={timeSlot}
                              handleDrop={handleDrop}       
            />
        ))
        : section.schedule.map((timeSlot) =>  (
            <CalendarTimeSlot key={findUniqueKey(timeSlot)}
                              section={section}
                              timeSlot={timeSlot}
            />
        ))
    }
    </>
  )
}

export default CalendarSection