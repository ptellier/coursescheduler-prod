import { link } from "fs";
import { make_timeslot, is_overlap_timeslots, is_overlap_schedules,
   is_overlap_sections, is_overlap_losections, is_overlap_bad_times } from "../src/helpers/overlap";
import { Section,Timeslot } from "../src/data/DataDefinition/SectionDD";
const ex = require("./constants");

/*------------------------------------------------*/
//TESTS:
test("create a timeslot(1)", () => {
  expect(make_timeslot("15:00","16:30","Wed","2"))
    .toEqual(  
      {start_time: 900,
      end_time: 990,
      day: "Wed",
      term: "2"})
});
test("create a timeslot(2)", () => {
  expect(make_timeslot("00:00","23:59","Fri","1 - 2"))
    .toEqual(  
      {start_time: 0,
      end_time: 1439,
      day: "Fri",
      term: "1 - 2"})
});

test("overlap is false: timeslot2 starts after timeslot1", () => {
  expect(is_overlap_timeslots(
    make_timeslot("15:00","16:30","Wed","2"),
    make_timeslot("16:40","18:00","Wed","2")
  )).toBe(false)
});
test("overlap is true: timeslot1 ends after timeslot2 starts", () => {
  expect(is_overlap_timeslots(
    make_timeslot("15:00","16:30","Wed","2"),
    make_timeslot("16:20","17:00","Wed","2")
  )).toBe(true)
});
test("overlap is true: timeslot2 ends after timeslot1 starts", () => {
  expect(is_overlap_timeslots(
    make_timeslot("16:20","17:00","Wed","2"),
    make_timeslot("15:00","16:30","Wed","2")
  )).toBe(true)
});
test("overlap is true: timeslot2 is within timeslot1", () => {
  expect(is_overlap_timeslots(
    make_timeslot("7:00","8:00","Wed","2"),
    make_timeslot("7:20","7:30","Wed","2")
  )).toBe(true)
});
test("overlap is true: timeslot1 is within timeslot2", () => {
  expect(is_overlap_timeslots(
    make_timeslot("7:20","7:30","Wed","2"),
    make_timeslot("7:00","8:00","Wed","2")
  )).toBe(true)
});
test("overlap is false: start of timeslot1 == end of timeslot2", () => {
  expect(is_overlap_timeslots(
    make_timeslot("8:00","9:00","Wed","2"),
    make_timeslot("7:00","8:00","Wed","2")
  )).toBe(false)
});
test("overlap is true: same timeslots", () => {
  expect(is_overlap_timeslots(
    make_timeslot("7:00","8:00","Wed","2"),
    make_timeslot("7:00","8:00","Wed","2")
  )).toBe(true)
});
test("overlap is false: different days", () => {
  expect(is_overlap_timeslots(
    make_timeslot("7:00","8:00","Wed","2"),
    make_timeslot("7:00","8:00","Thu","2")
  )).toBe(false)
});
test("overlap is false: different terms", () => {
  expect(is_overlap_timeslots(
    make_timeslot("7:00","8:00","Wed","1"),
    make_timeslot("7:00","8:00","Wed","2")
  )).toBe(false)
});

test("overlap is false: schedules don't overlap", () => {
  expect(is_overlap_schedules(ex.SCHD3, ex.SCHD2)).toBe(false)
  expect(is_overlap_schedules(ex.SCHD2, ex.SCHD3)).toBe(false)
});
test("overlap is true: 1st timeslots of schedules overlap", () => {
  expect(is_overlap_schedules(ex.SCHD1_1, ex.SCHD2)).toBe(true)
  expect(is_overlap_schedules(ex.SCHD2, ex.SCHD1_1)).toBe(true)
});
test("overlap is true: 2nd timeslots of schedules overlap", () => {
  expect(is_overlap_schedules(ex.SCHD1_2, ex.SCHD2)).toBe(true)
  expect(is_overlap_schedules(ex.SCHD2, ex.SCHD1_2)).toBe(true)
});
test("overlap is true: 3rd timeslots of schedules overlap", () => {
  expect(is_overlap_schedules(ex.SCHD1_3, ex.SCHD2)).toBe(true)
  expect(is_overlap_schedules(ex.SCHD2, ex.SCHD1_3)).toBe(true)
});

test("overlap is false: sections don't overlap", () => {
  expect(is_overlap_sections(ex.CS2_3TS, ex.CS3_3TS)).toBe(false)
  expect(is_overlap_sections(ex.CS3_3TS, ex.CS2_3TS)).toBe(false)
});
test("overlap is true: sections overlap", () => {
  expect(is_overlap_sections(ex.CS1_3TS_1, ex.CS2_3TS)).toBe(true)
  expect(is_overlap_sections(ex.CS2_3TS, ex.CS1_3TS_1)).toBe(true)
});



test("true when empty", () => {
  expect(is_overlap_losections([])).toBe(true)
});
test("true when no courses overlap", () => {
  expect(is_overlap_losections([ex.CS2, ex.CS3, ex.CS4])).toBe(true)
});
test("false when there are courses overlapping", () => {
  expect(is_overlap_losections([ex.CS4, ex.CS1, ex.CS2])).toBe(false)
});

test("true when both empty", () => {
  expect(is_overlap_bad_times([], [])).toBe(true)
});
test("true when empty badtimes", () => {
  expect(is_overlap_bad_times([ex.CS3, ex.CS2, ex.CS4], [])).toBe(true)
});
test("true when no courses overlap bad time", () => {
  expect(is_overlap_bad_times([ex.CS3, ex.CS2, ex.CS4], [ex.TS5, ex.TS6])).toBe(true)
});
test("false when course overlaps a bad time", () => {
  expect(is_overlap_bad_times([ex.CS3, ex.CS2, ex.CS4], [ex.TS5, ex.TS2, ex.TS6])).toBe(false)
});