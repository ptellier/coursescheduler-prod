import { groupTimeSlotsByDays } from '../../../helpers/groupby';
import OverlapTimeSlot from '../3. timeslot/OverlapTimeSlot';
import SplitCurrentNextTimeSlot from './SplitCurrentNextTimeSlot'

const overlapGroup1 = [
    {
        "section": {
            "id": "longest",
            "status": "Available",
            "name": "CPSC 110 L1S",
            "subject": "CPSC",
            "course": "110",
            "section": "L1S",
            "activity": "Laboratory",
            "term": "1",
            "schedule": [
                {
                    "start_time": 750,
                    "end_time": 930,
                    "day": "Tue",
                    "term": "1"
                }
            ]
        },
        "day": "Tue",
        "start_time": 660,
        "end_time": 990,
        "isNextTimeSlot": false
    },
    {
        "section": {
            "id": "medium",
            "status": "Available",
            "name": "CPSC 110 L1S",
            "subject": "CPSC",
            "course": "110",
            "section": "L1S",
            "activity": "Laboratory",
            "term": "1",
            "schedule": [
                {
                    "start_time": 750,
                    "end_time": 930,
                    "day": "Tue",
                    "term": "1"
                }
            ]
        },
        "day": "Tue",
        "start_time": 660,
        "end_time": 900,
        "isNextTimeSlot": false
    },
    {
        "section": {
            "id": "shortest",
            "status": "Available",
            "name": "CPSC 110 L1S",
            "subject": "CPSC",
            "course": "110",
            "section": "L1S",
            "activity": "Laboratory",
            "term": "1",
            "schedule": [
                {
                    "start_time": 750,
                    "end_time": 930,
                    "day": "Tue",
                    "term": "1"
                }
            ]
        },
        "day": "Tue",
        "start_time": 900,
        "end_time": 960,
        "isNextTimeSlot": false
    }
]


const HandleOverlapTimeSlots = ({ timeSlots }) => {
    
    /**
     * EFFECTS: execute group by timeslots sequence
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
     * EFFECTS: sort given timeslots based start time
     * @param {TimeSlot[]} timeSlots
     * @returns {TimeSlot[]}
     */
    const sortTimeSlotsByStartTime = (timeSlots) => {
        return timeSlots.sort((t1, t2) => (t1.start_time > t2.start_time ? 1 : -1));
    };
    
    /**
     * EFFECTS: produce true if given group is overlapping group, false otherwise
     * NOTE: group is overlapping if it contains more than one timeslot
     * @param {TimeSlot[][]} group 
     * @returns 
     */
    const isOverlappingGroup = (group) => {
        return group.length > 1
    }

    //TODO: move this
    //Unique ID that separates one section to many by adding start and end time
    const findUniqueKey = (timeSlot, move) => {
        return timeSlot.section.id + timeSlot.day + timeSlot.start_time + timeSlot.end_time + move;
    }

    return (
        <>
            {group(timeSlots).length > 0 && group(timeSlots).map(group =>
                isOverlappingGroup(group) 
                ? <OverlapTimeSlot group={group}/>
                : group.map(timeSlot => 
                    <SplitCurrentNextTimeSlot timeSlot={timeSlot}/>
                 )   
            )} 
        </>
    )
}


export default HandleOverlapTimeSlots
