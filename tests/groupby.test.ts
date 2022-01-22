import React from "react";
import { Section, Timeslot, Schedule } from "../src/data/DataDefinition/SectionDD";
import { groupDays, groupSections, group5Days, splitSectionSchedule } from "../src/helpers/groupby";
import { getCourseString, getLOCourseString } from "./checkhelp";

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
  schedule: [],
  link: "",
};
const CPSC121_102: Section = {
  name: "CPSC 121 102",
  subject: "CPSC",
  section: "102",
  course: "121",
  status: "Available",
  activity: "Lecture",
  term: "2",
  schedule: [],
  link: "",
};
const CPSC121_103: Section = {
  name: "CPSC 121 103",
  subject: "CPSC",
  section: "103",
  course: "121",
  status: "Available",
  activity: "Lecture",
  term: "2",
  schedule: [],
  link: "",
};
const CPSC110_101: Section = {
  name: "CPSC 110 101",
  subject: "CPSC",
  section: "101",
  course: "110",
  status: "Available",
  activity: "Lecture",
  term: "2",
  schedule: [],
  link: "",
};
const CPSC110_102: Section = {
  name: "CPSC 110 102",
  subject: "CPSC",
  section: "102",
  course: "110",
  status: "Available",
  activity: "Lecture",
  term: "2",
  schedule: [],
  link: "",
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
  link: "",
};
const CPSC210_102: Section = {
  name: "CPSC 210 102",
  subject: "CPSC",
  section: "102",
  course: "210",
  status: "Available",
  activity: "Lecture",
  term: "2",
  schedule: [],
  link: "",
};
const COMM388_101: Section = {
  course: "388",
  section: "101",
  subject: "COMM",
  activity: "Lecture",
  link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=COMM&course=388&section=101&campuscd=UBC",
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
  link: "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=COMM&course=388&section=101&campuscd=UBC",
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
  expect(groupSections([CPSC121_101, CPSC121_102, CPSC110_101, COMM388_101, BIOL121_101])).toEqual(
    [
      [CPSC121_101, CPSC121_102],
      [CPSC110_101],
      [COMM388_101],
      [BIOL121_101],
    ]
  );
});

// organize back to constants once phillip resolves the bug
const TS2: Timeslot = { start_time: 940, end_time: 980, day: "Wed", term: "2" };
const TS5: Timeslot = { start_time: 180, end_time: 210, day: "Wed", term: "2" };
const TS6: Timeslot = { start_time: 250, end_time: 310, day: "Wed", term: "2" };
const TS_mon_1: Timeslot = { start_time: 250, end_time: 310, day: "Mon", term: "2" };
const TS_mon_2: Timeslot = { start_time: 350, end_time: 410, day: "Mon", term: "2" };
const TS_tue_1: Timeslot = { start_time: 100, end_time: 200, day: "Tue", term: "2" };
const TS_tue_2: Timeslot = { start_time: 300, end_time: 400, day: "Tue", term: "2" };
const TS_wed_1: Timeslot = { start_time: 100, end_time: 200, day: "Wed", term: "2" };
const TS_wed_2: Timeslot = { start_time: 300, end_time: 400, day: "Wed", term: "2" };

test('groupDays', () => {
  expect(groupDays([])).toEqual([])
  expect(groupDays([TS2, TS5, TS6])).toEqual([[TS2, TS5, TS6]])
  expect(groupDays([TS_mon_1, TS_tue_1, TS_wed_1, TS_mon_2, TS_tue_2, TS_wed_2])).toEqual(
    [[TS_mon_1, TS_mon_2], [TS_tue_1, TS_tue_2], [TS_wed_1, TS_wed_2]]
  )
})

test("splitSectionSchedule", () => {
  const CS6_2TS_TUE:Section = cloneDeep(ex.CS6_2TS); 
  CS6_2TS_TUE.schedule = [ex.CS6_2TS.schedule[0]];
  const CS6_2TS_THU:Section = cloneDeep(ex.CS6_2TS); 
  CS6_2TS_THU.schedule = [ex.CS6_2TS.schedule[1]];

  expect(splitSectionSchedule([])).toEqual([]);
  expect(splitSectionSchedule([ex.CS1])).toEqual([ex.CS1]);
  expect(splitSectionSchedule([ex.CS6_2TS])).toEqual([CS6_2TS_TUE, CS6_2TS_THU]);
  expect(splitSectionSchedule([ex.CS6_2TS, ex.CS1, ex.CS2])).toEqual([CS6_2TS_TUE, CS6_2TS_THU, ex.CS1, ex.CS2]);
  expect(splitSectionSchedule([ex.CS1, ex.CS6_2TS, ex.CS2])).toEqual([ex.CS1, CS6_2TS_TUE, CS6_2TS_THU, ex.CS2]);
  expect(splitSectionSchedule([ex.CS1, ex.CS2, ex.CS6_2TS,])).toEqual([ex.CS1, ex.CS2, CS6_2TS_TUE, CS6_2TS_THU]);
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

