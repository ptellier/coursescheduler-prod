import { Section, Time } from "../data/DataDefinition/SectionDD";
import { groupCellsByName } from "./groupby";
import { make_timeslot } from "./overlap";

/**Constants */

const START = 7 * 60;
const END = 21 * 60;
const INTERVAL = 30;
const CELL_HEIGHT = 1.5;

/**Data Definitions */

/** Cell data
 * @property {number} time time that the cell takes presence
 * @property {number} name name of cell, course name if class (note: gap's name is gap_time)
 * @property {number} is_occupied whether cell occupies certain time
 *  * cell can be either occupied or gap
 */
export interface Cell {
  id: string;
  time: number;
  name: string;
  subject?: string;
  course?: string;
  activity?: string;
  is_occupied: boolean;
  isNextMove?: boolean;
}

/** Cells ready for display on UI
 * @property {number} height
 * @property {number} start
 * @property {number} end
 * @property {number} type
 */
export interface Cell_display {
  id: string;
  name: string;
  subject?: string;
  course?: string;
  activity?: string;
  height: number;
  start: number;
  end: number;
  is_occupied: boolean;
  isNextMove?: boolean;
}

/**Functions */

export const createCells = (los: Section[]): Cell_display[] => {
  // 1.create, interpolate occupied cells then defuse the array
  const occupied_cells = defuseArray(
    getOccupiedCells(los).map((loc) => interpolateTimes(loc))
  );
  // 2.extract times from 1.
  const occupied_times = extractTimes(occupied_cells);
  // 3.remove result of 2 from TIMES
  const gap_cells = getGapCells(
    occupied_times,
    generateTimes(START, END, INTERVAL)
  );
  // 4.merge 2(occupied cells) and 5(gap cells)
  const sorted_merged_cells = sortCellsByTime(
    mergeCells(occupied_cells, gap_cells)
  );
  // 5.group cells by name
  const grouped_cells = groupCellsByName(sorted_merged_cells);
  // 6.process cells for display
  const cells_display = grouped_cells.map((loc) => ({
    id: loc[0].id,
    name: loc[0].name,
    height: loc.length * CELL_HEIGHT,
    start: loc[0].time,
    end: loc.length === 0 ? loc[0].time : loc[loc.length - 1].time,
    is_occupied: loc[0].is_occupied,
    isNextMove: loc[0].isNextMove,
    subject:loc[0].subject,
    course:loc[0].course,
    activity:loc[0].activity,
  }));
  //   console.log(cells_display)
  return cells_display;
};

/**
 * produce nested arrays of cells, each cell includes time, name, status of the cell
 * Note: occupied time = time that are occupied by a course
 * @param {Section[]} los
 * @returns {Cell[][]} lloc: (listof (listof cell))
 * i.e lloc = [[{8:30, "CPSC 121 101"} ...] ...]
 */
export const getOccupiedCells = (los: Section[]): Cell[][] => {
  if (los.length === 0) return [];
  let lloc: Cell[][] = [];
  for (const sec of los) {
    const sch = sec.schedule;
    sch.forEach((ts) => {
      const item = [
        {
          id: sec.id,
          time: ts.start_time,
          name: sec.name,
          is_occupied: true,
          isNextMove: sec.isNextMove,
          subject:sec.subject,
          course:sec.course,
          activity:sec.activity,
        },
        {
          id: sec.id,
          time: ts.end_time,
          name: sec.name,
          is_occupied: true,
          isNextMove: sec.isNextMove,
          subject:sec.subject,
          course:sec.course,
          activity:sec.activity,
        },
      ];
      lloc.push(item);
    });
  }
  return lloc;
};

/**
 * interpolate, fill from starting to ending times, each array of cells
 * @param {Cell[]} lloc
 * @return {Cell[]}
 */
export const interpolateTimes = (loc: Cell[]): Cell[] => {
  if (loc.length === 0) return []; // return empty if loc is empty

  const id = loc[0].id;
  const name = loc[0].name;
  const start = loc[0].time;
  const end = loc[1].time;
  const times = fillTimes(start, end, INTERVAL);
  const isNextMove = loc[0].isNextMove;
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
    activity: activity
  }));
  return all.slice(0, -1);
};

/**
 * generates times between start time, and end time, by given interval
 * @param start
 * @param end
 * @param interval
 * @returns
 */
export const fillTimes = (start: Time, end: Time, interval: number): Time[] => {
  let acc = [];
  let t = start;
  while (t < end) {
    t = t + interval;
    acc.push(t);
  }
  return [start, ...acc];
};

/**
 * Defuse a nested array into a plain array
 * @returns
 */
export const defuseArray = (arr: any[][]): any[] => {
  let acc = [];
  for (const a of arr) {
    acc.push(...a);
  }
  return acc;
};

/**
 * extracts times from given loc, list of cell
 * @param {Cell[]} loc
 * @returns {Time[]}
 */
export const extractTimes = (loc: Cell[]): Time[] => {
  return loc.map((c) => c.time);
};

/**
 * produce array of cells with times that are gap
 * 1. remove elements of times that correspond to elements of occupied
 * 2. convert 1. to gap cells
 * @param {Time[]} occupied
 * @param {Time[]} times
 * @returns {Cell[]}
 */
export const getGapCells = (occupied: Time[], times: Time[]): Cell[] => {
  const gap_times = times.filter((time) => !occupied.includes(time));
  const gap_cells = gap_times.map((gap_time) => ({
    id: "na",
    time: gap_time,
    name: `gap_${gap_time}`,
    is_occupied: false,
    isNextMove: false,
  }));
  return gap_cells; //stub
};

/**
 * merge cells1 and cells2
 * @param {Cell[]} loc_a i.e occupied
 * @param {Cell[]} loc_b i.e gaps
 * @returns {Cell[]} i.e occupied + gaps
 */
export const mergeCells = (loc_a: Cell[], loc_b: Cell[]): Cell[] => {
  return [...loc_a, ...loc_b];
};

/**
 * sort given loc based on cell's time
 * @param loc
 * @returns
 */
export const sortCellsByTime = (loc: Cell[]): Cell[] => {
  return loc.sort((c1, c2) => (c1.time > c2.time ? 1 : -1));
};

/**
 * return the height of given cell multiplied by given port height
 * @param {Cell[]} loc
 * @param {number} port_h
 * @returns {number}
 */
export const cellHeight = (loc: Cell[], port_h: number): number => {
  return loc.length * port_h;
};

/**
 * generates times from start to end, by given interval
 * @param {number} start
 * @param {number} end
 * @param {number} interval
 * @return {Time[]}
 */
export const generateTimes = (
  start: number,
  end: number,
  interval: number
): Time[] => {
  let result = [];
  let t = start;
  while (t < end) {
    t = t + interval;
    result.push(t);
  }
  return [start, ...result];
};

export const convertToTimeSlot = (los: Section[]): Section[] => {
  return los.map((section) => {
    const schedule = section.schedule[0];
    const start = schedule.start_time;
    const end = schedule.end_time;
    const day = schedule.day;
    const term = schedule.term;

    const obj = Object.assign({}, section);
    obj.schedule = [make_timeslot(`${start}`, `${end}`, day, term)];
    return obj;
  });
};
