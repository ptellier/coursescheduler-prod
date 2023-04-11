import { Cell } from './time'
import { Section, Timeslot } from '../../../../data/DataDefinition/SectionDD'

/**
 * group sections by course and activity
 * @example
 * [
 *  [110Lectures],
 *  [110Labs],
 *  [121lectures...],
 *  [121labs...],
 *  [121tutorials...]
 * ]
 * @param {Section[]} los
 * @returns {Section[][]}
 */
export const groupSections = (los: Section[]): Section[][] => {
    const result = groupBy(los, function (section: Section) {
        return [section.subject, section.course, section.activity]
    })
    return result
}

/**
 * group cells by name
 * @param {Cell[]} loc
 * @returns {Cell[][]}
 */
export const groupCellsByName = (loc: Cell[]): Cell[][] => {
    const result = groupBy(loc, function (cell: Cell) {
        return [cell.name]
    })
    return result
}

/**
 * group timeslots by day
 * @param {Timteslot[]} lots
 * @returns {Timeslot[][]}
 */
export const groupTimeSlotsByDays = (lots: Timeslot[]): Timeslot[][] => {
    const result = groupBy(lots, (timeslot: Timeslot) => {
        return [timeslot.day]
    })
    return result
}

/**
 * groups sections by a day in week, [[mon...], [tue...], [wed...]]
 * @param {Section[]} los
 * @return {Section[][]}
 */
export const groupSectionsByWeek = (los: Section[]) => {
    const expanded = expandSectionsByDay(los)
    const mon = expanded.filter((s) => s.schedule[0].day === 'Mon')
    const tue = expanded.filter((s) => s.schedule[0].day === 'Tue')
    const wed = expanded.filter((s) => s.schedule[0].day === 'Wed')
    const thu = expanded.filter((s) => s.schedule[0].day === 'Thu')
    const fri = expanded.filter((s) => s.schedule[0].day === 'Fri')
    return [mon, tue, wed, thu, fri, []]
}

/**
 * expand each section, according to its schedule, in los
 * @param {Section[]} los
 * @returns {Section[]}
 */
export const expandSectionsByDay = (los: Section[]): Section[] => {
    let acc: Section[] = []
    los.forEach((section) => {
        section.schedule.forEach((t) => {
            const obj = Object.assign({}, section)
            obj.schedule = [t]
            acc.push(obj)
        })
    })

    return acc
}

/**
 * group sections in an array into an array several arrays by given conditions, fn
 * @param {any[]} array
 * @param {(any) => any} f
 * @returns {any[][]}
 */
const groupBy = (array: any[], f: Function): any[][] => {
    let groups: any = {}
    array.forEach(function (o) {
        let group = JSON.stringify(f(o))
        groups[group] = groups[group] || []
        groups[group].push(o)
    })
    return Object.keys(groups).map((group) => groups[group])
}

/**
 * Splits sections in a list into more sections with only one timeslot per schedule
 * @param {Section[]} los
 * @returns {Section[]}
 * @todo
 */
export const splitSectionSchedule = (los: Section[]): Section[] => {
    let rsf: Section[][] = []
    for (const sect of los) {
        const nlos: Section[] = sect.schedule.map((ts: Timeslot) => {
            let nsect: Section = Object.assign({}, sect)
            nsect.schedule = [ts]
            return nsect as Section
        })
        rsf.push(nlos)
    }
    return rsf.flat(1)
}

/**
 * create 5 subgroups of sections, one for each day
 * @param {Section[]} los
 * @returns {Section[][]}
 */
export const group5Days = (los: Section[]): Section[][] => {
    const ALL_DAY_NAMES: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    const losSplit = splitSectionSchedule(los)
    let rsf: Section[][] = []
    for (const day of ALL_DAY_NAMES) {
        rsf.push(losSplit.filter((sect: Section) => sect.schedule[0].day === day))
    }
    return rsf
}
