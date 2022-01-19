import { Section, Time } from "../data/DataDefinition/SectionDD";

/**
 * cell can be either occupied or gap
 * time: time that the cell takes presence
 * name: name of cell, course name if class (note: gap's name is gap_time)
 */
export interface Cell {
  time: number;
  name: string;
  is_occupied: boolean;
}

/**Constants */

const CELL_HEIGHT = 1.5;
const TIME_INTERVAL = 30;

/**Functions */

export const main = (los: Section[]) => {
  // 1.create occupied cells
  // 2.interpolate occupied cells then defuse the array
  // 3.extract times from 2 then defuse the array
  // 4.remove result of 3 from TIMES
  // 5.convert result of 4 to listof gaps
  // 6.merge 2(occupied cells) and 5(gap cells)
  // 7.sort 6
  // 8.group cells by name
};

/**
 * produce nested arrays of cells, each cell includes time, name, status of the cell
 * Note: occupied time = time that are occupied by a course
 * @param {Section[]} los
 * @returns {Cell[][]} lloc: (listof (listof cell))
 * i.e lloc = [[{8:30, "CPSC 121 101"} ...] ...]
 */
export const getOccupiedCells = (los: Section[]): Cell[][] => {
//   if (los.length === 0) return []

  let lloc: Cell[][] = [];
  for (const sec of los) {
    const sch = sec.schedule;
    sch.forEach((ts) => {
      const item = [
        { time: ts.start_time, name: sec.name, is_occupied: true },
        { time: ts.end_time, name: sec.name, is_occupied: true },
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
  if (loc.length === 0) return [] // return empty if loc is empty

  const name = loc[0].name;
  const start = loc[0].time;
  const end = loc[1].time;
  const times = fillTimes(start, end, TIME_INTERVAL);
  return times.map((t) => ({ time: t, name: name, is_occupied: true }));
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
 * @param {Cell[]} loc
 * @param {Time[]} lot
 * @returns {Time[]}
 */
export const getGapCells = (occupied: Time[], times: Time[]): Cell[] => {
  const gap_times = times.filter((time) => !occupied.includes(time));
  const gap_cells = gap_times.map((gap_time) => ({
    time: gap_time,
    name: `gap_${gap_time}`,
    is_occupied: false,
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
  return loc.sort((c1, c2) => (c1.time > c2.time) ? 1 : -1);
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
