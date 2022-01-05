import { link } from "fs";
import { Schedule, Section,Timeslot } from "../src/data/DataDefinition/SectionDD";
const fns = require("./optional");
const ex = require("../tests/constants");


// test("empty courses returns empty", () =>{
//   expect(fns.filter_not_full([])).toEqual([]);
// });
// test("filters out \"Full\" courses", () =>{
//   expect(fns.filter_not_full([ex.CS1, ex.CS1_Full, ex.CS2, ex.CS3, ex.CS3_Restricted, ex.CS2_Full]))
//     .toEqual([ex.CS1, ex.CS2, ex.CS3, ex.CS3_Restricted]);
// });


test("true when all empty", () => {
  expect(fns.crit3_all_req([],[])).toBe(true)
});
test("true when empty chosen", () => {
  expect(fns.crit3_all_req([ex.CS1, ex.CS3, ex.CS4], [])).toBe(true)
});
test("false when only empty courses", () => {
  expect(fns.crit3_all_req([], [ex.CS1NAME, ex.CS3NAME])).toBe(false)
});
test("true when chosen courses match courses", () => {
  expect(fns.crit3_all_req([ex.CS1, ex.CS3, ex.CS4], [ex.CS1NAME, ex.CS3NAME, ex.CS4NAME])).toBe(true)
});
test("true when chosen courses are present and more", () => {
  expect(fns.crit3_all_req([ex.CS1, ex.CS3, ex.CS4, ex.CS5], [ex.CS1NAME, ex.CS3NAME, ex.CS4NAME])).toBe(true)
});
test("false when a course is missing", () => {
  expect(fns.crit3_all_req([ex.CS1, ex.CS4], [ex.CS1NAME, ex.CS3NAME, ex.CS4NAME])).toBe(false)
});

test("false when empty and req number > 0", () => {
  expect(fns.crit4_number_req([], 2)).toBe(false)
});
test("number of courses matches req number", () => {
  expect(fns.crit4_number_req([ex.CS1, ex.CS2, ex.CS3], 3)).toBe(true)
});
test("false if not enough courses", () => {
  expect(fns.crit4_number_req([ex.CS1, ex.CS2], 3)).toBe(false)
});
