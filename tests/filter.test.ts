import React from "react";
import { Section } from "../src/data/DataDefinition/SectionDD";
import {
  filter_duplicate_schedules,
  filter_term_avail_waitlist,
} from "../src/helpers/filter";

// TODO: Run tests ASAP

const CPSC110_101:Section = {
  name: "CPSC 110 101",
  subject: "CPSC",
  section: "101",
  course: "110",
  status: "Available",
  activity: "Lecture",
  term: "1",
  schedule: [
    { day: "Tue", term: "1", start_time: 11*60, end_time: (12*60+30) },
    { day: "Thu", term: "1", start_time: 11*60, end_time: (12*60+30) },
  ],

};
const CPSC110_102:Section = {
  name: "CPSC 110 102",
  subject: "CPSC",
  section: "102",
  course: "110",
  status: "Available",
  activity: "Lecture",
  term: "1",
  schedule: [
    { day: "Tue", term: "1", start_time: 14*60, end_time: (15*60+30) },
    { day: "Thu", term: "1", start_time: 14*60, end_time: (15*60+30) },
  ],

};

const CPSC110_L12:Section = {
  name: "CPSC 110 L12",
  subject: "CPSC",
  section: "L12",
  course: "110",
  status: "Available",
  activity: "Laboratory",
  term: "1",
  schedule: [{ day: "Mon", term: "1", start_time: 9*60, end_time: 12*60 }],

};
const CPSC110_L1A:Section = {
  name: "CPSC 110 L1A",
  subject: "CPSC",
  section: "L1A",
  course: "110",
  status: "Available",
  activity: "Laboratory",
  term: "1",
  schedule: [{ day: "Mon", term: "1", start_time: 9*60, end_time: 12*60 }],

};
const CPSC110_L1G:Section = {
    name: "CPSC 110 L1G",
    subject: "CPSC",
    section: "L1G",
    course: "110",
    status: "Available",
    activity: "Laboratory",
    term: "1",
    schedule: [{ day: "Wed", term: "1", start_time: 540, end_time: 12*60 }],
  
  };

test("filter_term_avail_waitlist", () => {
  expect(filter_term_avail_waitlist([], "1")).toEqual([]);
});

test("filter_duplicate_schedules", () => {
  expect(filter_duplicate_schedules(
      [CPSC110_L12, CPSC110_L1A]
      )).toEqual([CPSC110_L12]);
  expect(filter_duplicate_schedules(
      [CPSC110_101, CPSC110_102, CPSC110_L12, CPSC110_L1A, CPSC110_L1G]))
      .toEqual([CPSC110_101, CPSC110_102, CPSC110_L12, CPSC110_L1G]);
});
