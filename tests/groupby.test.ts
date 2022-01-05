import React from "react";
import { Section, Timeslot } from "../src/data/DataDefinition/SectionDD";
import { groupDays, groupSections } from "../src/helpers/groupby";
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