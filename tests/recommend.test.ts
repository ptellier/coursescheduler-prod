import {
  Schedule,
  Section,
  Timeslot,
} from "../src/data/DataDefinition/SectionDD";
import {
  findVariance,
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
  is_free_day,
  sort_timeslots,
  calculate_timegap,
} from "../src/helpers/recommend";

const ex = require("./constants");

test("findVariance", () => {
  expect(() => findVariance([])).toThrow("cannot take variance of empty array");
  expect(findVariance([8])).toBe(0);
  expect(findVariance([18, 24, 30, 36])).toBe(45);
});

test("find the earliest start", () => {
  //expect(() => findEarliestStart([])).toThrow("cannot find earliest start of empty array");
  expect(findEarliestStart([ex.TS2])).toBe(ex.TS2.start_time);
  expect(findEarliestStart([ex.TS5, ex.TS2, ex.TS6])).toBe(ex.TS5.start_time);
  expect(findEarliestStart([ex.TS2, ex.TS5, ex.TS6])).toBe(ex.TS5.start_time);

  expect(findEarliestStart([ex.TS2, ex.TS6, ex.TS5])).toBe(ex.TS5.start_time);
});

test("find the latest end", () => {
  expect(() => findLatestEnd([])).toThrow(
    "cannot find latest end of empty array"
  );
  expect(findLatestEnd([ex.TS2])).toBe(ex.TS2.end_time);
  expect(findLatestEnd([ex.TS5, ex.TS2, ex.TS6])).toBe(ex.TS2.end_time);
  expect(findLatestEnd([ex.TS2, ex.TS5, ex.TS6])).toBe(ex.TS2.end_time);
  expect(findLatestEnd([ex.TS2, ex.TS6, ex.TS5])).toBe(ex.TS2.end_time);
});

test("find start variance", () => {
  expect(() => findStartVariance([])).toThrow(
    "cannot take variance of empty array"
  );
  expect(findStartVariance([ex.CS3])).toBe(0);
  expect(findStartVariance([ex.CS3_3TS])).toBe(0);
  expect(findStartVariance([ex.CS5_3TS])).toBe(218400);
  expect(findStartVariance([ex.CS5_3TS, ex.CS2_3TS])).toBe(106400);
  expect(findStartVariance([ex.CS2_3TS, ex.CS5_3TS])).toBe(106400);
});

test("return most consistent of two schedules (lowest variance of start times)", () => {
  expect(() => most_consistent([], [])).toThrow(
    "cannot take variance of empty array"
  );
  expect(most_consistent([ex.CS3], [ex.CS3])).toEqual([ex.CS3]);
  expect(most_consistent([ex.CS3], [ex.CS5])).toEqual([ex.CS3]);
  expect(
    most_consistent([ex.CS5_3TS, ex.CS2_3TS], [ex.CS1_3TS_1, ex.CS3_3TS])
  ).toEqual([ex.CS1_3TS_1, ex.CS3_3TS]);
  expect(
    most_consistent([ex.CS1_3TS_1, ex.CS3_3TS], [ex.CS5_3TS, ex.CS2_3TS])
  ).toEqual([ex.CS1_3TS_1, ex.CS3_3TS]);
});

test("find latest start schedule", () => {
  expect(most_late_start([ex.CS1_3TS_1], [ex.CS1_3TS_1])).toEqual([
    ex.CS1_3TS_1,
  ]);
  expect(most_late_start([ex.CS1_3TS_1], [ex.CS1_3TS_2])).toEqual([
    ex.CS1_3TS_1,
  ]);
  expect(most_late_start([ex.CS1_3TS_1EARLY], [ex.CS2_3TS])).toEqual([
    ex.CS2_3TS,
  ]);
  expect(most_late_start([ex.CS2_3TS], [ex.CS1_3TS_1EARLY])).toEqual([
    ex.CS2_3TS,
  ]);

  expect(
    most_late_start([ex.CS3_3TS, ex.CS1_3TS_1EARLY], [ex.CS3_3TS, ex.CS2_3TS])
  ).toEqual([ex.CS3_3TS, ex.CS2_3TS]);
  expect(
    most_late_start([ex.CS3_3TS, ex.CS2_3TS], [ex.CS3_3TS, ex.CS1_3TS_1EARLY])
  ).toEqual([ex.CS3_3TS, ex.CS2_3TS]);
});

test("find earliest end schedule", () => {
  expect(most_early_end([ex.CS1_3TS_1], [ex.CS1_3TS_1])).toEqual([
    ex.CS1_3TS_1,
  ]);
  expect(most_early_end([ex.CS1_3TS_1], [ex.CS1_3TS_2])).toEqual([
    ex.CS1_3TS_1,
  ]);
  expect(most_early_end([ex.CS1_3TS_1LATE], [ex.CS2_3TS])).toEqual([
    ex.CS2_3TS,
  ]);
  expect(most_early_end([ex.CS2_3TS], [ex.CS1_3TS_1LATE])).toEqual([
    ex.CS2_3TS,
  ]);

  expect(
    most_early_end([ex.CS3_3TS, ex.CS1_3TS_1LATE], [ex.CS3_3TS, ex.CS2_3TS])
  ).toEqual([ex.CS3_3TS, ex.CS2_3TS]);
  expect(
    most_early_end([ex.CS3_3TS, ex.CS2_3TS], [ex.CS3_3TS, ex.CS1_3TS_1LATE])
  ).toEqual([ex.CS3_3TS, ex.CS2_3TS]);
});

test("is there a free day?", () => {
  expect(is_free_day([ex.CS2_3TS])).toBe(true);
  expect(is_free_day([ex.CS2_3TS, ex.CS3_3TS])).toBe(true);
  expect(is_free_day([ex.CS2_3TS, ex.CS6_2TS])).toBe(false);
});

test('most_scatter', () => {
  expect(most_scatter([],[])).toEqual([])
  expect(most_scatter(ex.MOSTSCATTER,ex.MOSTSCATTER)).toEqual(ex.MOSTSCATTER)
  expect(most_scatter(ex.MOSTCOMPACT,ex.MOSTSCATTER)).toEqual(ex.MOSTSCATTER)
})

test('most_compact', () => {
  expect(most_compact([],[])).toEqual([])
  expect(most_compact(ex.MOSTCOMPACT,ex.MOSTCOMPACT)).toEqual(ex.MOSTCOMPACT)
  expect(most_compact(ex.MOSTCOMPACT,ex.MOSTSCATTER)).toEqual(ex.MOSTCOMPACT)
})

test("calculate_timegap", () => {
  expect(calculate_timegap([])).toBe(0)
  expect(calculate_timegap([ex.CPSC110])).toBe(0)
  expect(calculate_timegap([ex.CPSC110, ex.CPSC121, ex.CPSC210])).toBe(9)
  expect(calculate_timegap([ex.ECON101, ex.ECON102])).toBe(10)
  expect(calculate_timegap([ex.ECON101_compact, ex.ECON102_compact])).toBe(2)
  expect(calculate_timegap([ex.CPSC110_compact, ex.CPSC121_compact, ex.CPSC210_compact])).toBe(0)
})

test("sort_timeslots", () => {
  expect(sort_timeslots([])).toEqual([]);
  expect(
    sort_timeslots([
      { start_time: 900, end_time: 1020, day: "Tue", term: "2" },
      { start_time: 1030, end_time: 1090, day: "Tue", term: "2" },
    ])
  ).toEqual([
    { start_time: 900, end_time: 1020, day: "Tue", term: "2" },
    { start_time: 1030, end_time: 1090, day: "Tue", term: "2" },
  ]);
  expect(
    sort_timeslots([
      { start_time: 1030, end_time: 1090, day: "Tue", term: "2" },
      { start_time: 900, end_time: 1020, day: "Tue", term: "2" },
    ])
  ).toEqual([
    { start_time: 900, end_time: 1020, day: "Tue", term: "2" },
    { start_time: 1030, end_time: 1090, day: "Tue", term: "2" },
  ]);
  expect(
    sort_timeslots([
      { start_time: 1030, end_time: 1090, day: "Tue", term: "2" },
      { start_time: 1130, end_time: 1290, day: "Tue", term: "2" },
      { start_time: 900, end_time: 1020, day: "Tue", term: "2" },
    ])
  ).toEqual([
    { start_time: 900, end_time: 1020, day: "Tue", term: "2" },
    { start_time: 1030, end_time: 1090, day: "Tue", term: "2" },
    { start_time: 1130, end_time: 1290, day: "Tue", term: "2" },
  ]);
});
