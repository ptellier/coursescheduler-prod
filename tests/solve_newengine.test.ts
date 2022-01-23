import { Section } from "../src/data/DataDefinition/SectionDD";
import { solve, next_nodes } from "../src/helpers/solve_newengine";

const CPSC121_101: Section = {
  name: "CPSC 121 101",
  subject: "CPSC",
  section: "101",
  course: "121",
  status: "Available",
  activity: "Lecture",
  term: "2",
  schedule: [],
  
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
  
};
const COMM388_101: Section = {
  course: "388",
  section: "101",
  subject: "COMM",
  activity: "Lecture",
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

const COURSES: Section[][] = [
  [CPSC121_101, CPSC121_102, CPSC121_103],
  [CPSC110_101, CPSC110_102],
  [CPSC210_101, CPSC210_102],
];

test("solve", () => {
  expect(solve([])).toEqual([[]]);
  expect(solve([[CPSC121_101], [CPSC110_101]])).toEqual([
    [CPSC121_101, CPSC110_101],
  ]);
  expect(
    solve([[CPSC121_101, CPSC121_102], [CPSC110_101], [CPSC210_101]])
  ).toEqual([
    [CPSC121_101, CPSC110_101, CPSC210_101],
    [CPSC121_102, CPSC110_101, CPSC210_101],
  ]);
  expect(solve(COURSES)).toEqual([
    [CPSC121_101, CPSC110_101, CPSC210_101],
    [CPSC121_101, CPSC110_101, CPSC210_102],
    [CPSC121_101, CPSC110_102, CPSC210_101],
    [CPSC121_101, CPSC110_102, CPSC210_102],
    [CPSC121_102, CPSC110_101, CPSC210_101],
    [CPSC121_102, CPSC110_101, CPSC210_102],
    [CPSC121_102, CPSC110_102, CPSC210_101],
    [CPSC121_102, CPSC110_102, CPSC210_102],
    [CPSC121_103, CPSC110_101, CPSC210_101],
    [CPSC121_103, CPSC110_101, CPSC210_102],
    [CPSC121_103, CPSC110_102, CPSC210_101],
    [CPSC121_103, CPSC110_102, CPSC210_102],
  ]);
});

/**
 * Sections chosen and sections remaining at each node in the search tree
 * @typedef {Object} Node
 * @property {Section[]} assigned - listof Section that are assigned
 * @property {Section[]} remain - listof Section remainng to be assigned
 */
interface Node {
  assigned: Section[];
  remain: Section[][];
}

const cs_121_101: Section = {
  name: "CPSC 121 102",
  subject: "CPSC",
  section: "101",
  course: "121",
  status: "Available",
  activity: "Lecture",
  term: "2",
  schedule: [{ day: "Mon", term: "1", start_time: 10 * 60, end_time: 11 * 60 }],
  
};
const cs_110_101: Section = {
  name: "CPSC 110 101",
  subject: "CPSC",
  section: "101",
  course: "110",
  status: "Available",
  activity: "Lecture",
  term: "2",
  schedule: [{ day: "Mon", term: "1", start_time: 10 * 60, end_time: 11 * 60 }],
  
};
const cs_110_102: Section = {
  name: "CPSC 110 101",
  subject: "CPSC",
  section: "101",
  course: "110",
  status: "Available",
  activity: "Lecture",
  term: "2",
  schedule: [{ day: "Mon", term: "1", start_time: 11 * 60, end_time: 12 * 60 }],
  
};


const node1: Node = {
  assigned: [cs_121_101],
  remain: [[cs_110_101, cs_110_102]],
};

test("Next Nodes", () => {
  expect(
    next_nodes({
      assigned: [cs_121_101],
      remain:   [[cs_110_101, cs_110_102]],
    })
  ).toEqual([{
    assigned: [cs_121_101, cs_110_102],
    remain:   [],
  }]);
  expect(
    next_nodes({
      assigned: [cs_121_101],
      remain:   [[cs_110_101]],
    })
  ).toEqual([]);

  
});
