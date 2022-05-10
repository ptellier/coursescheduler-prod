import React from 'react'

const useSortTimeSlots = () => {
    /**
     * EFFECTS: sort given timeslots based start time
     * @param {TimeSlot[]} timeSlots
     * @returns {TimeSlot[]}
     */
    const sortTimeSlotsByStartTime = (timeSlots) => {
        return timeSlots.sort((t1, t2) => (t1.start_time > t2.start_time ? 1 : -1));
    };


  return {sortTimeSlotsByStartTime}
}

export default useSortTimeSlots