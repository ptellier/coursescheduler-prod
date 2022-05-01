import * as React from "react";
import {DAYS_OF_THE_WEEK, TIMES_OF_THE_DAY} from "./CalendarConstants";

const MainCells = () => {
    return (<>
        {TIMES_OF_THE_DAY.map(timeObj =>
            DAYS_OF_THE_WEEK.map(dayObj =>
                <div key={timeObj.timeString+dayObj.dayString}
                     id={timeObj.timeString+dayObj.dayString}
                     className={timeObj.extraClassName + " " + dayObj.extraClassName}
                     style={{gridColumn: dayObj.gridColumn, gridRow: timeObj.gridRow, zIndex:2}}>
                    {/*{timeObj.timeString+dayObj.dayString}*/}
                </div>
            )
        )}
    </>)
}

export default MainCells;