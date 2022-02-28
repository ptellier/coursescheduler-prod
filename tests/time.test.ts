import { Section, Time } from "../src/data/DataDefinition/SectionDD";
import {
  createCells,
  getOccupiedCells,
  fillTimes,
  cellHeight,
  interpolateTimes,
  defuseArray,
  extractTimes,
  getGapCells,
  mergeCells,
  sortCellsByTime,
  generateTimes,
} from "../src/helpers/time";

const TIMES: Time[] = [
  7 * 60,
  7 * 60 + 30,
  8 * 60,
  8 * 60 + 30,
  9 * 60,
  9 * 60 + 30,
  10 * 60,
  10 * 60 + 30,
  11 * 60,
  11 * 60 + 30,
  12 * 60,
];

const los_ordered_times: Section[] = [
  {
    status: "Available",
    name: "CPSC 110 L11",
    subject: "CPSC",
    course: "110",
    section: "L11",
    activity: "Lecture",
    term: "1",
    schedule: [
      {
        day: "Wed",
        term: "1",
        start_time: 8 * 60 + 30, // "8:30"
        end_time: 9 * 60 + 30, //"9:30"
      },
    ],
    id: "someID"
  },
  {
    status: "Restricted",
    name: "CPSC 121 102",
    subject: "CPSC",
    course: "121",
    section: "102",
    activity: "Lecture",
    term: "1",
    schedule: [
      {
        day: "Wed",
        term: "1",
        start_time: 10 * 60, //"10:00",
        end_time: 11 * 60, //"11:00",
      },
    ],
    id: "someID"
  },
];
const los_unordered_times: Section[] = [
  {
    status: "Restricted",
    name: "CPSC 121 102",
    subject: "CPSC",
    course: "121",
    section: "102",
    activity: "Lecture",
    term: "1",
    schedule: [
      {
        day: "Wed",
        term: "1",
        start_time: 10 * 60, //"10:00",
        end_time: 11 * 60, //"11:00",
      },
    ],
    id: "someID"
  },
  {
    status: "Available",
    name: "CPSC 110 L11",
    subject: "CPSC",
    course: "110",
    section: "L11",
    activity: "Lecture",
    term: "1",
    schedule: [
      {
        day: "Wed",
        term: "1",
        start_time: 8 * 60 + 30, // "8:30"
        end_time: 9 * 60 + 30, //"9:30"
      },
    ],
    id: "someID"
  },
];

//TODO: Finish testing
test("createCells", () => {
  expect(createCells([])).toEqual([])
  // expect(createCells(los_ordered_times)).toEqual([])
})




test("interpolateTimes", () => {
  expect(interpolateTimes([])).toEqual([]);
  expect(
    interpolateTimes([
      { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
      { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    ])
  ).toEqual([
    { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    { time: 9 * 60 + 0, name: "CPSC 110 L11", is_occupied: true },
    // { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
  ]);
  expect(
    interpolateTimes([
      { time: 12 * 60 + 0, name: "CPSC 110 L11", is_occupied: true },
      { time: 14 * 60 + 0, name: "CPSC 110 L11", is_occupied: true },
    ])
  ).toEqual([
    { time: 12 * 60 + 0, name: "CPSC 110 L11", is_occupied: true },
    { time: 12 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    { time: 13 * 60 + 0, name: "CPSC 110 L11", is_occupied: true },
    { time: 13 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    // { time: 14 * 60 + 0, name: "CPSC 110 L11", is_occupied: true },
  ]);
});

test("getOccupiedCells", () => {
  expect(getOccupiedCells([])).toEqual([]);
  expect(getOccupiedCells(los_ordered_times)).toEqual([
    [
      { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
      { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    ],
    [
      { time: 10 * 60, name: "CPSC 121 102", is_occupied: true },
      { time: 11 * 60, name: "CPSC 121 102", is_occupied: true },
    ],
  ]);
  expect(getOccupiedCells(los_unordered_times)).toEqual([
    [
      { time: 10 * 60, name: "CPSC 121 102", is_occupied: true },
      { time: 11 * 60, name: "CPSC 121 102", is_occupied: true },
    ],
    [
      { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
      { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    ],
  ]);
});

test("fillTimes", () => {
  expect(fillTimes(8 * 60 + 30, 9 * 60 + 30, 30)).toEqual([
    8 * 60 + 30,
    9 * 60,
    9 * 60 + 30,
  ]);
  expect(fillTimes(11 * 60 + 30, 12 * 60 + 30, 30)).toEqual([
    11 * 60 + 30,
    12 * 60,
    12 * 60 + 30,
  ]);
  expect(fillTimes(11 * 60 + 30, 13 * 60, 30)).toEqual([
    11 * 60 + 30,
    12 * 60,
    12 * 60 + 30,
    13 * 60,
  ]);
  expect(fillTimes(11 * 60 + 30, 14 * 60, 30)).toEqual([
    11 * 60 + 30,
    12 * 60,
    12 * 60 + 30,
    13 * 60,
    13 * 60 + 30,
    14 * 60,
  ]);
});

test("cellHeight", () => {
  expect(cellHeight([], 0)).toEqual(0);
  expect(
    cellHeight(
      [
        { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
        { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
      ],
      1.5
    )
  ).toEqual(2 * 1.5);
}); 

test("defuseArray", () => {
  expect(defuseArray([])).toEqual([]);
  expect(
    defuseArray([
      [1, 2, 3],
      [4, 5, 6],
    ])
  ).toEqual([1, 2, 3, 4, 5, 6]);
  expect(
    defuseArray([
      [
        { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
        { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
      ],
      [
        { time: 11 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
        { time: 12 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
      ],
    ])
  ).toEqual([
    { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    { time: 11 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    { time: 12 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
  ]);
});

test("extractTimes", () => {
  expect(extractTimes([])).toEqual([]);
  expect(
    extractTimes([
      { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
      { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    ])
  ).toEqual([8 * 60 + 30, 9 * 60 + 30]);
});

test("getGapCells", () => {
  expect(getGapCells([8 * 60 + 30, 9 * 60, 9 * 60 + 30], TIMES)).toEqual([
    { time: 7 * 60, name: `gap_${7 * 60}`, is_occupied: false },
    { time: 7 * 60 + 30, name: `gap_${7 * 60 + 30}`, is_occupied: false },
    { time: 8 * 60, name: `gap_${8 * 60}`, is_occupied: false },
    // 8*60+30,
    // 9*60
    // 9*60+30,
    { time: 10 * 60, name: `gap_${10 * 60}`, is_occupied: false },
    { time: 10 * 60 + 30, name: `gap_${10 * 60 + 30}`, is_occupied: false },
    { time: 11 * 60, name: `gap_${11 * 60}`, is_occupied: false },
    { time: 11 * 60 + 30, name: `gap_${11 * 60 + 30}`, is_occupied: false },
    { time: 12 * 60, name: `gap_${12 * 60}`, is_occupied: false },
  ]);
});

test("mergeCells", () => {
  expect(mergeCells([], [])).toEqual([]);
  expect(
    mergeCells(
      [
        { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
        { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
      ],
      [
        { time: 10 * 60 + 30, name: `gap_${10 * 60 + 30}`, is_occupied: true },
        { time: 11 * 60 + 30, name: `gap_${11 * 60 + 30}`, is_occupied: true },
      ]
    )
  ).toEqual([
    { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    { time: 10 * 60 + 30, name: `gap_${10 * 60 + 30}`, is_occupied: true },
    { time: 11 * 60 + 30, name: `gap_${11 * 60 + 30}`, is_occupied: true },
  ]);
});

test("sortCellsByTime", () => {
  expect(sortCellsByTime([])).toEqual([]);
  expect(
    sortCellsByTime([
      { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
      { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
      { time: 10 * 60 + 30, name: `gap_${10 * 60 + 30}`, is_occupied: true },
      { time: 11 * 60 + 30, name: `gap_${11 * 60 + 30}`, is_occupied: true },
    ])
  ).toEqual([
    { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    { time: 10 * 60 + 30, name: `gap_${10 * 60 + 30}`, is_occupied: true },
    { time: 11 * 60 + 30, name: `gap_${11 * 60 + 30}`, is_occupied: true },
  ]);
  expect(
    sortCellsByTime([
      { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
      { time: 10 * 60 + 30, name: `gap_${10 * 60 + 30}`, is_occupied: true },
      { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
      { time: 11 * 60 + 30, name: `gap_${11 * 60 + 30}`, is_occupied: true },
    ])
  ).toEqual([
    { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    { time: 10 * 60 + 30, name: `gap_${10 * 60 + 30}`, is_occupied: true },
    { time: 11 * 60 + 30, name: `gap_${11 * 60 + 30}`, is_occupied: true },
  ]);
  expect(
    sortCellsByTime([
      { time: 11 * 60 + 30, name: `gap_${11 * 60 + 30}`, is_occupied: true },
      { time: 10 * 60 + 30, name: `gap_${10 * 60 + 30}`, is_occupied: true },
      { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
      { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    ])
  ).toEqual([
    { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    { time: 10 * 60 + 30, name: `gap_${10 * 60 + 30}`, is_occupied: true },
    { time: 11 * 60 + 30, name: `gap_${11 * 60 + 30}`, is_occupied: true },
  ]);
  expect(
    sortCellsByTime([
      { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
      { time: 11 * 60 + 30, name: `gap_${11 * 60 + 30}`, is_occupied: true },
      { time: 10 * 60 + 30, name: `gap_${10 * 60 + 30}`, is_occupied: true },
      { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
      { time: 13 * 60 + 30, name: "CPSC 121 L11", is_occupied: true },
      { time: 14 * 60 + 30, name: "CPSC 121 L11", is_occupied: true },
    ])
  ).toEqual([
    { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    { time: 10 * 60 + 30, name: `gap_${10 * 60 + 30}`, is_occupied: true },
    { time: 11 * 60 + 30, name: `gap_${11 * 60 + 30}`, is_occupied: true },
    { time: 13 * 60 + 30, name: "CPSC 121 L11", is_occupied: true },
    { time: 14 * 60 + 30, name: "CPSC 121 L11", is_occupied: true },
  ]);
});

test("generateTimes", () => {
  expect(generateTimes(9*60, 10*60, 30)).toEqual([
    9*60, 9*60+30 , 10*60
  ]) 
  expect(generateTimes(9*60, 12*60, 30)).toEqual([
    9*60, 9*60+30 , 10*60, 10*60+30, 11*60, 11*60+30, 12*60
  ]) 
  expect(generateTimes(9*60, 12*60+30, 30)).toEqual([
    9*60, 9*60+30 , 10*60, 10*60+30, 11*60, 11*60+30, 12*60, 12*60+30
  ]) 
})