import { SearchWord } from "../data/DataDefinition/SearchWordDD";
import { Section } from "../data/DataDefinition/SectionDD";
// Functions in this file fetches data from Course API

/**
 * fetches sections that corresponds to given sw
 * @param sw; i.e CPSC/110
 */
export const fetchSection = async (sw: SearchWord) => {
  const url = `https://api.ubccourses.com/section/${sw}/?realtime=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

/**
 * fetch and filter for available sections
 * @param {SearchWord[]} losw
 * @returns {Section[]}
 */
export const fetchSections = async (losw: SearchWord[]): Promise<Section[]> => {
  let acc: Section[] = [];
  for (let sw of losw) {
    const data = await fetchSection(sw);
    acc.push(...data.sections);

    // const sections_avail = filterAvailSections(data.sections);
    // acc.push(...sections_avail);
  }
  return acc;
};


