import { ListOfSection, Section } from "../src/data/DataDefinition/SectionDD";
import {
  empty,
  matchCourse,
  isDuplicateSection,
  complete,
  solve,
  solve_opti,
} from "../src/helpers/solve";

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

test("isDuplicateSection: produce true given list contains duplicate course", () => {
  expect(isDuplicateSection([])).toEqual(false);
  expect(isDuplicateSection([CPSC121_101])).toEqual(false);
  expect(isDuplicateSection([CPSC121_101, CPSC121_102])).toEqual(true);
  expect(isDuplicateSection([CPSC121_101, CPSC110_102, CPSC210_101])).toEqual(false);
  expect(isDuplicateSection([CPSC121_101, CPSC110_102, CPSC210_101, CPSC210_102])).toEqual(
    true
  );
});

const COMM388_101:Section = {
  "course": "388",
  "section": "101",
  "subject": "COMM",
  "activity": "Lecture",
  "link": "https://courses.students.ubc.ca/cs/courseschedule?pname=subjarea&tname=subj-section&dept=COMM&course=388&section=101&campuscd=UBC",
  "name": "COMM 388 101",
  "schedule": [
    {
      "day": "Wed",
      "start_time": 870,
      "end_time": 1050,
      "term": "1",
    }
  ],
  "status": "Restricted",
  "term": "1",
}

test("completed: produce true if assigned contains all neccessary courses in og-loc", () => {
  expect(complete([], COURSES)).toBe(false);
  expect(complete([CPSC121_101], COURSES)).toBe(false);
  expect(complete([CPSC121_101, CPSC110_101], COURSES)).toBe(false);
  expect(complete([CPSC121_101, CPSC110_101, CPSC210_101], COURSES)).toBe(true);
  expect(complete([COMM388_101], [COMM388_101])).toBe(true);
  expect(complete([COMM388_101], [CPSC110_101])).toBe(false);
});


test("solve", () => {
  expect(solve_opti([])).toEqual([
    []
  ]);
  expect(solve_opti([CPSC121_101, CPSC110_101])).toEqual([
    [CPSC110_101, CPSC121_101]
  ]);
  expect(solve_opti([CPSC121_101, CPSC121_102, CPSC110_101, CPSC210_101])).toEqual([
    [CPSC210_101, CPSC110_101, CPSC121_101],
    [CPSC210_101, CPSC110_101, CPSC121_102],
  ]);
  expect(solve_opti(COURSES)).toEqual([
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
});
