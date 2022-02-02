import { Section } from "../src/data/DataDefinition/SectionDD";

/**
 * make string of course subject, number, activity, and days e.g. "CPSC 110 Laboratory Mon,Wed,Fri"
 * @param {Section} c
 * @returns {string}
 */
export const getCourseString = (c:Section): string => {
  const daysArr:String[] = c.schedule.map((ts) => ts.day);
  return (c.subject +" "+ c.course +" "+ c.activity +" "+  daysArr.join(","));
}
/**
 * make list of strings for each section (using getCourseString)
 * @param {Section[]} sects
 * @returns {string[]}
 */
export const getLOCourseString = (sects:Section[]): string[] => {
  return sects.map(getCourseString);
}