import React from "react";
import { Section } from "../src/data/DataDefinition/SectionDD";

//CONSTANTS:

// const CRIT1: PredData = {pred: crit1_not_same_time, 
//   isKey:false};
// const CRIT2: PredData = {pred: crit2_not_bad_time, 
//   isKey:true, optKey:"badTimes"};
// const CRIT3: PredData = {pred: crit3_all_req, 
//   isKey:true, optKey:"courseReq"};
// const CRIT4: PredData = {pred: crit4_number_req, 
//   isKey:true, optKey:"numReq"};

/*----------------------------------------------------------*/
//FUNCTIONS:

/**
 * make string of course subject, number, and activity e.g. "CPSC110Laboratory"
 * @param {Section} c
 * @returns {string}
 */
const get_course_name = (c:Section): string => {
  return (c.subject + c.course + c.activity);
}

/**
 * return true if all required classes are present
 * @param {Section[]} sections - Array of sections to check
 * @param {string[]} req - Names of required courses
 * @returns {boolean}
 */
const crit3_all_req = (sections:Section[], req: String[]): boolean => {
  for(let i=0; i<req.length; i++) {
    let wasFound: boolean = false
    for(let j=0; j<sections.length; j++) {
      let sect: Section = sections[j];
      let courseName:string = sect.subject + sect.course + sect.activity;
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
 * @param {Section[]} sections - Array of sections to check
 * @param {number} numReq - number of courses required
 * @returns {boolean}
 */
const crit4_number_req = (sections:Section[], numReq: number): boolean => {
  return sections.length === numReq;
}


module.exports = {
  get_course_name: get_course_name,
  crit3_all_req: crit3_all_req,
  crit4_number_req: crit4_number_req,
}