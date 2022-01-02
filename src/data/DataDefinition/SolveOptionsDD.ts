import React from "react";
import { Timeslot, Section } from "./SectionDD"

//DATA:

/**
 * Data for criteria of Solve() that solves schedule
 * @typedef {Object} SolveOptions
 * @property {Timeslot[]} [badTimes] - times that sections cannot be scheduled
 * @property {String[]} [coursesReq] - names of courses required
 * @property {number} [numReq] - number of courses required (numReqMin should be undefined)
 * @property {number} [numReqMin] - minimum number of courses required (numReq should be undefined)
 */
export interface SolveOptions {
  badTimes?: Timeslot[],
  courseReq?: String[],
  numReq?: number,
  numReqMin?: number
}

/**
 * Predicate function to test criteria. 
 * @callback Pred
 * @param {Section[]} sections to test if criteria is met
 * @param {any} [optdata] data to test sections against depending on predicate
 */
export type Pred = (arg1:Section[], arg2?:any) => boolean

/**
 * Criteria function and data to test against the sections. Passed to scheduling solver
 * @typedef {Object} PredData
 * @property {Pred} pred Predicate function to test criteria.
 * @property {boolean} isKey Specifies whether key is defined (which implies options data needed)
 * @property {string} [optKey] key to access data in SolveOptions to create a closure 
 *                                (or false if none)
 */
export interface PredData {
  pred: Pred
  isKey: boolean
  optKey?: keyof SolveOptions
}