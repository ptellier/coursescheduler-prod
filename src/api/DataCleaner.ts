  // TODO: Implement this

import { Section } from "../data/DataDefinition/SectionDD"

export const cleanSections = (sections: Section[]) => {
  const amendedSections = mergeSeparateSections(sections)
  return filterWaitlist(amendedSections);
}


// example: 'Term 1-2', '^Fri', empty Days, Start Time, End Time, Missing Term, Missing Activity
const checkAbnormalEntry = (sections:Section[]) => {

    const fixAbnormalDay = (section:Section) => {
        section.schedule.forEach(sch => {
            if (sch.day.includes("^")) sch.day.replace("^", "")
        }
        )
    }

    const dropAbnormalTerm = (section:Section) => {
        if (section.term.includes("1") && section.term.includes("2")) {
        // section offered term 1-2
        }
    }

    for (const section of sections) {
        // Drop schedule with empty day
        if (!section.schedule[0].day) {
            //TODO: remove this section
        }
    }
}

const mergeSeparateSections = (sections:Section[]) => {
  let curr = 0;
  let next = 1;
  while (curr < sections.length && next < sections.length) {
    if (!sections[next].name) {
      const schedulePopped = sections[next].schedule;
      sections[curr].schedule.push(...schedulePopped); 
    } else {
      curr = next;  
    }
    next++; 
  }
  return sections.filter(s => s.name);
}


  const filterWaitlist = (sections:Section[]) => {
    return sections.filter(section => 
      section.activity !== "Waiting List"  
    )
  }