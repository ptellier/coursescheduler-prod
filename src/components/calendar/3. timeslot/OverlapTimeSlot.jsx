import { Repeat } from '@mui/icons-material'
import React from 'react'
import SplitCurrentNextTimeSlot from '../2. converter/SplitCurrentNextTimeSlot'
import { timeToGridRow } from '../CalendarConstants'

const OverlapTimeSlot = ({group}) => {

  const groupStartTime = Math.min(...group.flatMap(g => g).map(g => g.start_time))
  const groupEndTime = Math.max(...group.flatMap(g => g).map(g => g.end_time))
  const day = group[0].day

    // EFFECTS: create a subgroup of non-overlapping cells
    //          within the given group
    // TODO: fix duplicate bug [121-L1V, 110-L1S, 121-L1B, 121-L1L]
    const subGroupByNonOverlap = (group) => {
        let rsf = [];
        let worklist = [...group];
        for (const cell of group) {
            if (worklist.length === 0) {break}
                let list = [cell];
                for (const wrk of worklist) {
                    if (list.every(l => !overlapCells(l, wrk))) {
                        list.push(wrk)
                        worklist = worklist.filter(x => x !== wrk && x !== cell)
                    } 
                }
                worklist = worklist.filter(x => x !== cell)
                rsf.push(list)
        }
        return rsf;
    }

    //EFFECTS: return true if two cells overlap each other
    const overlapCells = (c1, c2) => {
        let s1 = c1.start_time; let e1 = c1.end_time;
        let s2 = c2.start_time; let e2 = c2.end_time;
        return (((e2 > e1) && (s2 < e1)) || ((e2 <= e1) && (e2 > s1)))
    }

    const createGaps = () => {

    }

    const insertGaps = () => {

    }

    const extractOccupiedTimes = () => {

    }

    const generateAllTimes = () => {

    }


    return (
        <div style={{
                display:'flex',
                gridRow: timeToGridRow(groupStartTime) 
                        + " / " 
                        + timeToGridRow(groupEndTime),
                gridColumn:day,
            }}
        >
            {group.map(timeSlot => 
                <SplitCurrentNextTimeSlot timeSlot={timeSlot}/>
            )}
        </div>
    )
}

export default OverlapTimeSlot