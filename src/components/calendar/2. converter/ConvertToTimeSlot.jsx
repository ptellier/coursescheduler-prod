import React from 'react'
import useUniqueID from '../hook/useUniqueID';
import HandleOverlapTimeSlots from './HandleOverlapTimeSlots';
import { findCircularColorIndex } from '../../Theme';


/**
 * Combines given currentSections and nextSections
 * then create timeslot objects
 * @param {Section[], Section[]} param
 * @returns {TimeSlot[]}
 */
const ConvertToTimeSlot = ({ currentSections, nextSections }) => {

  /**
   * EFFECTS:  execute sections to timeslots conversion sequence
   * sequence: convert => (sectionsToTimeSlots x 2) => (createTimeSlots x n)
   *                   => (mergeTimeSlots)
   * @param {Section[]} currentSections 
   * @param {Section[]} nextSections 
   * @returns {TimeSlot[]}
   */
  const convert = (currentSections, nextSections) => {
      const currentTimeSlots = sectionsToTimeSlots(currentSections, false);
      const nextTimeSlots    = sectionsToTimeSlots(nextSections, true);
      const mergedTimeSlots  = mergeTimeSlots(currentTimeSlots, nextTimeSlots);
      return mergedTimeSlots;
  }

  /**
   * EFFECTS: convert given sections to timeslots, setting isNext
   *          to true for nextSections
   * @param {Section[]} sections 
   * @param {boolean} isNext 
   */
  const sectionsToTimeSlots = (sections, isNext) => {
      
      const timeSlots = [];
      for (const [index, section] of sections.entries()) {
          for (const time of section.schedule) {
              timeSlots.push(createTimeSlot(section, time, isNext, findCircularColorIndex(index)));
          };
      };
      return timeSlots;
  }

  /**
   * EFFECTS: creates timeslot with given section
   * @param {Section} section
   * @param {Time} time 
   * @param {boolean} isNext 
   * @returns {TimeSlot}
   */
  const createTimeSlot = (section, time, isNext, colorIndex) => {
      const timeSlot = {
          section: section,
          day: time.day,
          start_time: time.start_time,
          end_time: time.end_time,
          isNextTimeSlot: isNext,
          colorIndex: colorIndex,
      };
      return timeSlot;
  }

  /**
   * EFFECTS: merge current and next timeslots
   */
  const mergeTimeSlots = (current, next) => {
    return [...current, ...next];
  }


  return (
    <>
      <HandleOverlapTimeSlots timeSlots={convert(currentSections, nextSections)} />
    </>
  )
}

export default ConvertToTimeSlot