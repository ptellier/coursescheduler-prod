//CONSTANTS:
const CRIT1: PredData = {pred: crit1_not_same_time, 
  isKey:false};
const CRIT2: PredData = {pred: crit2_not_bad_time, 
  isKey:true, optKey:"badTimes"};
const CRIT3: PredData = {pred: crit3_all_req, 
  isKey:true, optKey:"coursesReq"};
const CRIT4: PredData = {pred: crit4_number_req, 
  isKey:true, optKey:"numReq"};


/**
 * Data for criteria of Solve() that solves schedule
 * @typedef {Object} SolveOptions
 * @property {Timeslot[]} [badTimes] - times that courses cannot be scheduled
 * @property {String[]} [coursesReq] - names of courses required
 * @property {number} [numReq] - number of courses required (numReqMin should be undefined)
 * @property {number} [numReqMin] - minimum number of courses required (numReq should be undefined)
 */

/*---------------------------------------------------------------------------*/
//DATA:

/**
 * A particular course section
 * @typedef {Object} Course
 * @property {Timeslot} timeslot - time the course occurs
 * @property {string} subject - The subject code e.g. "CPSC" in CPSC 110
 * @property {string} courseNum - The course num e.g. "110" in CPSC 110
 * @property {Status} status - registration availability: "Available", "Full", or "Restricted"
 * @property {Term} term - Term the course occurs: "1", "2", or "summer"
 */
interface Course {
  subject: string,
  courseNum: string,
  activity: Activity,
  timeslot: Timeslot,
  status: Status,
  term: Term
}

/**
 * A timeslot for a course with start and end time
 * @typedef {Object} Timeslot
 * @property {Time} start_time
 * @property {Time} end_time
 * @property {Day} day
 * @property {Term} term
 */
interface Timeslot {
  start_time: Time,
  end_time: Time,
  day: Day,
  term: Term
}

/**
 * Type of course activity. e.g. "Laboratory", "Tutorial", "Lecture"
 * @typedef {string} Activity
 */
 type Activity = string

/**
 * Term a course is offered: "1", "2", or "summer"
 * @typedef {string} Term 
 */
type Term = ("1"|"2"|"summer")

/**
 * Registration availability: "Available", "Full", or "Restricted"
 * @typedef {string} Status 
 */
type Status = ("Available"|"Full"|"Restricted")

/**
 * Number of minutes since midnight. In [0, 1440)
 * @typedef {number} Time
 */
type Time = number 

/**
 * Day of the week. "Mon", "Tues", "Wed", "Thur", or "Fri"
 * @typedef {number} Day
 * @todo
 */
 type Day = ("Mon"|"Tues"|"Wed"|"Thur"|"Fri") //is it "Thur" or "Thurs"?

/**
 * Data for criteria of Solve() that solves schedule
 * @typedef {Object} SolveOptions
 * @property {Timeslot[]} [badTimes] - times that courses cannot be scheduled
 * @property {String[]} [coursesReq] - names of courses required
 * @property {number} [numReq] - number of courses required (numReqMin should be undefined)
 * @property {number} [numReqMin] - minimum number of courses required (numReq should be undefined)
 */
interface SolveOptions {
  badTimes?: Timeslot[],
  courseReq?: String[],
  numReq?: number,
  numReqMin?: number
}

/**
 * Predicate function to test criteria. 
 * @callback Pred
 * @param {Course[]} courses to test if criteria is met
 * @param {any} [optdata] data to test courses against depending on predicate
 */
type Pred = (arg1:Course[], arg2?:any) => boolean

/**
 * Criteria function and data to test against the courses. Passed to scheduling solver
 * @typedef {Object} PredData
 * @property {Pred} pred Predicate function to test criteria.
 * @property {boolean} isKey Specifies whether key is defined (which implies options data needed)
 * @property {string} [optKey] key to access data in SolveOptions to create a closure 
 *                                (or false if none)
 */
interface PredData {
  pred: Pred
  isKey: boolean
  optKey?: keyof typeof CRIT1
}

/*----------------------------------------------------------*/
//FUNCTIONS:

/**
 * make string of course subject, number, and activity e.g. "CPSC110Laboratory"
 * @param {Course} c
 * @returns {string}
 */
function get_course_name(c:Course): string {
  return (c.subject + c.courseNum + c.activity);
}

/**
 * make Timeslot from start and end times in 24 hour time
 * @param {string} startTime - e.g. "15:00"
 * @param {string} endTime -  e.g. "16:30"
 * @returns {Timeslot}
 */
function make_timeslot(startTime: string, endTime:string, day:Day, term:Term): Timeslot {
  let startArr: number[] = startTime.split(":").map((s) => parseInt(s));
  let endArr: number[] = endTime.split(":").map((s) => parseInt(s));
  let nstart: number = (startArr[0]*60)+startArr[1];
  let nend: number = (endArr[0]*60)+endArr[1];
  return {start_time: nstart, end_time: nend, day:day, term:term};
}

/**
 * return true if two timeslots overlap
 * @param {Timeslot} ts1
 * @param {Timeslot} ts2
 * @returns {boolean}
 */
function is_overlap_timeslots(ts1:Timeslot, ts2:Timeslot): boolean {
 let s1: Time = ts1.start_time; let e1: Time = ts1.end_time;
 let s2: Time = ts2.start_time; let e2: Time = ts2.end_time;
 return ((ts1.term === ts2.term) && 
          (ts1.day === ts2.day) &&
          (((e2 > e1) && (s2 < e1)) ||
           ((e2 <= e1) && (e2 > s1))));
}

/**
 * return true if two courses have overlapping timeslots
 * @param {Course} c1
 * @param {Course} c2
 * @returns {boolean}
 */
 function is_overlap_courses(c1:Course, c2:Course): boolean {
  return is_overlap_timeslots(c1.timeslot, c2.timeslot)
 }


/**
 * filter list of courses to only those available
 * @param {Course[]} courses - Array of courses to filter
 * @returns {Course[]} courses that are available
 */
function filter_not_full(courses:Course[]): Course[] {
  return courses.filter((course) => 
    (course.status !== "Full"));
}

/**
 * return true if no courses are at the same time
 * @param {Course[]} courses - Array of courses to check
 * @returns {boolean} 
*/
function crit1_not_same_time(courses:Course[]): boolean {
  for(let i=0; i<courses.length; i++) {
    for(let j=i+1; j<courses.length; j++) {
      if(is_overlap_courses(courses[i], courses[j])) {
        return false;
      }
    }
  }
  return true;
}

/**
 * return true if courses are not at the given time
 * @param {Course[]} courses - Array of courses to check
 * @param {Timeslot[]} badTimes - Array of times that don't work
 * @returns {boolean}
 */
 function crit2_not_bad_time(courses:Course[], badTimes:Timeslot[]): boolean {
  for(let i=0; i<courses.length; i++) {
    for(let j=0; j<badTimes.length; j++) {
      if(is_overlap_timeslots(courses[i].timeslot, badTimes[j])) {
        return false;
      }
    }
  }
  return true;
}

/**
 * return true if all required classes are present
 * @param {Course[]} courses - Array of courses to check
 * @param {string[]} req - Names of required courses
 * @returns {boolean}
 */
 function crit3_all_req(courses:Course[], req: String[]): boolean {
  for(let i=0; i<req.length; i++) {
    let wasFound: boolean = false
    for(let j=0; j<courses.length; j++) {
      let c: Course = courses[j];
      let courseName:string = c.subject + c.courseNum + c.activity;
      if(courseName === req[i]) {
        wasFound = true;
        break;
      }
    }
    if(!wasFound){
      return false;
    }
  }
  return true;
}

/**
 * return true if there is the required number of courses
 * @param {Course[]} courses - Array of courses to check
 * @param {number} numReq - number of courses required
 * @returns {boolean}
 */
 function crit4_number_req(courses:Course[], numReq: number): boolean {
  return courses.length === numReq;
}

/**
 * find the most optimized course based on criteria
 * @param {Course[]} courses - courses to schedule
 * @param {PredData[]} predData - the schedule criteria in order of priority
 * @param {SolveOptions} opt - specifies data and details for criteria
 * @todo
 */
function solve(courses:Course[], predData:PredData[], opt:SolveOptions,) {

  let crits:Pred[] = predData.map((pd:PredData) => {
    if (typeof pd.optKey === "string"){
      let closure:Pred = (loc:Course[]) => {return pd.pred(loc, opt[pd.optKey as keyof typeof CRIT1])};
      return closure;
    } else {
      return pd.pred;
    }
  });

  const fn_for_btree = (picked:Course[], left:Course[]) => {

  };

  fn_for_btree(courses, []);
} 


(define (solve loc0)
  (local [(define (fn-for-schedule s)
            (cond [(finished? s)
                   (if (good-schedule? s)
                       (list (schedule-assigned s))
                       empty)]
                  [else
                   (append (fn-for-schedule (pick s))
                           (fn-for-schedule (skip s)))]))
          
          (define (finished? s)
            (empty? (schedule-remain s)))

          (define (good-schedule? s)
            (and (not (already-contains? (schedule-assigned s)))
                 (complete? (schedule-assigned s) loc0)
                 ;(not (overlap? s))
                 ))
          
          (define (pick s)
            (local [(define c (first (schedule-remain s)))]
              (make-schedule (cons c (schedule-assigned s))
                             (rest (schedule-remain s)))))

          (define (skip s)
            (make-schedule (schedule-assigned s)
                           (rest (schedule-remain s))))]
    
    (map (λ (loc) (map course-name loc))
         (fn-for-schedule (make-schedule empty loc0)))))




module.exports = {
  get_course_name: get_course_name,
  make_timeslot: make_timeslot,
  is_overlap_timeslots: is_overlap_timeslots,
  is_overlap_courses: is_overlap_courses,
  filter_not_full: filter_not_full,
  crit1_not_same_time: crit1_not_same_time,
  crit2_not_bad_time: crit2_not_bad_time,
  crit3_all_req: crit3_all_req,
  crit4_number_req: crit4_number_req,
}