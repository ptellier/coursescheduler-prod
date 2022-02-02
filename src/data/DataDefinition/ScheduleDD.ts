// DATA DEFINITION FOR Schedule
import { Section } from "./SectionDD";

/**
 * UBC Course section
 * @typedef  {Object}   Schedule
 * @property {Section[][]} sections 

 */
 export interface Schedule {
    sections: Section[];
    timeGap: number;
    startVariance:number;
  }