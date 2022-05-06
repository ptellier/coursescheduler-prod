import * as React from "react";
import {TIMES_OF_THE_DAY} from "../CalendarConstants";

const LeftTimeCells = () => {
    return (<>
        {TIMES_OF_THE_DAY.filter(timeObj => !timeObj.isHalfHour).map(timeObj => {

                return (<div key={timeObj.timeString}
                             id={timeObj.timeString}
                             className={timeObj.extraClassName + " first-col cal-background-grid"}
                             style={{gridColumn: "times", gridRow: timeObj.gridRow + " / " + (timeObj.gridRow + 2), zIndex: 2}}>
                    {timeObj.timeString}
                </div>)
            }
        )}
    </>)
}

export default LeftTimeCells;