import React from "react";

// DATA DEFINITION FOR USER INTERFACE
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