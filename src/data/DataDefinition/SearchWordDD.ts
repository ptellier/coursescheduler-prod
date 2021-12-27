import React from "react";

// DATA DEFINITION FOR USER INTERFACE
/**
 * Course names to be fetched from API
 * @typedef {String}
 */
 export type SearchWord = String;

 /**
  * ListOfSearchWord is array of search words given by user
  * @typedef {SearchWord[]}
  */
 export type ListOfSearchWord = SearchWord[];
 
 /**
  * Raw course name given by user. Need to be cleaned up
  * @typedef {String}
  */
 export type UserInput = String;
 
 /**
  * Raw course name given by user. Need to be cleaned up
  * @typedef {String}
  */
 export type UserTerm = String;