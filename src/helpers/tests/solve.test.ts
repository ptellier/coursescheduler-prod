import { ListOfSection, Section } from "../../data/DataDefinition/SectionDD";
import {
  empty,
  matchCourse,
  alreadyContains,
  complete,
  solve,
} from "../solve";

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

const COURSES: ListOfSection = [
  CPSC121_101,
  CPSC121_102,
  CPSC121_103,
  CPSC110_101,
  CPSC110_102,
  CPSC210_101,
  CPSC210_102,
];

test("empty: produce true if a list is empty", () => {
  expect(empty([1, 2, 3])).toEqual(false);
  expect(empty([])).toEqual(true);
});

test("matchCourse: produce true if c1 and c2 have same course subject and number", () => {
  expect(matchCourse(CPSC121_101, CPSC121_102)).toEqual(true);
  expect(matchCourse(CPSC121_101, CPSC110_101)).toEqual(false);
});

test("alreadyContains: produce true given list contains duplicate course", () => {
  expect(alreadyContains([])).toEqual(false);
  expect(alreadyContains([CPSC121_101])).toEqual(false);
  expect(alreadyContains([CPSC121_101, CPSC121_102])).toEqual(true);
  expect(alreadyContains([CPSC121_101, CPSC110_102, CPSC210_101])).toEqual(false);
  expect(alreadyContains([CPSC121_101, CPSC110_102, CPSC210_101, CPSC210_102])).toEqual(
    true
  );
});

test("completed: produce true assigned contains all neccessary courses in og-loc", () => {
  expect(complete([], COURSES)).toEqual(false);
  expect(complete([CPSC121_101], COURSES)).toEqual(false);
  expect(complete([CPSC121_101, CPSC110_101], COURSES)).toEqual(false);
  expect(complete([CPSC121_101, CPSC110_101, CPSC210_101], COURSES)).toEqual(true);
});

test("solve ", () => {
  expect(solve(COURSES)).toEqual([
    [CPSC210_101, CPSC110_101, CPSC121_101],
    [CPSC210_102, CPSC110_101, CPSC121_101],
    [CPSC210_101, CPSC110_102, CPSC121_101],
    [CPSC210_102, CPSC110_102, CPSC121_101],
    [CPSC210_101, CPSC110_101, CPSC121_102],
    [CPSC210_102, CPSC110_101, CPSC121_102],
    [CPSC210_101, CPSC110_102, CPSC121_102],
    [CPSC210_102, CPSC110_102, CPSC121_102],
    [CPSC210_101, CPSC110_101, CPSC121_103],
    [CPSC210_102, CPSC110_101, CPSC121_103],
    [CPSC210_101, CPSC110_102, CPSC121_103],
    [CPSC210_102, CPSC110_102, CPSC121_103],
  ]);
  expect(solve([CPSC121_101, CPSC121_102, CPSC110_101, CPSC210_101])).toEqual([
    [CPSC210_101, CPSC110_101, CPSC121_101],
    [CPSC210_101, CPSC110_101, CPSC121_102],
  ])
});
