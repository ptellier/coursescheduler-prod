import { Paper } from "@material-ui/core";
import * as React from "react";
import Slot from "./Slot";

const DAYS_OF_THE_WEEK =
    [{dayString: "MON", gridColumn: "Mon", extraClassName:"second-col cal-background-grid"},
        {dayString: "TUE", gridColumn: "Tue", extraClassName:"cal-background-grid"},
        {dayString: "WED", gridColumn: "Wed", extraClassName:"cal-background-grid"},
        {dayString: "THU", gridColumn: "Thu", extraClassName:"cal-background-grid"},
        {dayString: "FRI", gridColumn: "Fri", extraClassName:"last-col cal-background-grid"}]

const TIMES_OF_THE_DAY = generateTimesOfDay(8, 21)


/**
 * returns array of objects with strings of hours between given numbers
 * @param {number} startHour number
 * @param {number} endHour number
 * @returns {[{timeString: string, isHalfHour: boolean, extraClassName: string}]}
 * @example generateTimesOfDay(8, 9) returns
 *      [{timeString: "8:00", gridRow: 2, isHalfHour: false, extraClassName: "second-row"},
 *      {timeString: "8:30", gridRow: 3, isHalfHour: true, extraClassName: ""},
 *      {timeString: "9:00", gridRow: 4, isHalfHour: false, extraClassName: ""},
 *      {timeString: "9:30", gridRow: 5, isHalfHour: true, extraClassName: "last-row"}]
 */

function generateTimesOfDay(startHour, endHour) {
    function generateFullHour(hour, gridRow, className) {
        return {
            timeString: hour+":00",
            gridRow: gridRow,
            isHalfHour: false,
            extraClassName: className}
    }
    function generateHalfHour(hour, gridRow, className) {
        return {
            timeString: hour+":30",
            gridRow: gridRow,
            isHalfHour: true,
            extraClassName: className}
    }

    let timesOfDay = [];
    timesOfDay.push(generateFullHour(startHour, 2,"second-row"));
    timesOfDay.push(generateHalfHour(startHour, 3,""));
    for (let i = 1; i < endHour - startHour; i++) {
        timesOfDay.push(generateFullHour(startHour + i, (i+1)*2,""));
        timesOfDay.push(generateHalfHour(startHour + i, (i+1)*2+1,""));
    }
    timesOfDay.push(generateFullHour(endHour, (endHour-startHour+1)*2, ""));
    timesOfDay.push(generateHalfHour(endHour, (endHour-startHour+1)*2+1, "last-row"));
    return timesOfDay;
}

// function TimeToRowNumber(timeString) {
//     const stringArr = timeString.split(":");
//     const numToAdd = stringArr[1] == "30" ? 1 : 0;
//     return stringArr[0].valueOf() * 2 + numToAdd + 1;
// }

//Mon to Fri as calendar headers
function generateCalendarGridHeaderCells() {
    return (<>
        {/*Mon to Fri as calendar headers*/}
        <div className={"first-col first-row cal-background-grid"} 
             style={{gridColumn: "times", gridRow: 1, zIndex:2}}>
        </div>
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

function generateCalendarGridCells() {
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

function generateCalendarGridLeftTimeCells() {
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

// function generateCalendarGridCells() {
//     return (<>
//         {TIMES_OF_THE_DAY.map(timeObj =>
//             DAYS_OF_THE_WEEK.map(dayObj =>
//                 <div key={timeObj.timeString+dayObj.dayString}
//                      id={timeObj.timeString+dayObj.dayString}
//                      className={timeObj.extraClassName + " " + dayObj.extraClassName}
//                      style={{gridColumn: dayObj.gridColumn, gridRow: timeObj.gridRow}}>
//                     {timeObj.timeString+dayObj.dayString}
//                 </div>
//             )
//         )}
//     </>)
// }




const Calendar = ({ recommended, sections }) => {

    // need to "flat out" each section by its schedules.
    //      so if CPSC110 occurs on tue and thur, we need CPSC110-tue and CPSC110-thur
    //      and then push this array down the map(section => slot)
    const unfoldSections = (recommended) => {
        let result = []
        for (const section of recommended) {
            const extractedSchedules = section.schedule;
            for (const schedule of extractedSchedules) {
                let newSection = Object.assign({}, section)
                newSection.schedule = [schedule]
                result.push(newSection)
            }
        }
        return result;
    }

    return (
        <Paper className="Paper" elevation={1}>
            <div id="grid-calendar-container">

                {unfoldSections(recommended).map(section => 
                    <Slot section={section} />
                )}
                
                {generateCalendarGridHeaderCells()}
                {generateCalendarGridLeftTimeCells()}
                {generateCalendarGridCells()}
            </div>
        </Paper>
    );
}

export default Calendar;