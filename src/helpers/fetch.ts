import { SearchWord } from "../data/DataDefinition/SearchWordDD";
import { Section } from "../data/DataDefinition/SectionDD";
// Note: Functions in this file fetches data from Course API


// set to true in development => uses internal server at port:8000
const dev = true;

export const createURLs = (losw: SearchWord[], session:string, year:string) => {
  let urls:string[] = []
  for (let sw of losw) {
    urls.push(createURL(sw, session, year))
  }
  return urls;
}

export const createURL = (sw: SearchWord, session:string, year:string) => {
  let url = ``
  const [subject, number] = parseSubjectNumber(sw)
  if (dev) {
    url = `http://localhost:8000/`
  } else {
    url = `https://busy-jade-toad-toga.cyclic.app/`
  }
  url += `api/${session}/sections?subject=${subject}&number=${number}`

  if (session === 'S') {
    url += `&year=${year}`
  }
  return url;
}

const parseSubjectNumber = (sw:string) => {
  const [subject, number] = sw.split("/")
  return [subject, number]
}

/**
 * fetch sections from API in parallel, returns sections as batch, and receipt
 * that contains info about each batch
 * @param losw 
 */
export const fetchParallel = async (losw: SearchWord[], urls:string[]) => {
  let sectionsBatch: Section[][] = [];
  let receipt:string[] = [];
  await Promise.all(losw.map(async(sw, idx) => { 
      const data = await fetchSection(urls[idx])
      sectionsBatch.push(data.sections);
      receipt.push(sw.replace("/", " "));
  }))
  return {sectionsBatch, receipt}
}

/**
 * fetches sections that corresponds to given sw
 * @param sw; i.e CPSC/110
 */
export const fetchSection = async (url:string) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

/**
 * fetch available sections for given losw
 * more info @: https://stackoverflow.com/questions/35612428/call-async-await-functions-in-parallel
 * @param {SearchWord[]} losw
 * @returns {Section[]}
 */
 export const fetchSections = async (losw: SearchWord[]): Promise<Section[]> => {
  let acc: Section[] = [];
  for (let sw of losw) {
    const data = await fetchSection(sw);
    acc.push(...data.sections);
  }
  return acc;
};

/**
 * fetches course description with given sw (searchWord)
 * Note1: course description is the course user would
 * like to retrieve section data for
 * Note2:
 * @param sw; i.e CPSC/110
 */
export const fetchCourseDesc = async (sw: SearchWord) => {
  const url = processURL(sw)
  const res = await fetch(url);
  const data = await res.json();
  return data;
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
  const url =
    base_url +
    (subject === undefined ? "" : subject) +
    between +
    (number === undefined ? "" : number);
  return url;
};


