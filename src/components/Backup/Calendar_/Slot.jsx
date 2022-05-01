import React from 'react'

const Slot = ({ section }) => {

/**
 * provides grid column and row location of a slot
 * gridColumn <- ...
 * gridRow <- ...
 */
 const gridStyle = {
     gridColumn: section.schedule[0].day,
     gridRow: "5 / 7",   
 }

 const colorStyle = {
    backgroundColor: "rgba(191,234,255,0.5)"
 }


 //MODIFIES: time
 //EFFECTS: convert given time, e.g 540, to string time.
 //         note the time is in military time spanning to 24
 const convertMinToStringHours = (time) => {
    // 600 / 60 => 10. => "10:00"
    // 630 / 60 => 10.5  => "10:30"

    // Quotient yields hour
    // Remainder yeilds 0.5 -> 30
    let hour = time / 60
    hour.toString();

 }

 function TimeToRowNumber(timeString) {
     const stringArr = timeString.split(":");
     const numToAdd = stringArr[1] == "30" ? 1 : 0;
     return stringArr[0].valueOf() * 2 + numToAdd + 1;
 }

/**
 * returns a number corresponding to the desired grid row for the 
 * React Calendar Component when given time (minutes from midnight)
 * @param {Time} time
 * @returns {number}
 */
function timeToGridRow(time) {
    return time/30-13;
}

 //const Draggable

 //const Droppable

  return (
    <div id="1" 
         className="solid-cal-slot cal-slot"
         style={{ ...gridStyle, ...colorStyle }}>
        {section.name}
    </div>
  )
}

export default Slot