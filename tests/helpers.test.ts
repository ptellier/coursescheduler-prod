import { link } from "fs";
import { Schedule, Section,Timeslot } from "../src/data/DataDefinition/SectionDD";
const fns = require("../src/helpers.ts");

//CONSTANTS:

const CS1: Section = {
  name: "CPSC 110 102",
  subject: "CPSC",
  course: "110",
  section: "102",
  activity: "Laboratory",
  schedule: [{start_time: 900,
              end_time: 960,
              day: "Wed",
              term: "2"}],
  status: "Available",
  term: "2",
  link:"www.asdfghjkl.com"
};
const CS1NAME: string = fns.get_course_name(CS1);

const CS2: Section = {
  name: "CPSC 121 102",
  subject: "CPSC",
  course: "121",
  section: "102",
  activity: "Tutorial",
  schedule: [{start_time: 930,
              end_time: 990,
              day: "Wed",
              term: "2"}],
  status: "Available",
  term: "2",
  link:"www.asdfghjkl.com"
};
const CS2NAME: string = fns.get_course_name(CS2);

const CS3: Section = {
  name: "CPSC 121 T02",
  subject: "CPSC",
  course: "121",
  section: "T02",
  activity: "Tutorial",
  schedule: [{start_time: 1020,
              end_time: 1050,
              day: "Wed",
              term: "2"}],
  status: "Available",
  term: "2",
  link:"www.asdfghjkl.com"
};
const CS3NAME: string = fns.get_course_name(CS3);

const CS4: Section = {
  name: "STAT 302 T02",
  subject: "STAT",
  course: "302",
  section: "T02",
  activity: "Tutorial",
  schedule: [{start_time: 60,
              end_time: 120,
              day: "Wed",
              term: "2"}],
  status: "Available",
  term: "2",
  link:"www.asdfghjkl.com"
};
const CS4NAME: string = fns.get_course_name(CS4);

const CS5: Section = {
  name: "ENGL 301 102",
  subject: "ENGL",
  course: "301",
  section: "102",
  activity: "Lecture",
  schedule: [{start_time: 340,
              end_time: 370,
              day: "Wed",
              term: "2"}],
  status: "Available",
  term: "2",
  link:"www.asdfghjkl.com"
};
const CS5NAME: string = fns.get_course_name(CS5);

const CS1_Full: Section = Object.assign({}, CS1);
CS1_Full.status = "Full";

const CS2_Full: Section = Object.assign({}, CS2);
CS2_Full.status = "Full";

const CS3_Restricted: Section = Object.assign({}, CS3);
CS3_Restricted.status = "Restricted";

const SCHD1_1: Schedule = [
  {start_time:900, end_time:950, day:"Mon",term:"2"},
  {start_time:800, end_time:850, day:"Wed",term:"2"},
  {start_time:800, end_time:850, day:"Fri",term:"2"}
];
const SCHD1_2: Schedule = [
  {start_time:800, end_time:850, day:"Mon",term:"2"},
  {start_time:900, end_time:950, day:"Wed",term:"2"},
  {start_time:800, end_time:850, day:"Fri",term:"2"}
];
const SCHD1_3: Schedule = [
  {start_time:800, end_time:850, day:"Mon",term:"2"},
  {start_time:800, end_time:850, day:"Wed",term:"2"},
  {start_time:900, end_time:950, day:"Fri",term:"2"}
];
const SCHD2: Schedule = [
  {start_time:900, end_time:950, day:"Mon",term:"2"},
  {start_time:900, end_time:950, day:"Wed",term:"2"},
  {start_time:900, end_time:950, day:"Fri",term:"2"}
];
const SCHD3: Schedule = [
  {start_time:1000, end_time:1050, day:"Mon",term:"2"},
  {start_time:1000, end_time:1050, day:"Wed",term:"2"},
  {start_time:1000, end_time:1050, day:"Fri",term:"2"}
];
const SCHD4: Schedule = [
  {start_time:1100, end_time:1150, day:"Mon",term:"2"},
  {start_time:1100, end_time:1150, day:"Wed",term:"2"},
  {start_time:1100, end_time:1150, day:"Fri",term:"2"}];

const CS1_3TS_1: Section = Object.assign({}, CS1);
CS1_3TS_1.schedule = SCHD1_1;
const CS1_3TS_2: Section = Object.assign({}, CS1);
CS1_3TS_2.schedule = SCHD1_2;
const CS1_3TS_3: Section = Object.assign({}, CS1);
CS1_3TS_3.schedule = SCHD1_3;
const CS2_3TS: Section = Object.assign({}, CS2);
CS2_3TS.schedule = SCHD2;
const CS3_3TS: Section = Object.assign({}, CS3);
CS3_3TS.schedule = SCHD3;
const CS4_3TS: Section = Object.assign({}, CS4);
CS4_3TS.schedule = SCHD4;
  



const TS2: Timeslot = 
{start_time: 940,
  end_time: 980,
  day: "Wed",
  term: "2"
}

const TS5: Timeslot = 
{start_time: 180,
  end_time: 210,
  day: "Wed",
  term: "2"
}

const TS6: Timeslot = 
{start_time: 250,
  end_time: 310,
  day: "Wed",
  term: "2"
}

/*------------------------------------------------*/
//TESTS:
test("create a timeslot(1)", () => {
  expect(fns.make_timeslot("15:00","16:30","Wed","2"))
    .toEqual(  
      {start_time: 900,
      end_time: 990,
      day: "Wed",
      term: "2"})
});
test("create a timeslot(2)", () => {
  expect(fns.make_timeslot("00:00","23:59","Fri","summer"))
    .toEqual(  
      {start_time: 0,
      end_time: 1439,
      day: "Fri",
      term: "summer"})
});

test("overlap is false: timeslot2 starts after timeslot1", () => {
  expect(fns.is_overlap_timeslots(
    fns.make_timeslot("15:00","16:30","Wed","2"),
    fns.make_timeslot("16:40","18:00","Wed","2")
  )).toBe(false)
});
test("overlap is true: timeslot1 ends after timeslot2 starts", () => {
  expect(fns.is_overlap_timeslots(
    fns.make_timeslot("15:00","16:30","Wed","2"),
    fns.make_timeslot("16:20","17:00","Wed","2")
  )).toBe(true)
});
test("overlap is true: timeslot2 ends after timeslot1 starts", () => {
  expect(fns.is_overlap_timeslots(
    fns.make_timeslot("16:20","17:00","Wed","2"),
    fns.make_timeslot("15:00","16:30","Wed","2")
  )).toBe(true)
});
test("overlap is true: timeslot2 is within timeslot1", () => {
  expect(fns.is_overlap_timeslots(
    fns.make_timeslot("7:00","8:00","Wed","2"),
    fns.make_timeslot("7:20","7:30","Wed","2")
  )).toBe(true)
});
test("overlap is true: timeslot1 is within timeslot2", () => {
  expect(fns.is_overlap_timeslots(
    fns.make_timeslot("7:20","7:30","Wed","2"),
    fns.make_timeslot("7:00","8:00","Wed","2")
  )).toBe(true)
});
test("overlap is false: start of timeslot1 == end of timeslot2", () => {
  expect(fns.is_overlap_timeslots(
    fns.make_timeslot("8:00","9:00","Wed","2"),
    fns.make_timeslot("7:00","8:00","Wed","2")
  )).toBe(false)
});
test("overlap is true: same timeslots", () => {
  expect(fns.is_overlap_timeslots(
    fns.make_timeslot("7:00","8:00","Wed","2"),
    fns.make_timeslot("7:00","8:00","Wed","2")
  )).toBe(true)
});
test("overlap is false: different days", () => {
  expect(fns.is_overlap_timeslots(
    fns.make_timeslot("7:00","8:00","Wed","2"),
    fns.make_timeslot("7:00","8:00","Thur","2")
  )).toBe(false)
});
test("overlap is false: different terms", () => {
  expect(fns.is_overlap_timeslots(
    fns.make_timeslot("7:00","8:00","Wed","1"),
    fns.make_timeslot("7:00","8:00","Wed","2")
  )).toBe(false)
});

test("overlap is false: schedules don't overlap", () => {
  expect(fns.is_overlap_schedules(SCHD3, SCHD2)).toBe(false)
  expect(fns.is_overlap_schedules(SCHD2, SCHD3)).toBe(false)
});
test("overlap is true: 1st timeslots of schedules overlap", () => {
  expect(fns.is_overlap_schedules(SCHD1_1, SCHD2)).toBe(true)
  expect(fns.is_overlap_schedules(SCHD2, SCHD1_1)).toBe(true)
});
test("overlap is true: 2nd timeslots of schedules overlap", () => {
  expect(fns.is_overlap_schedules(SCHD1_2, SCHD2)).toBe(true)
  expect(fns.is_overlap_schedules(SCHD2, SCHD1_2)).toBe(true)
});
test("overlap is true: 3rd timeslots of schedules overlap", () => {
  expect(fns.is_overlap_schedules(SCHD1_3, SCHD2)).toBe(true)
  expect(fns.is_overlap_schedules(SCHD2, SCHD1_3)).toBe(true)
});

test("overlap is false: sections don't overlap", () => {
  expect(fns.is_overlap_sections(CS2_3TS, CS3_3TS)).toBe(false)
  expect(fns.is_overlap_sections(CS3_3TS, CS2_3TS)).toBe(false)
});
test("overlap is true: sections overlap", () => {
  expect(fns.is_overlap_sections(CS1_3TS_1, CS2_3TS)).toBe(true)
  expect(fns.is_overlap_sections(CS2_3TS, CS1_3TS_1)).toBe(true)
});



test("empty courses returns empty", () =>{
  expect(fns.filter_not_full([])).toEqual([]);
});
test("filters out \"Full\" courses", () =>{
  expect(fns.filter_not_full([CS1, CS1_Full, CS2, CS3, CS3_Restricted, CS2_Full]))
    .toEqual([CS1, CS2, CS3, CS3_Restricted]);
});

test("true when empty", () => {
  expect(fns.crit1_not_same_time([])).toBe(true)
});
test("true when no courses overlap", () => {
  expect(fns.crit1_not_same_time([CS2, CS3, CS4])).toBe(true)
});
test("false when there are courses overlapping", () => {
  expect(fns.crit1_not_same_time([CS4, CS1, CS2])).toBe(false)
});

test("true when both empty", () => {
  expect(fns.crit2_not_bad_time([], [])).toBe(true)
});
test("true when empty badtimes", () => {
  expect(fns.crit2_not_bad_time([CS3, CS2, CS4], [])).toBe(true)
});
test("true when no courses overlap bad time", () => {
  expect(fns.crit2_not_bad_time([CS3, CS2, CS4], [TS5, TS6])).toBe(true)
});
test("false when course overlaps a bad time", () => {
  expect(fns.crit2_not_bad_time([CS3, CS2, CS4], [TS5, TS2, TS6])).toBe(false)
});

test("true when all empty", () => {
  expect(fns.crit3_all_chosen([],[])).toBe(true)
});
test("true when empty chosen", () => {
  expect(fns.crit3_all_chosen([CS1, CS3, CS4], [])).toBe(true)
});
test("false when only empty courses", () => {
  expect(fns.crit3_all_chosen([], [CS1NAME, CS3NAME])).toBe(false)
});
test("true when chosen courses match courses", () => {
  expect(fns.crit3_all_chosen([CS1, CS3, CS4], [CS1NAME, CS3NAME, CS4NAME])).toBe(true)
});
test("true when chosen courses are present and more", () => {
  expect(fns.crit3_all_chosen([CS1, CS3, CS4, CS5], [CS1NAME, CS3NAME, CS4NAME])).toBe(true)
});
test("false when a course is missing", () => {
  expect(fns.crit3_all_chosen([CS1, CS4], [CS1NAME, CS3NAME, CS4NAME])).toBe(false)
});

test("false when empty and req number > 0", () => {
  expect(fns.crit4_number_of([], 2)).toBe(false)
});
test("number of courses matches req number", () => {
  expect(fns.crit4_number_of([CS1, CS2, CS3], 3)).toBe(true)
});
test("false if not enough courses", () => {
  expect(fns.crit4_number_of([CS1, CS2], 3)).toBe(false)
});
