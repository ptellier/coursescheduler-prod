import { Section, Time, Timeslot } from '../../../../data/DataDefinition/SectionDD'
import { groupCellsByName } from './groupby'
import { make_timeslot } from './overlap'

/**Constants */

const START = 7 * 60
const END = 21 * 60
const INTERVAL = 30
const CELL_HEIGHT = 1.5

/**Data Definitions */

/**
 * A cell in a timetable
 * @property {number} time time in the timetable where the cell is to be placed
 * @property {number} name name of cell
 *    (note: if cell is a class then name is course name)
 *    (note: if cell is a gap in the timetable name is "gap_time")
 * @property {number} is_occupied whether cell occupies a certain time cell can be either occupied or gap
 */
export interface Cell {
    id: string
    time: number
    name: string
    subject?: string
    course?: string
    activity?: string
    is_occupied: boolean
    isNextMove?: boolean
}

/**
 * GUI display info for a cell in a timetable that has...
 * @property {number} height
 * @property {number} start
 * @property {number} end
 * @property {number} type
 */
export interface Cell_display {
    id: string
    name: string
    subject?: string
    course?: string
    activity?: string
    height: number
    start: number
    end: number
    is_occupied: boolean
    isNextMove?: boolean
}

/**Functions */

export const createCells = (los: Section[]): Cell_display[] => {
    // 1.create, interpolate occupied cells then defuse the array
    const occupied_cells = defuseArray(getOccupiedCells(los).map((loc) => interpolateTimes(loc)))
    // 2.extract times from 1.
    const occupied_times = extractTimes(occupied_cells)
    // 3.remove result of 2 from TIMES
    const gap_cells = getGapCells(occupied_times, generateTimes(START, END, INTERVAL))
    // 4.merge 2(occupied cells) and 5(gap cells)
    const sorted_merged_cells = sortCellsByTime(mergeCells(occupied_cells, gap_cells))
    // 5.group cells by name
    const grouped_cells = groupCellsByName(sorted_merged_cells)
    // 6.process cells for display
    return convertToDisplay(grouped_cells);
}

export const convertToDisplay = (grouped_cells: Cell[][]) => {
    return grouped_cells.map((loc) => ({
        id: loc[0].id,
        name: loc[0].name,
        height: loc.length * CELL_HEIGHT,
        start: loc[0].time,
        end: loc.length === 1 ? loc[0].time + 30 : loc[loc.length - 1].time + 30,
        is_occupied: loc[0].is_occupied,
        isNextMove: loc[0].isNextMove,
        subject: loc[0].subject,
        course: loc[0].course,
        activity: loc[0].activity,
    }))
}

/**
 * produce nested arrays of cells, each cell includes time, name, status of the cell
 * Note: occupied time = time that are occupied by a course
 * @param {Section[]} los
 * @returns {Cell[][]} lloc: (listof (listof cell))
 * i.e lloc = [[{8:30, "CPSC 121 101"} ...] ...]
 */
export const getOccupiedCells = (los: Section[]): Cell[][] => {
    if (los.length === 0) return []
    let lloc: Cell[][] = []
    for (const sec of los) {
        const sch = sec.schedule
        sch.forEach((ts) => {
            const item = [
                {
                    id: sec.id,
                    time: ts.start_time,
                    name: sec.name,
                    is_occupied: true,
                    isNextMove: sec.isNextMove,
                    subject: sec.subject,
                    course: sec.course,
                    activity: sec.activity,
                },
                {
                    id: sec.id,
                    time: ts.end_time,
                    name: sec.name,
                    is_occupied: true,
                    isNextMove: sec.isNextMove,
                    subject: sec.subject,
                    course: sec.course,
                    activity: sec.activity,
                },
            ]
            lloc.push(item)
        })
    }
    return lloc
}

/**
 * interpolate, fill from starting to ending times, each array of cells
 */
export const interpolateTimes = (loc: Cell[]): Cell[] => {
    if (loc.length === 0) return [] // return empty if loc is empty

    const id = loc[0].id
    const name = loc[0].name
    const start = loc[0].time
    const end = loc[1].time
    const times = fillTimes(start, end, INTERVAL)
    const isNextMove = loc[0].isNextMove
    const subject = loc[0].subject
    const course = loc[0].course
    const activity = loc[0].activity

    const all = times.map((t) => ({
        id: id,
        time: t,
        name: name,
        is_occupied: true,
        isNextMove: isNextMove,
        subject: subject,
        course: course,
        activity: activity,
    }))
    return all.slice(0, -1)
}

/**
 * generates times between start time, and end time, by given interval
 * @param start
 * @param end
 * @param interval
 * @returns
 */
export const fillTimes = (start: Time, end: Time, interval: number): Time[] => {
    let acc = []
    let t = start
    while (t < end) {
        t = t + interval
        acc.push(t)
    }
    return [start, ...acc]
}

/**
 * Defuse a nested array into a plain array
 * @returns
 */
export const defuseArray = (arr: any[][]): any[] => {
    let acc = []
    for (const a of arr) {
        acc.push(...a)
    }
    return acc
}

/**
 * extracts times from given loc, list of cell
 * @param {Cell[]} loc
 * @returns {Time[]}
 */
export const extractTimes = (loc: Cell[]): Time[] => {
    return loc.map((c) => c.time)
}

/**
 * produce array of cells with times that are gap
 * 1. remove elements of times that correspond to elements of occupied
 * 2. convert 1. to gap cells
 * @param {Time[]} occupied
 * @param {Time[]} times
 * @returns {Cell[]}
 */
export const getGapCells = (occupied: Time[], times: Time[]): Cell[] => {
    const gap_times = times.filter((time) => !occupied.includes(time))
    return gap_times.map((gap_time) => ({
        id: 'gap',
        time: gap_time,
        name: `gap_${gap_time}`,
        is_occupied: false,
        isNextMove: false,
    }))
    // Todo: finish this stub
}

/**
 * merge cells1 and cells2
 * @param {Cell[]} loc_a i.e occupied
 * @param {Cell[]} loc_b i.e gaps
 * @returns {Cell[]} i.e occupied + gaps
 */
export const mergeCells = (loc_a: Cell[], loc_b: Cell[]): Cell[] => {
    return [...loc_a, ...loc_b]
}

/**
 * sort given loc based on cell's time
 * @param loc
 * @returns
 */
export const sortCellsByTime = (loc: Cell[]): Cell[] => {
    return loc.sort((c1, c2) => (c1.time > c2.time ? 1 : -1))
}

/**
 * return the height of given cell multiplied by given port height
 * @param {Cell[]} loc
 * @param {number} port_h
 * @returns {number}
 */
export const cellHeight = (loc: Cell[], port_h: number): number => {
    return loc.length * port_h
}

/**
 * generates times from start to end, by given interval
 * @param {number} start
 * @param {number} end
 * @param {number} interval
 * @return {Time[]}
 */
export const generateTimes = (start: number, end: number, interval: number): Time[] => {
    let result = []
    let t = start
    while (t < end) {
        t = t + interval
        result.push(t)
    }
    return [start, ...result]
}

export const convertToTimeSlot = (los: Section[]): Section[] => {
    return los.map((section) => {
        const schedule = section.schedule[0]
        const start = schedule.start_time
        const end = schedule.end_time
        const day = schedule.day
        const term = schedule.term

        const obj = Object.assign({}, section)
        obj.schedule = [make_timeslot(`${start}`, `${end}`, day, term)]
        return obj
    })
}

// converts Section Timeslot to => [{start_time: "11:00 AM", end_time: "11:30 AM", Days: "MWF"}]
export const convertTimeslotsToTime = (timeslots: Timeslot[]) => {
    if (timeslots == null || timeslots.length === 0) {
        return []
    }
    timeslots.sort(sortMonths)
    const dayHash = { Mon: 'M', Tue: 'Tu', Wed: 'W', Thu: 'Th', Fri: 'F' }

    let courseTimes: any = []
    // courseTimes = {courseTime, courseTime...}
    // courseTime = { start_time: timeslots[0].start_time, end_time: timeslots[0].end_time, days: dayHash[timeslots[0].day] }

    // Gather all unique timeslots times and join days (eg. M + W + F)
    for (let i = 0; i < timeslots.length; i++) {
        let j = 0
        while (j < courseTimes.length) {
            // if start time and end time of timeslots are the same join days (eg. M + W)
            if (courseTimes[j].start_time === timeslots[i].start_time && courseTimes[j].end_time === timeslots[i].end_time) {
                // Join days (eg. M + W)
                courseTimes[j].days = courseTimes[j].days + dayHash[timeslots[i].day]
                break
            }
            j++
        }
        // if this timeslot doesn't match up with existing courseTime start time or end time
        // create a new courseTime
        if (j === courseTimes.length) {
            courseTimes.push({ start_time: timeslots[i].start_time, end_time: timeslots[i].end_time, days: dayHash[timeslots[i].day] })
        }
    }

    // Convert time => 660 -> 11:00 AM
    for (let i = 0; i < courseTimes.length; i++) {
        courseTimes[i].start_time = convert24hrInt_To_12HrString(courseTimes[i].start_time)
        courseTimes[i].end_time = convert24hrInt_To_12HrString(courseTimes[i].end_time)
    }

    return courseTimes
}

export const convert24hrInt_To_12HrString = (time: number) => {

    // Calculate Minutes String
    let minutes: string
    let minutesCalc: number = time % 60

    if (minutesCalc === 0) {
        minutes = '00'
    } else if (minutesCalc < 10) {
        minutes = `0${minutesCalc}`
    } else {
        minutes = `${minutesCalc}`
    }

    // Calculate AM PM and hours string
    let AMorPM: string

    let hour: string
    let hourCalc: number = Math.floor(time / 60)

    if (hourCalc === 0) {
        hour = '12'
        AMorPM = 'AM'
    } else if (hourCalc < 12) {
        hour = `${hourCalc}`
        AMorPM = 'AM'
    } else if (hourCalc === 12) {
        hour = `${hourCalc}`
        AMorPM = 'PM'
    } else {
        hour = `${hourCalc - 12}`
        AMorPM = 'PM'
    }

    return hour + ':' + minutes + ' ' + AMorPM
}

const sortMonths = (ts1: Timeslot, ts2: Timeslot) => {
    const dayValue = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5 }
    return dayValue[ts1.day] < dayValue[ts2.day] ? 1 : 0
}
