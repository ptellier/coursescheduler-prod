import React from "react";

// DATA DEFINITION FOR SOLVER

/**
 * UBC Course section
 * @typedef  {Object}   Section
 * @property {string}   name        - "CPSC 221 101"
 * @property {string}   subject     - "CPSC"
 * @property {string}   section     - "101"
 * @property {string}   course      - "221"
 * @property {Status}   status      - "Restricted", "Available", "Full"
 * @property {Activity} activity    - "Laboratory", "Lecture" "Tutorial", "Seminar"
 * @property {Term}     term        - "1", "2"
 * @property {Timeslot[]} schedule    - "List of timeslots for all meetings of the section"  
 */
export interface Section {
  id:       string;
  name:     string;
  subject:  string;
  section:  string;
  course:   string;
  status:   Status;
  activity: string;
  term:     Term;
  mode:     string;
  schedule: Timeslot[];
  isNextMove?: boolean;
  isOnTarget?: boolean;
}

/**
 * a list of section
 * @typedef {Section[]} ListOfSection
 */
 export type ListOfSection = Section[];

/**
 * A timeslot for a course with start and end time
 * @typedef {Object} Timeslot
 * @property {Time} start_time
 * @property {Time} end_time
 * @property {Day} day
 * @property {Term} term
 */
export interface Timeslot {
  day: Day;
  term: Term;
  start_time: Time;
  end_time: Time;
}

/**
 * Number of minutes since midnight. In [0, 1440)
 * @typedef {number} Time
 */
export type Time = number;

/**
 * Day of the week. "Mon", "Tues", "Wed", "Thur", or "Fri"
 * @typedef {string} Day
 * @todo
 */
export type Day = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" //is it "Thur" or "Thurs"?

/**
 * Term a course is offered: "1", "2", or "summer"
 * @typedef {string} Term
 */
export type Term = "1" | "2" | "1 - 2";

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
