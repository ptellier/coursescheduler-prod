import {SearchWord} from "../data/DataDefinition/SearchWordDD";
import {Section} from "../data/DataDefinition/SectionDD";
// Note: Functions in this file fetches data from Course API

const BASE_SERVER_URL = "http://localhost:8000"
// const BASE_SERVER_URL = "https://jungle-green-shark-coat.cyclic.app"

/**
 * fetch sections from API in parallel
 * @param {SearchWord[]} losw
 * @param {string} userTerm - either "1" or "2" for first term of winter/summer or 2nd term of winter/summer
 * @param {string} season - either "W" or "S" for winter or summer
 */
export const fetchParallel = async (losw: SearchWord[], userTerm: string, season: string) => {
  let acc: Section[] = []
  await Promise.all(losw.map(async(sw) => { 
      const data = await fetchSection(sw, userTerm, season)
      acc.push(...data.sections);
  }))
  return acc
}

/**
 * fetch available sections for given losw
 * @param {SearchWord[]} losw
 * @param {string} userTerm - either "1" or "2" for first term of winter/summer or 2nd term of winter/summer
 * @param {string} season - either "W" or "S" for winter or summer
 * @returns {Section[]}
 */
 export const fetchSections = async (losw: SearchWord[], userTerm: string, season: string): Promise<Section[]> => {
  let acc: Section[] = [];
  for (let sw of losw) {
    const data = await fetchSection(sw, userTerm, season);
    acc.push(...data.sections);
  }

  // https://stackoverflow.com/questions/35612428/call-async-await-functions-in-parallel
  return acc;
};
/**
 * fetches sections that corresponds to given sw
 * @param {string} sw - e.g. CPSC/110
 * @param {string} term - either "1" or "2" for first term of winter/summer or 2nd term of winter/summer
 * @param {string} season - either "W" or "S" for winter or summer
 */
export const fetchSection = async (sw: SearchWord, term: string, season: string) => {
  const [subject, number] = sw.split("/")
  // const url = `https://api.ubccourses.com/section/${sw}/?realtime=1`; 
  // const url = `https://api.ubccourses.com/section/${sw}/`;
  // const url = `https://puppeteer-test-sl.herokuapp.com/api/sections?subject=${subject}&number=${number}`
  const url = `${BASE_SERVER_URL}/api/${season}/sections?subject=${subject}&number=${number}&term=${term}`
  const res = await fetch(url);
  return await res.json();
};

/**
 * fetches course description with given sw (searchWord)
 * Note1: course description is the course user would
 * like to retrieve section data for
 * Note2:
 * @param sw; e.g. CPSC/110
 */
export const fetchCourseDesc = async (sw: SearchWord) => {
  const url = processURL(sw)
  const res = await fetch(url);
  return await res.json();
};

/**
 * a helper for fetchCourseDesc, needed for url format
 * parse user's raw input of search word then return
 * appropriate url that is accepted by Ben Cheung's API call
 * @param sw 
 * @returns 
 */
const processURL = (sw: SearchWord) => {
  const base_url = "https://ubcexplorer.io/searchAny/";
  const subject = sw.match(/([A-Za-z]+)/g)?.join("");
  const between = "%20";
  const number = sw.match(/(\d+)/g)?.join("");
  return base_url +
      (subject === undefined ? "" : subject) +
      between +
      (number === undefined ? "" : number);
};


