import { Section, Timeslot } from "../src/data/DataDefinition/SectionDD";

const cloneDeep = require('lodash/clonedeep');
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
};
const CS6NAME: string = fns.get_course_name(CS6);

const CS1_Full: Section = cloneDeep(CS1);
CS1_Full.status = "Full";

const CS2_Full: Section = cloneDeep(CS2);
CS2_Full.status = "Full";

const CS3_Restricted: Section = cloneDeep(CS3);
CS3_Restricted.status = "Restricted";



const CS1_MON = cloneDeep(CS1);
CS1_MON.schedule[0].day = "Mon"
const CS2_TUE = cloneDeep(CS2);
CS2_TUE.schedule[0].day = "Tue"
const CS3_WED = cloneDeep(CS3);
CS3_WED.schedule[0].day = "Wed"
const CS4_THU = cloneDeep(CS4);
CS4_THU.schedule[0].day = "Thu"
const CS5_FRI = cloneDeep(CS5);
CS5_FRI.schedule[0].day = "Fri"

const SCHD1_1: Timeslot[] = [
  {start_time:900, end_time:950, day:"Mon",term:"2"},
  {start_time:800, end_time:850, day:"Wed",term:"2"},
  {start_time:800, end_time:850, day:"Fri",term:"2"}
];
const SCHD1_2: Timeslot[] = [
  {start_time:800, end_time:850, day:"Mon",term:"2"},
  {start_time:900, end_time:950, day:"Wed",term:"2"},
  {start_time:800, end_time:850, day:"Fri",term:"2"}
];
const SCHD1_3: Timeslot[] = [
  {start_time:800, end_time:850, day:"Mon",term:"2"},
  {start_time:800, end_time:850, day:"Wed",term:"2"},
  {start_time:900, end_time:950, day:"Fri",term:"2"}
];
const SCHD1_1EARLY: Timeslot[] = [
  {start_time:300, end_time:350, day:"Mon",term:"2"},
  {start_time:1200, end_time:1230, day:"Wed",term:"2"},
  {start_time:1230, end_time:1260, day:"Fri",term:"2"}
];
const SCHD1_2EARLY: Timeslot[] = [
  {start_time:1200, end_time:1230, day:"Mon",term:"2"},
  {start_time:300, end_time:350, day:"Wed",term:"2"},
  {start_time:1230, end_time:1260, day:"Fri",term:"2"}
];
const SCHD1_3EARLY: Timeslot[] = [
  {start_time:1200, end_time:1230, day:"Mon",term:"2"},
  {start_time:1230, end_time:1260, day:"Wed",term:"2"},
  {start_time:300, end_time:350, day:"Fri",term:"2"}
];
const SCHD1_1LATE: Timeslot[] = [
  {start_time:1200, end_time:1230, day:"Mon",term:"2"},
  {start_time:300, end_time:350, day:"Wed",term:"2"},
  {start_time:350, end_time:380, day:"Fri",term:"2"}
];
const SCHD1_2LATE: Timeslot[] = [
  {start_time:300, end_time:350, day:"Mon",term:"2"},
  {start_time:1200, end_time:1230, day:"Wed",term:"2"},
  {start_time:350, end_time:380, day:"Fri",term:"2"}
];
const SCHD1_3LATE: Timeslot[] = [
  {start_time:300, end_time:350, day:"Mon",term:"2"},
  {start_time:350, end_time:380, day:"Wed",term:"2"},
  {start_time:1200, end_time:1230, day:"Fri",term:"2"}
];
const SCHD2: Timeslot[] = [
  {start_time:900, end_time:950, day:"Mon",term:"2"},
  {start_time:900, end_time:950, day:"Wed",term:"2"},
  {start_time:900, end_time:950, day:"Fri",term:"2"}
];
const SCHD3: Timeslot[] = [
  {start_time:1000, end_time:1050, day:"Mon",term:"2"},
  {start_time:1000, end_time:1050, day:"Wed",term:"2"},
  {start_time:1000, end_time:1050, day:"Fri",term:"2"}
];
const SCHD4: Timeslot[] = [
  {start_time:1100, end_time:1150, day:"Mon",term:"2"},
  {start_time:1100, end_time:1150, day:"Wed",term:"2"},
  {start_time:1100, end_time:1150, day:"Fri",term:"2"}
];
const SCHD5: Timeslot[] = [
  {start_time:180, end_time:1150, day:"Mon",term:"2"},
  {start_time:240, end_time:1150, day:"Wed",term:"2"},
  {start_time:1200, end_time:1150, day:"Fri",term:"2"}
];
const SCHD6: Timeslot[] = [
  {start_time:900, end_time:930, day:"Tue",term:"2"},
  {start_time:930, end_time:960, day:"Thu",term:"2"}
];
  

const CS1_3TS_1: Section = cloneDeep(CS1);
CS1_3TS_1.schedule = SCHD1_1;
const CS1_3TS_2: Section = cloneDeep(CS1);
CS1_3TS_2.schedule = SCHD1_2;
const CS1_3TS_3: Section = cloneDeep(CS1);
CS1_3TS_3.schedule = SCHD1_3;

const CS1_3TS_1EARLY: Section = cloneDeep(CS1);
CS1_3TS_1EARLY.schedule = SCHD1_1EARLY;
const CS1_3TS_2EARLY: Section = cloneDeep(CS1);
CS1_3TS_2EARLY.schedule = SCHD1_2EARLY;
const CS1_3TS_3EARLY: Section = cloneDeep(CS1);
CS1_3TS_3EARLY.schedule = SCHD1_3EARLY;

const CS1_3TS_1LATE: Section = cloneDeep(CS1);
CS1_3TS_1LATE.schedule = SCHD1_1LATE;
const CS1_3TS_2LATE: Section = cloneDeep(CS1);
CS1_3TS_2LATE.schedule = SCHD1_2LATE;
const CS1_3TS_3LATE: Section = cloneDeep(CS1);
CS1_3TS_3LATE.schedule = SCHD1_3LATE;

const CS2_3TS: Section = cloneDeep(CS2);
CS2_3TS.schedule = SCHD2;
const CS3_3TS: Section = cloneDeep(CS3);
CS3_3TS.schedule = SCHD3;
const CS4_3TS: Section = cloneDeep(CS4);
CS4_3TS.schedule = SCHD4;
const CS5_3TS: Section = cloneDeep(CS5);
CS5_3TS.schedule = SCHD5;
const CS6_2TS: Section = cloneDeep(CS6);
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


const TS_mon_1: Timeslot = 
{start_time: 250,
  end_time: 310,
  day: "Mon",
  term: "2"
}
const TS_tue_1: Timeslot = 
{start_time: 250,
  end_time: 310,
  day: "Tue",
  term: "2"
}
const TS_wed_1: Timeslot = 
{start_time: 250,
  end_time: 310,
  day: "Wed",
  term: "2"
}

const TS_mon_2: Timeslot = 
{start_time: 350,
  end_time: 410,
  day: "Mon",
  term: "2"
}
const TS_tue_2: Timeslot = 
{start_time: 350,
  end_time: 420,
  day: "Tue",
  term: "2"
}
const TS_wed_2: Timeslot = 
{start_time: 500,
  end_time: 580,
  day: "Wed",
  term: "2"
}


//Following constants are for most_compact & scatter
const CPSC110: Section = {
  name: "CPSC 110 101",
  subject: "CPSC",
  course: "110",
  section: "101",
  activity: "Lecture",
  schedule: [
    { start_time: 9*60, end_time: 10*60, day: "Mon", term: "2" },
    { start_time: 9*60, end_time: 10*60, day: "Wed", term: "2" },
    { start_time: 9*60, end_time: 10*60, day: "Fri", term: "2" }
  ],
  status: "Available",
  term: "2",
};
const CPSC121: Section = {
  name: "CPSC 121 101",
  subject: "CPSC",
  course: "121",
  section: "101",
  activity: "Lecture",
  schedule: [
    { start_time: 12*60, end_time: 13*60, day: "Mon", term: "2" },
    { start_time: 12*60, end_time: 13*60, day: "Wed", term: "2" },
    { start_time: 12*60, end_time: 13*60, day: "Fri", term: "2" }
  ],
  status: "Available",
  term: "2",
};
const CPSC210: Section = {
  name: "CPSC 210 101",
  subject: "CPSC",
  course: "210",
  section: "101",
  activity: "Lecture",
  schedule: [
    { start_time: 14*60, end_time: 17*60, day: "Mon", term: "2" },
    { start_time: 14*60, end_time: 17*60, day: "Wed", term: "2" },
    { start_time: 14*60, end_time: 17*60, day: "Fri", term: "2" }
  ],
  status: "Available",
  term: "2",
};
const CPSC110_compact: Section = {
  name: "CPSC 110 101",
  subject: "CPSC",
  course: "110",
  section: "101",
  activity: "Lecture",
  schedule: [
    { start_time: 9*60, end_time: 10*60, day: "Mon", term: "2" },
    { start_time: 9*60, end_time: 10*60, day: "Wed", term: "2" },
    { start_time: 9*60, end_time: 10*60, day: "Fri", term: "2" },
  ],
  status: "Available",
  term: "2",
};
const CPSC121_compact: Section = {
  name: "CPSC 121 101",
  subject: "CPSC",
  course: "121",
  section: "101",
  activity: "Lecture",
  schedule: [
    { start_time: 10*60, end_time: 11*60, day: "Mon", term: "2" },
    { start_time: 10*60, end_time: 11*60, day: "Wed", term: "2" },
    { start_time: 10*60, end_time: 11*60, day: "Fri", term: "2" },
  ],
  status: "Available",
  term: "2",
};
const CPSC210_compact: Section = {
  name: "CPSC 210 101",
  subject: "CPSC",
  course: "210",
  section: "101",
  activity: "Lecture",
  schedule: [
    { start_time: 11*60, end_time: 12*60, day: "Mon", term: "2" },
    { start_time: 11*60, end_time: 12*60, day: "Wed", term: "2" },
    { start_time: 11*60, end_time: 12*60, day: "Fri", term: "2" },
  ],
  status: "Available",
  term: "2",
};

// ECONs are offered on tue, thu
const ECON101: Section = {
  name: "ECON 101 101",
  subject: "ECON",
  course: "101",
  section: "101",
  activity: "Lecture",
  schedule: [
    { start_time: 12*60, end_time: 14*60, day: "Tue", term: "2" },
    { start_time: 12*60, end_time: 14*60, day: "Thu", term: "2" },
  ],
  status: "Available",
  term: "2",
};
const ECON102: Section = {
  name: "ECON 102 101",
  subject: "ECON",
  course: "102",
  section: "101",
  activity: "Lecture",
  schedule: [
    { start_time: 19*60, end_time: 21*60, day: "Tue", term: "2" },
    { start_time: 19*60, end_time: 21*60, day: "Thu", term: "2" },
  ],
  status: "Available",
  term: "2",
};
const ECON101_compact: Section = {
  name: "ECON 101 101",
  subject: "ECON",
  course: "101",
  section: "101",
  activity: "Lecture",
  schedule: [
    { start_time: 12*60, end_time: 14*60, day: "Tue", term: "2" },
    { start_time: 12*60, end_time: 14*60, day: "Thu", term: "2" },
  ],
  status: "Available",
  term: "2",
};
const ECON102_compact: Section = {
  name: "ECON 102 101",
  subject: "ECON",
  course: "102",
  section: "101",
  activity: "Lecture",
  schedule: [
    { start_time: 15*60, end_time: 17*60, day: "Tue", term: "2" },
    { start_time: 15*60, end_time: 17*60, day: "Thu", term: "2" },
  ],
  status: "Available",
  term: "2",
};

const MOSTCOMPACT: Section[] = [
  CPSC110_compact,CPSC121_compact,CPSC210_compact, ECON101_compact, ECON102_compact,
]

const MOSTSCATTER: Section[] = [
  CPSC110, CPSC121, CPSC210, ECON101, ECON102
]

module.exports = {
  CS1:CS1, CS2:CS2, CS3:CS3, CS4:CS4, CS5:CS5, CS6:CS6,
  CS1NAME:CS1NAME, CS2NAME:CS2NAME, CS3NAME:CS3NAME, CS4NAME:CS4NAME, CS5NAME:CS5NAME, CS6NAME:CS6NAME,
  CS1_Full:CS1_Full, CS2_Full:CS2_Full, CS3_Restricted:CS3_Restricted,
  CS1_MON:CS1_MON, CS2_TUE:CS2_TUE, CS3_WED:CS3_WED, CS4_THU:CS4_THU, CS5_FRI:CS5_FRI,
  SCHD1_1:SCHD1_1, SCHD1_2:SCHD1_2, SCHD1_3:SCHD1_3, SCHD2:SCHD2, SCHD3:SCHD3, SCHD4:SCHD4, SCHD5:SCHD5, SCHD6:SCHD6,
  SCHD1_1EARLY:SCHD1_1EARLY, SCHD1_2EARLY:SCHD1_2EARLY, SCHD1_3EARLY:SCHD1_3EARLY, SCHD1_1LATE:SCHD1_1LATE, SCHD1_2LATE:SCHD1_2LATE, SCHD1_3LATE:SCHD1_3LATE,

  CS1_3TS_1:CS1_3TS_1, CS1_3TS_2:CS1_3TS_2, CS1_3TS_3:CS1_3TS_3, CS2_3TS:CS2_3TS, CS3_3TS:CS3_3TS, CS4_3TS:CS4_3TS, CS5_3TS:CS5_3TS, CS6_2TS:CS6_2TS,
  CS1_3TS_1EARLY:CS1_3TS_1EARLY, CS1_3TS_2EARLY:CS1_3TS_2EARLY, CS1_3TS_3EARLY:CS1_3TS_3EARLY, CS1_3TS_1LATE:CS1_3TS_1LATE, CS1_3TS_2LATE:CS1_3TS_2LATE, CS1_3TS_3LATE:CS1_3TS_3LATE,
  TS2:TS2, TS5:TS5, TS6:TS6,
  TS_mon_1: TS_mon_1, TS_tue_1: TS_tue_1, TS_wed_1: TS_wed_1,
  TS_mon_2: TS_mon_2, TS_tue_2: TS_tue_2, TS_wed_2: TS_wed_2, 

  CPSC110:CPSC110, CPSC121:CPSC121, CPSC210:CPSC210, ECON101:ECON101, ECON102:ECON102,
  CPSC110_compact:CPSC110_compact, CPSC121_compact:CPSC121_compact, CPSC210_compact:CPSC210_compact, ECON101_compact:ECON101_compact, ECON102_compact:ECON102_compact,
  MOSTCOMPACT:MOSTCOMPACT, MOSTSCATTER:MOSTSCATTER,
}