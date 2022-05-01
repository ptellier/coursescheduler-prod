import * as React from "react";
import {DAYS_OF_THE_WEEK} from "./CalendarConstants";

const TopDayCells = () => {
    return (<>
        {/*Mon to Fri as calendar headers*/}
        <div className={"first-col first-row cal-background-grid"} style={{gridColumn: "times", gridRow: 1, zIndex:2}}></div>
        {DAYS_OF_THE_WEEK.map(dayObj =>
            <div key={dayObj.dayString}
                 id={dayObj.dayString}
                 className={dayObj.extraClassName + " first-row"}
                 style={{gridColumn: dayObj.gridColumn, gridRow: 1, zIndex:2}}>
                {dayObj.dayString}
            </div>
        )}
    </>)
}

export default TopDayCells;