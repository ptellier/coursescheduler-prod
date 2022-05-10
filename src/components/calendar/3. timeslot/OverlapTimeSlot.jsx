import React from 'react'
import SplitCurrentNextTimeSlot from '../2. converter/SplitCurrentNextTimeSlot'
import { timeToGridRow } from '../CalendarConstants'
import useSortTimeSlots from '../hook/useSortTimeSlots';
import useUniqueID from '../hook/useUniqueID';



const OverlapTimeSlot = ({ group }) => {
    
    const groupStartTime = Math.min(...group.flatMap(g => g).map(g => g.start_time))
    const groupEndTime = Math.max(...group.flatMap(g => g).map(g => g.end_time))
    const day = group[0].day
    const interval = 30;

    const { sortTimeSlotsByStartTime } = useSortTimeSlots();
    const { getUUID } = useUniqueID()

    /**
     * EFFECTS: insert gap timeslots into given group
     */
    const insertGapTimeSlots = (group) => {
        const result = [];
        const allTimes = generateTimes(groupStartTime, groupEndTime, interval)
        const subGroups = subGroupByNonOverlap(group)

        for (let subGroup of subGroups) {
            const occupiedTimes = extractOccupiedTimes(subGroup)
            const gapTimeSlots = createGapTimeSlots(occupiedTimes, allTimes)
            const mergedTimeSlots = [...subGroup, ...gapTimeSlots]
            const sortedTimeSlots = sortTimeSlotsByStartTime(mergedTimeSlots) 
            result.push(sortedTimeSlots)
        }
        return result;
    }

    // EFFECTS: create a subgroup of non-overlapping group
    //          within the given overlapping group
    // IMPROVE: fix duplicate bug
    const subGroupByNonOverlap = (group) => {
        let rsf = [];
        let worklist = [...group];
        for (const timeSlot of group) {
            if (worklist.length === 0) {break}
                let list = [timeSlot];
                for (const wrk of worklist) {
                    if (list.every(l => !overlapSlots(l, wrk))) {
                        list.push(wrk)
                        worklist = worklist.filter(x => x !== wrk && x !== timeSlot)
                    } 
                }
                worklist = worklist.filter(x => x !== timeSlot)
                rsf.push(list)
        }
        return rsf;
    }

    /**
     * EFFECTS: return true if two timeslots overlap each other
     */
    const overlapSlots = (c1, c2) => {
        let s1 = c1.start_time; let e1 = c1.end_time;
        let s2 = c2.start_time; let e2 = c2.end_time;
        return (((e2 > e1) && (s2 < e1)) || ((e2 <= e1) && (e2 > s1)))
    }

    /**
     * EFFECTS: create time gaps by filtering non-occupied times from all times
     * IMPROVE: removing overlap times from all times is not properly done, 
                but this still produces correct number of gaps. When time permits,
                re-work this function
     * @param {*} occupiedTimes 
     * @param {*} allTimes 
     * @returns 
     */
    const createGapTimeSlots = (occupiedTimes, allTimes) => {

        const gapTimes = allTimes.filter((time) => !occupiedTimes.includes(time));
        const gapTimeSlots = gapTimes.map((gapTime) => createGapTimeSlot(gapTime));
        return gapTimeSlots;
    }

    /**
     * EFFECTS: creates a gap timeslot
     */
    const createGapTimeSlot = (gapTime) => {
        return ({ type: "gap", start_time: gapTime, end_time: gapTime + interval })
    }

    /**
     * EFFECTS: extracts times occupied timeslots from given subGroup
     */
    const extractOccupiedTimes = (subGroup) => {
        const result = subGroup.map(timeSlot => 
            generateTimes(timeSlot.start_time, timeSlot.end_time, interval)
        )
        return result.flat();
    }

    /**
     * EFFECTS: generates times between start time, and end time, by given interval
     * @param start
     * @param end
     * @param interval
     */
    const generateTimes = (start, end, interval) => {
        let result = [];
        let t = start;
        while (t < end) {
            t = t + interval;
            result.push(t);
        }
        return [start, ...result];
    };

    /**
     * EFFECTS: display and create a div with height of 30px
     * INVARIANT: interval must follow exact height of 30 minutes interval
     */
    const displayGapTimeSlot = () => { 
        return <div key={getUUID()} style={{height: 30}}> </div>
    }

    //Unique ID that separates one section to many by adding start and end time
    const findUniqueKey = (timeSlot) => {
        return timeSlot.section.id + timeSlot.day + timeSlot.start_time + timeSlot.end_time;
    }

    return (
        <div 
                style={{
                display:'flex',
                gridRow: timeToGridRow(groupStartTime) 
                        + " / " 
                        + timeToGridRow(groupEndTime),
                gridColumn:day,
            }}
        >
            {/* create a column <div> that holds timeslots vertically for each subgroup,
                and map the subgroup in it. While mapping subgroup, split each timeslot
                into gap, current and next timeslot */}
            {insertGapTimeSlots(group).map(timeSlots => 
                <div className="overlap-column w-100" 
                     style={{zIndex:3}}
                >
                    {timeSlots.map(timeSlot => 
                        timeSlot.type === "gap"
                         ? displayGapTimeSlot()
                         : <SplitCurrentNextTimeSlot 
                                key={findUniqueKey(timeSlot)}
                                timeSlot={timeSlot} 
                                isInOverlapGroup={true}
                            />
                    )}
                </div>    
            )}
        </div>
    )
}

export default OverlapTimeSlot