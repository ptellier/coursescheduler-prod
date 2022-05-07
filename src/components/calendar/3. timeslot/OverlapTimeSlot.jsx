import { Repeat } from '@mui/icons-material'
import React from 'react'
import SplitCurrentNextTimeSlot from '../2. converter/SplitCurrentNextTimeSlot'
import { timeToGridRow } from '../CalendarConstants'

const OverlapTimeSlot = ({group}) => {

  const groupStartTime = Math.min(...group.flatMap(g => g).map(g => g.start_time))
  const groupEndTime = Math.max(...group.flatMap(g => g).map(g => g.end_time))
  const day = group[0].day

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