export const DAYS_OF_THE_WEEK =
    [{dayString: "MON", gridColumn: "Mon", extraClassName:"second-col cal-background-grid"},
        {dayString: "TUE", gridColumn: "Tue", extraClassName:"cal-background-grid"},
        {dayString: "WED", gridColumn: "Wed", extraClassName:"cal-background-grid"},
        {dayString: "THU", gridColumn: "Thu", extraClassName:"cal-background-grid"},
        {dayString: "FRI", gridColumn: "Fri", extraClassName:"last-col cal-background-grid"}]

export const TIMES_OF_THE_DAY = generateTimesOfDay(8, 21)
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

/**
 * returns a number corresponding to the desired grid row for the React Calendar Component when given
 *      time (minutes from midnight)
 * @param {Time} time
 * @returns {number}
 * @example
 * timeToGridRow(480) returns 3
 * timeToGridRow(540) returns 4
 * timeToGridRow(600) returns 5
 * timeToGridRow(660) returns 6
 */
export function timeToGridRow(time) {
    return time/30-13;
}


//UNUSED SO FAR... TODO: delete when sure we are not using

/**
 * returns a number corresponding to the desired grid row for the React Calendar Component when given
 *      TimeSlot.start_time or TimeSlot.end_time
 * @param {string} timeString
 * @returns {number}
 * @example
 * timeToGridRow("8:00") returns 3
 * timeToGridRow("8:30") returns 4
 * timeToGridRow("9:00") returns 5
 * timeToGridRow("9:30") returns 6
 */
export function stringTimeToGridRow(timeString) {
    const stringArr = timeString.split(":");
    const numToAdd = stringArr[1] === "30" ? 1 : 0;
    return (stringArr[0].valueOf() - 6) * 2 + numToAdd;
}

//UNUSED SO FAR... TODO: delete when sure we are not using
/**
 * make Timeslot from start and end times in 24 hour time
 * @param {string} startTime - e.g. "15:00"
 * @param {string} endTime -  e.g. "16:30"
 * @returns {Timeslot}
 */
export function makeTimeFromString(startTime, endTime, day, term) {
    let startArr = startTime.split(":").map((s) => parseInt(s));
    let endArr = endTime.split(":").map((s) => parseInt(s));
    let nstart = (startArr[0]*60)+startArr[1];
    let nend = (endArr[0]*60)+endArr[1];
    return {start_time: nstart, end_time: nend, day:day, term:term};
}