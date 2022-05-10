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
     * EFFECTS:
     * @param {*} group 
     * @returns 
     */
    const insertGapTimeSlots = (group) => {
        // TODO: 
        // Only for Test purpose, remove next two lines when deployed
        // const groupStartTime = 660
        // const groupEndTime = 990
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

    // EFFECTS: create a subgroup of non-overlapping cells
    //          within the given group
    // TODO: fix duplicate bug [121-L1V, 110-L1S, 121-L1B, 121-L1L]
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

    //EFFECTS: return true if two cells overlap each other
    const overlapSlots = (c1, c2) => {
        let s1 = c1.start_time; let e1 = c1.end_time;
        let s2 = c2.start_time; let e2 = c2.end_time;
        return (((e2 > e1) && (s2 < e1)) || ((e2 <= e1) && (e2 > s1)))
    }

    /**
     * EFFECTS: ...
     * @param {*} occupiedTimes 
     * @param {*} allTimes 
     * @returns 
     */
    const createGapTimeSlots = (occupiedTimes, allTimes) => {
        // console.log("occupied:", occupiedTimes, "all", allTimes)
        // removing overlap times from all times is not properly done, 
        // but this still produces correct duration of gaps, or number of gaps
        const gapTimes = allTimes.filter((time) => !occupiedTimes.includes(time));
        const gapTimeSlots = gapTimes.map((gapTime) => createGapTimeSlot(gapTime));
        return gapTimeSlots;
    }

    const createGapTimeSlot = (gapTime) => {
        return ({ type: "gap", start_time: gapTime, end_time: gapTime + interval })
    }

    const extractOccupiedTimes = (subGroup) => {
        const result = subGroup.map(timeSlot => 
            generateTimes(timeSlot.start_time, timeSlot.end_time, interval)
        )
        return result.flat();
    }

    /**
     * generates times between start time, and end time, by given interval
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
     * EFFECTS:
     * @returns 
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