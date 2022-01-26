import React from 'react'
import { generateTimes } from "../../helpers/time";
import { Section } from "../../data/DataDefinition/SectionDD";



const TimeColumn = () => {
    const start = 7 * 60
    const end = 21 * 60
    const interval = 30
    const height = "1.5rem"

    return (
        <div className="col-1 pr-0">
        <div className="time" style={{ height: height }}></div>
        {generateTimes(start, end, interval).map((time) => (
            (time/60) % 1 === 0
            ? <div key={Math.random()} className="time text-left border-top" style={{ height: height }}>{time/60}:00</div>
            : <div key={Math.random()} className="time text-left" style={{ height: height }}></div>
        ))}
      </div>
    )
}

export default TimeColumn


