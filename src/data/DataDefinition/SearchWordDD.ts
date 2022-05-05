import React from "react";

// DATA DEFINITION FOR USER INTERFACE

/**
 * User selected course description
 * @typedef  {Object}   Course
 * @property {SearchWord}   sw        - "CPSC/110"
 * @property {number}   credit    - 4
 * @property {string}   desc      - This course is about function programming ...
 */
export interface Course {
  sw: SearchWord;
  cred: number;
  desc: string;
}

/**
 * Course names to be fetched from API
 * @typedef {string}
 */
export type SearchWord = string;

/**
 * ListOfSearchWord is array of search words given by user
 * @typedef {SearchWord[]}
 */
export type ListOfSearchWord = SearchWord[];

/**
 * Raw course name given by user. Need to be cleaned up
 * @typedef {string}
 */
export type UserInput = string;

/**
 * Raw course name given by user. Need to be cleaned up
 * @typedef {string}
 */
export type UserTerm = string;
