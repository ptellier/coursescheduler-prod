
import { Section } from "../src/data/DataDefinition/SectionDD";
import {  groupSections, group5Days, groupCellsByName, groupTimeSlotsByDays } from "../src/helpers/groupby";
import { getLOCourseString } from "./checkhelp";

const ex = require("./constants");
const cloneDeep = require('lodash/clonedeep');

const CPSC121_101: Section = {
  name: "CPSC 121 101",
  subject: "CPSC",
  section: "101",
  course: "121",
  status: "Available",
  activity: "Lecture",
  term: "2",
  schedule: [
    { start_time: 12*60, end_time: 13*60, day: "Mon", term: "2" },
    { start_time: 12*60, end_time: 13*60, day: "Wed", term: "2" },
    { start_time: 12*60, end_time: 13*60, day: "Fri", term: "2" }
  ],
};
const CPSC121_102: Section = {
  name: "CPSC 121 102",
  subject: "CPSC",
  section: "102",
  course: "121",
  status: "Available",
  activity: "Lecture",
  term: "2",
  schedule: [
    { start_time: 12*60, end_time: 13*60, day: "Mon", term: "2" },
    { start_time: 12*60, end_time: 13*60, day: "Wed", term: "2" },
    { start_time: 12*60, end_time: 13*60, day: "Fri", term: "2" }
  ],
};
const CPSC121_103: Section = {
  name: "CPSC 121 103",
  subject: "CPSC",
  section: "103",
  course: "121",
  status: "Available",
  activity: "Lecture",
  term: "2",
  schedule: [
    { start_time: 12*60, end_time: 13*60, day: "Mon", term: "2" },
    { start_time: 12*60, end_time: 13*60, day: "Wed", term: "2" },
    { start_time: 12*60, end_time: 13*60, day: "Fri", term: "2" }
  ],
};
const CPSC110_101: Section = {
  name: "CPSC 110 101",
  subject: "CPSC",
  section: "101",
  course: "110",
  status: "Available",
  activity: "Lecture",
  term: "2",
  schedule: [
    { start_time: 14*60, end_time: 17*60, day: "Mon", term: "2" },
    { start_time: 14*60, end_time: 17*60, day: "Wed", term: "2" },
    { start_time: 14*60, end_time: 17*60, day: "Fri", term: "2" }
  ],
};
const CPSC110_102: Section = {
  name: "CPSC 110 102",
  subject: "CPSC",
  section: "102",
  course: "110",
  status: "Available",
  activity: "Lecture",
  term: "2",
  schedule: [
    { start_time: 14*60, end_time: 17*60, day: "Mon", term: "2" },
    { start_time: 14*60, end_time: 17*60, day: "Wed", term: "2" },
    { start_time: 14*60, end_time: 17*60, day: "Fri", term: "2" }
  ],
};
const CPSC210_101: Section = {
  name: "CPSC 210 101",
  subject: "CPSC",
  section: "101",
  course: "210",
  status: "Available",
  activity: "Lecture",
  term: "2",
  schedule: [],
};
const CPSC210_102: Section = {
  name: "CPSC 210 102",
  subject: "CPSC",
  section: "102",
  course: "210",
  status: "Available",
  activity: "Lecture",
  term: "2",
  schedule: [
    { start_time: 9*60, end_time: 10*60, day: "Mon", term: "2" },
    { start_time: 9*60, end_time: 10*60, day: "Wed", term: "2" },
    { start_time: 9*60, end_time: 10*60, day: "Fri", term: "2" }
  ],
};
const COMM388_101: Section = {
  course: "388",
  section: "101",
  subject: "COMM",
  activity: "Lecture",
  name: "COMM 388 101",
  schedule: [
    {
      day: "Wed",
      start_time: 870,
      end_time: 1050,
      term: "1",
    },
  ],
  status: "Restricted",
  term: "1",
};
const BIOL121_101: Section = {
  course: "121",
  section: "101",
  subject: "BIOL",
  activity: "Lecture",
  name: "BIOL 121 101",
  schedule: [
    {
      day: "Wed",
      start_time: 870,
      end_time: 1050,
      term: "1",
    },
  ],
  status: "Available",
  term: "1",
};

test("groupSections", () => {
  expect(groupSections([])).toEqual([]);
  expect(groupSections([CPSC121_101])).toEqual([[CPSC121_101]]);
  expect(groupSections([CPSC121_101, CPSC121_102])).toEqual([
    [CPSC121_101, CPSC121_102],
  ]);
  expect(groupSections([CPSC121_101, CPSC121_102, CPSC110_101])).toEqual([
    [CPSC121_101, CPSC121_102],
    [CPSC110_101],
  ]);
  expect(
    groupSections([
      CPSC121_101,
      CPSC121_102,
      CPSC110_101,
      COMM388_101,
      BIOL121_101,
    ])
  ).toEqual([
    [CPSC121_101, CPSC121_102],
    [CPSC110_101],
    [COMM388_101],
    [BIOL121_101],
  ]);
});

test("groupCellsByTime", () => {
  expect(groupCellsByName([])).toEqual([]);
  expect(
    groupCellsByName([
      { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
      { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
      { time: 10 * 60 + 30, name: `gap_${10 * 60 + 30}`, is_occupied: true },
      { time: 11 * 60 + 30, name: `gap_${11 * 60 + 30}`, is_occupied: true },
      { time: 13 * 60 + 30, name: "CPSC 121 L11", is_occupied: true },
      { time: 14 * 60 + 30, name: "CPSC 121 L11", is_occupied: true },
    ])
  ).toEqual([
    [
      { time: 8 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
      { time: 9 * 60 + 30, name: "CPSC 110 L11", is_occupied: true },
    ],
    [{ time: 10 * 60 + 30, name: `gap_${10 * 60 + 30}`, is_occupied: true }],
    [{ time: 11 * 60 + 30, name: `gap_${11 * 60 + 30}`, is_occupied: true }],
    [
      { time: 13 * 60 + 30, name: "CPSC 121 L11", is_occupied: true },
      { time: 14 * 60 + 30, name: "CPSC 121 L11", is_occupied: true },
    ],
  ]);
});

test("groupTimeSlotsByDays", () => {
  expect(groupTimeSlotsByDays([])).toEqual([]);
  expect(groupTimeSlotsByDays([ex.TS2, ex.TS5, ex.TS6])).toEqual([
    [ex.TS2, ex.TS5, ex.TS6],
  ]);
  expect(
    groupTimeSlotsByDays([
      ex.TS_mon_1,
      ex.TS_tue_1,
      ex.TS_wed_1,
      ex.TS_mon_2,
      ex.TS_tue_2,
      ex.TS_wed_2,
    ])
  ).toEqual([
    [ex.TS_mon_1, ex.TS_mon_2],
    [ex.TS_tue_1, ex.TS_tue_2],
    [ex.TS_wed_1, ex.TS_wed_2],
  ]);
});


test("splitSectionSchedule", () => {
  const CS6_2TS_TUE:Section = cloneDeep(ex.CS6_2TS); 
  CS6_2TS_TUE.schedule = [ex.CS6_2TS.schedule[0]];
  const CS6_2TS_THU:Section = cloneDeep(ex.CS6_2TS); 
  CS6_2TS_THU.schedule = [ex.CS6_2TS.schedule[1]];

})

test('group5Days', () => {
  //expect(group5Days([])).toEqual([[],[],[],[],[]])
  expect(group5Days([ex.CS1])).toEqual([[],[],[ex.CS1],[],[]])
  expect(group5Days([ex.CS1_MON, ex.CS2_TUE, ex.CS3_WED, ex.CS4_THU, ex.CS5_FRI])).toEqual(
    [[ex.CS1_MON],[ex.CS2_TUE],[ex.CS3_WED],[ex.CS4_THU],[ex.CS5_FRI]]
  )
  expect(group5Days([ex.CS2_TUE, ex.CS3_WED, ex.CS4_THU, ex.CS1_MON, ex.CS5_FRI])).toEqual(
    [[ex.CS1_MON],[ex.CS2_TUE],[ex.CS3_WED],[ex.CS4_THU],[ex.CS5_FRI]]
  )
  const CS3_3TS_MON:Section = cloneDeep(ex.CS3_3TS); 
  CS3_3TS_MON.schedule = [ex.CS3_3TS.schedule[0]];
  const CS3_3TS_WED:Section = cloneDeep(ex.CS3_3TS); 
  CS3_3TS_WED.schedule = [ex.CS3_3TS.schedule[1]];
  const CS3_3TS_FRI:Section = cloneDeep(ex.CS3_3TS); 
  CS3_3TS_FRI.schedule = [ex.CS3_3TS.schedule[2]];

  const CS6_2TS_TUE:Section = cloneDeep(ex.CS6_2TS); 
  CS6_2TS_TUE.schedule = [ex.CS6_2TS.schedule[0]];
  const CS6_2TS_THU:Section = cloneDeep(ex.CS6_2TS); 
  CS6_2TS_THU.schedule = [ex.CS6_2TS.schedule[1]];
  

  expect(group5Days([ex.CS2_TUE, ex.CS3_3TS, ex.CS4_THU, ex.CS1_MON, ex.CS6_2TS]).map(getLOCourseString)).toEqual(
    [
      [CS3_3TS_MON, ex.CS1_MON],
      [ex.CS2_TUE, CS6_2TS_TUE],
      [CS3_3TS_WED],
      [ex.CS4_THU, CS6_2TS_THU],
      [CS3_3TS_FRI]
    ].map(getLOCourseString)
  )
})

