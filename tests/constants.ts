import { Schedule, Section, Timeslot } from "../src/data/DataDefinition/SectionDD";
const fns = require("../unused/optional");

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

const CS6: Section = {
  name: "COMM 388 101",
  subject: "COMM",
  course: "388",
  section: "101",
  activity: "Lecture",
  schedule: [{start_time: 340,
              end_time: 370,
              day: "Wed",
              term: "2"}],
  status: "Available",
  term: "2",
  link:"www.asdfghjkl.com"
};
const CS6NAME: string = fns.get_course_name(CS6);

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
const SCHD1_1EARLY: Schedule = [
  {start_time:300, end_time:350, day:"Mon",term:"2"},
  {start_time:1200, end_time:1230, day:"Wed",term:"2"},
  {start_time:1230, end_time:1260, day:"Fri",term:"2"}
];
const SCHD1_2EARLY: Schedule = [
  {start_time:1200, end_time:1230, day:"Mon",term:"2"},
  {start_time:300, end_time:350, day:"Wed",term:"2"},
  {start_time:1230, end_time:1260, day:"Fri",term:"2"}
];
const SCHD1_3EARLY: Schedule = [
  {start_time:1200, end_time:1230, day:"Mon",term:"2"},
  {start_time:1230, end_time:1260, day:"Wed",term:"2"},
  {start_time:300, end_time:350, day:"Fri",term:"2"}
];
const SCHD1_1LATE: Schedule = [
  {start_time:1200, end_time:1230, day:"Mon",term:"2"},
  {start_time:300, end_time:350, day:"Wed",term:"2"},
  {start_time:350, end_time:380, day:"Fri",term:"2"}
];
const SCHD1_2LATE: Schedule = [
  {start_time:300, end_time:350, day:"Mon",term:"2"},
  {start_time:1200, end_time:1230, day:"Wed",term:"2"},
  {start_time:350, end_time:380, day:"Fri",term:"2"}
];
const SCHD1_3LATE: Schedule = [
  {start_time:300, end_time:350, day:"Mon",term:"2"},
  {start_time:350, end_time:380, day:"Wed",term:"2"},
  {start_time:1200, end_time:1230, day:"Fri",term:"2"}
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
  {start_time:1100, end_time:1150, day:"Fri",term:"2"}
];
const SCHD5: Schedule = [
  {start_time:180, end_time:1150, day:"Mon",term:"2"},
  {start_time:240, end_time:1150, day:"Wed",term:"2"},
  {start_time:1200, end_time:1150, day:"Fri",term:"2"}
];
const SCHD6: Schedule = [
  {start_time:900, end_time:930, day:"Tue",term:"2"},
  {start_time:930, end_time:960, day:"Thu",term:"2"}
];
  

const CS1_3TS_1: Section = Object.assign({}, CS1);
CS1_3TS_1.schedule = SCHD1_1;
const CS1_3TS_2: Section = Object.assign({}, CS1);
CS1_3TS_2.schedule = SCHD1_2;
const CS1_3TS_3: Section = Object.assign({}, CS1);
CS1_3TS_3.schedule = SCHD1_3;

const CS1_3TS_1EARLY: Section = Object.assign({}, CS1);
CS1_3TS_1EARLY.schedule = SCHD1_1EARLY;
const CS1_3TS_2EARLY: Section = Object.assign({}, CS1);
CS1_3TS_2EARLY.schedule = SCHD1_2EARLY;
const CS1_3TS_3EARLY: Section = Object.assign({}, CS1);
CS1_3TS_3EARLY.schedule = SCHD1_3EARLY;

const CS1_3TS_1LATE: Section = Object.assign({}, CS1);
CS1_3TS_1LATE.schedule = SCHD1_1LATE;
const CS1_3TS_2LATE: Section = Object.assign({}, CS1);
CS1_3TS_2LATE.schedule = SCHD1_2LATE;
const CS1_3TS_3LATE: Section = Object.assign({}, CS1);
CS1_3TS_3LATE.schedule = SCHD1_3LATE;

const CS2_3TS: Section = Object.assign({}, CS2);
CS2_3TS.schedule = SCHD2;
const CS3_3TS: Section = Object.assign({}, CS3);
CS3_3TS.schedule = SCHD3;
const CS4_3TS: Section = Object.assign({}, CS4);
CS4_3TS.schedule = SCHD4;
const CS5_3TS: Section = Object.assign({}, CS5);
CS5_3TS.schedule = SCHD5;
const CS6_2TS: Section = Object.assign({}, CS6);
CS6_2TS.schedule = SCHD6;
  



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

module.exports = {
  CS1, CS2, CS3, CS4, CS5,
  CS1NAME, CS2NAME, CS3NAME, CS4NAME, CS5NAME,   
  CS1_Full, CS2_Full, CS3_Restricted,
  SCHD1_1, SCHD1_2, SCHD1_3, SCHD2, SCHD3, SCHD4,
  CS1_3TS_1, CS1_3TS_2, CS1_3TS_3, CS2_3TS, CS3_3TS, CS4_3TS        
}


