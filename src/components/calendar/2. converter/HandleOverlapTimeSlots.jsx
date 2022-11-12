import { groupTimeSlotsByDays } from '../../../helpers/groupby';
import OverlapTimeSlot from '../3. timeslot/OverlapTimeSlot';
import useSortTimeSlots from '../hook/useSortTimeSlots';
import useUniqueID from '../hook/useUniqueID';
import SplitCurrentNextTimeSlot from './SplitCurrentNextTimeSlot'


const HandleOverlapTimeSlots = ({ timeSlots }) => {
    const { sortTimeSlotsByStartTime } = useSortTimeSlots();
    /**
     * EFFECTS: execute group by timeslots sequence, return empty array
     *          if given timeSlots is empty
     * sequence: group => sort => group by days => group by overlap
     *           => ungroup
     * @param {*} timeSlots 
     */
     const group = (timeSlots) => {
        if (timeSlots.length > 0) {
            const sorted = sortTimeSlotsByStartTime(timeSlots)
            const groupByDay = groupTimeSlotsByDays(sorted)
            const groupByOverlap = groupByDay.map(group => groupOverlap(group));
            const ungroupFromDay = groupByOverlap.flatMap(group => group);
            return ungroupFromDay
        } else {
            return [];
        }
    }

    /**
     * EFFECTS: group timeSlots by overlapping time interval
     * INVARIANT: timeSlots must be sorted by start time
     * @param {TimeSlot[]} timeSlots 
     * @returns 
     */
    const groupOverlap = (timeSlots) => {
        const first = timeSlots.shift(); // removes first slot and return it
        let maxEnd = first.end_time;
        let curr = [first];
        let result = [];
        
        for (let i = 0; i < timeSlots.length; i++) {
            const cell = timeSlots[i];
            if (cell.start_time < maxEnd) {
                curr.push(cell)    //accumlate cell to curr
                //set maxEnd = max end of curr
                maxEnd = Math.max(...curr.map(slot => slot.end_time))
                // if last iter, add curr to result 
                i === timeSlots.length - 1 && result.push(curr); 
            } else {
                // if last iter, collect both burr and this slot, else, only collect curr
                i === timeSlots.length - 1 ? result.push(curr, [cell]) : result.push(curr) 
                curr = [cell]     //set curr = [cell]
                maxEnd = cell.end_time //set maxEnd = cell.end
            }
        }
        return timeSlots.length === 0 ? [curr] : result;
    }

    /**
     * EFFECTS: produce true if given group is overlapping group, false otherwise
     * NOTE: group is overlapping if it contains more than one timeslot
     * @param {TimeSlot[][]} group 
     * @returns 
     */
    const isOverlappingGroup = (group) => {
        return group.length > 1
    }

    //Unique ID that separates one section from many by adding start and end time
    const findUniqueKey = (timeSlot) => {
        return timeSlot.section.id + timeSlot.day + timeSlot.start_time + timeSlot.end_time;
    }

    return (
        <>
            {group(timeSlots).length > 0 && group(timeSlots).map(group =>
                isOverlappingGroup(group) 
                ? <OverlapTimeSlot group={group}/>
                : group.map(timeSlot => 
                    <SplitCurrentNextTimeSlot key={findUniqueKey(timeSlot)} timeSlot={timeSlot} isInOverlapGroup={false}/>
                 )   
            )} 
        </>
    )
}


export default HandleOverlapTimeSlots
