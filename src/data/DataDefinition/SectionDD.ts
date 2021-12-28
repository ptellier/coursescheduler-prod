import React from "react";

// DATA DEFINITION FOR SOLVER

/**
 * UBC Course section
 * @typedef  {Object}   Section
 * @property {String}   name        - "CPSC 221 101"
 * @property {String}   subject     - "CPSC"
 * @property {String}   section     - "101"
 * @property {String}   course      - "221"
 * @property {Status}   status      - "Restricted", "Available", "Full"
 * @property {Activity} activity    - "Laboratory", "Lecture" "Tutorial", "Seminar"
 * @property {Term}     term        - "1", "2"
 * @property {Schedule} schedule    
 * @property {String}   link
 */
export interface Section {
  name:     String;
  subject:  String;
  section:  String;
  course:   String;
  status:   Status;
  activity: String;
  term:     Term;
  schedule: Schedule;
  link:     String;
}

/**
 * a list of section
 * @typedef {Section[]} ListOfSection
 */
 export type ListOfSection = Section[];


/**
 * a list of timeslot for one section
 * @typedef {Timeslot[]} Schedule
 */
export type Schedule = Timeslot[];

/**
 * A timeslot for a course with start and end time
 * @typedef {Object} Timeslot
 * @property {Time} start_time
 * @property {Time} end_time
 * @property {Day} day
 * @property {Term} term
 */
export interface Timeslot {
  start_time: Time;
  end_time: Time;
  day: Day;
  term: Term;
}

/**
 * Number of minutes since midnight. In [0, 1440)
 * @typedef {number} Time
 */
export type Time = number;

/**
 * Day of the week. "Mon", "Tues", "Wed", "Thur", or "Fri"
 * @typedef {number} Day
 * @todo
 */
export type Day = "Mon" | "Tues" | "Wed" | "Thur" | "Fri"; //is it "Thur" or "Thurs"?

/**
 * Term a course is offered: "1", "2", or "summer"
 * @typedef {string} Term
 */
export type Term = "1" | "2" | "summer";

/**
 * Registration availability: "Available", "Full", or "Restricted"
 * @typedef {string} Status
 */
export type Status = "Available" | "Full" | "Restricted" | "Blocked" | "Waiting List";

/**
 * Type of course activity. e.g. "Laboratory", "Tutorial", "Lecture"
 * @typedef {string} Activity
 */
export type Activity = string;
