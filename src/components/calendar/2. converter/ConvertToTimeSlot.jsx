import React from 'react'
import NextTimeSlot from '../3. timeslot/NextTimeSlot';
import CurrentTimeSlot from '../3. timeslot/CurrentTimeSlot'


/**
 * Combines given displayedSections and nextSections
 * then create timeslot objects
 * 
 * timeslot object = {
 * 
 * 
 * }
 * @param {*} param0 
 * @returns 
 */
const ConvertToTimeSlot = ({ section, isNextMove }) => {

  //Unique ID that separates one section to many by adding start and end time
  const findUniqueKey = (timeSlot) => {
    return section.id + timeSlot.day + timeSlot.start_time + timeSlot.end_time;
  }

  return (
    <>
    {isNextMove 
        ? section.schedule.map((timeSlot) =>  (
            <NextTimeSlot key={findUniqueKey(timeSlot)}
                              section={section} 
                              timeSlot={timeSlot}      
            />
        ))
        : section.schedule.map((timeSlot) =>  (
            <CurrentTimeSlot key={findUniqueKey(timeSlot)}
                              section={section}
                              timeSlot={timeSlot}
            />
        ))
    }
    </>
  )
}

export default ConvertToTimeSlot