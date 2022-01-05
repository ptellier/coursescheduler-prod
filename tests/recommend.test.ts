import { Schedule, Section, Timeslot } from "../src/data/DataDefinition/SectionDD";
import {findVariance,
  findLatestEnd,
  findEarliestStart,
  findStartVariance,
  most_consistent,
  most_compact,
  most_scatter,
  most_early_start,
  most_late_start,
  most_early_end,
  most_late_end,
  is_free_day } from "../src/helpers/recommend"
const ex = require("/constants");

test("findVariance", () => {
  expect(findVariance([])).toThrow("cannot take variance of empty array");
  expect(findVariance([8])).toBe(0);
  expect(findVariance([18, 24, 30, 36])).toBe(60);
});

test("find the earliest start", () => {
  expect(findEarliestStart([])).toBe(Number.MAX_VALUE);
  expect(findEarliestStart([ex.TS2])).toBe(ex.TS2.start_time);
  expect(findEarliestStart([ex.TS5, ex.TS2, ex.TS6])).toBe(ex.TS5.start_time);
  expect(findEarliestStart([ex.TS2, ex.TS5, ex.TS6])).toBe(ex.TS5.start_time);
  expect(findEarliestStart([ex.TS2, ex.TS6, ex.TS5])).toBe(ex.TS5.start_time);
});

test("find the latest end", () => {
  expect(findLatestEnd([])).toBe(Number.MIN_VALUE);
  expect(findLatestEnd([ex.TS2])).toBe(ex.TS2.end_time);
  expect(findLatestEnd([ex.TS5, ex.TS2, ex.TS6])).toBe(ex.TS2.end_time);
  expect(findLatestEnd([ex.TS2, ex.TS5, ex.TS6])).toBe(ex.TS2.end_time);
  expect(findLatestEnd([ex.TS2, ex.TS6, ex.TS5])).toBe(ex.TS2.end_time);
});

test("find start variance", () => {
  expect(findStartVariance([])).toThrow("cannot take variance of empty array");
  expect(findStartVariance([ex.CS3])).toBe(0);
  expect(findStartVariance([ex.CS3_3TS])).toBe(0);
  expect(findStartVariance([ex.CS5_3TS])).toBe(327600);
  expect(findStartVariance([ex.CS5_3TS, ex.CS2_3TS])).toBe(159600);
  expect(findStartVariance([ex.CS2_3TS, ex.CS3_3TS])).toBe(159600);
});

test("return most consistent of two schedules (lowest variance of start times)", () => {
  expect(most_consistent([], [])).toThrow("cannot take variance of empty array");
  expect(most_consistent([ex.CS3], [ex.CS3])).toEqual([ex.CS3]);
  expect(most_consistent([ex.CS3], [ex.CS5])).toEqual([ex.CS3]);
  expect(most_consistent([ex.CS5_3TS, ex.CS2_3TS], [ex.CS1_3TS_1, ex.CS3_3TS]))
    .toEqual([ex.CS5_3TS, ex.CS2_3TS]);
  expect(most_consistent([ex.CS1_3TS_1, ex.CS3_3TS], [ex.CS5_3TS, ex.CS2_3TS]))
    .toEqual([ex.CS5_3TS, ex.CS2_3TS]);
});

test("find latest start schedule", () => {
  expect(most_late_start([ex.CS1_3TS_1], [ex.CS1_3TS_1])).toEqual([ex.CS1_3TS_1]);
  expect(most_late_start([ex.CS1_3TS_1], [ex.CS1_3TS_2])).toEqual([ex.CS1_3TS_1]);
  expect(most_late_start([ex.CS1_3TS_1EARLY], [ex.CS2_3TS])).toEqual([ex.CS2_3TS]);
  expect(most_late_start([ex.CS2_3TS], [ex.CS1_3TS_1EARLY])).toEqual([ex.CS2_3TS]);

  expect(most_late_start([ex.CS3_3TS, ex.CS1_3TS_1EARLY], [ex.CS3_3TS, ex.CS2_3TS]))
  .toEqual([ex.CS3_3TS, ex.CS2_3TS]);
  expect(most_late_start([ex.CS3_3TS, ex.CS2_3TS], [ex.CS3_3TS, ex.CS1_3TS_1EARLY]))
  .toEqual([ex.CS3_3TS, ex.CS2_3TS]);
})

test("find earliest end schedule", () => {
  expect(most_early_end([ex.CS1_3TS_1], [ex.CS1_3TS_1])).toEqual([ex.CS1_3TS_1]);
  expect(most_early_end([ex.CS1_3TS_1], [ex.CS1_3TS_2])).toEqual([ex.CS1_3TS_1]);
  expect(most_early_end([ex.CS1_3TS_1LATE], [ex.CS2_3TS])).toEqual([ex.CS2_3TS]);
  expect(most_early_end([ex.CS2_3TS], [ex.CS1_3TS_1LATE])).toEqual([ex.CS2_3TS]);

  expect(most_early_end([ex.CS3_3TS, ex.CS1_3TS_1LATE], [ex.CS3_3TS, ex.CS2_3TS]))
  .toEqual([ex.CS3_3TS, ex.CS2_3TS]);
  expect(most_early_end([ex.CS3_3TS, ex.CS2_3TS], [ex.CS3_3TS, ex.CS1_3TS_1LATE]))
  .toEqual([ex.CS3_3TS, ex.CS2_3TS]);
})

test("is there a free day?", () => {
  expect(is_free_day([ex.CS2_3TS])).toBe(true);
  expect(is_free_day([ex.CS2_3TS, ex.CS3_3TS])).toBe(true);
  expect(is_free_day([ex.CS2_3TS, ex.CS6_2TS])).toBe(false);
})