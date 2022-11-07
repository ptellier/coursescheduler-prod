  // TODO: Implement this

import { Section } from "../data/DataDefinition/SectionDD"

export const cleanSections = (sections: Section[]) => {
  checkSectionWithoutName(sections)
  return filterWaitlist(sections);
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

  /* Roll back a section without name to previous section with name
   * Note: If a section has no name, this implicitly means that 
   *       the section is related to immediate previous section
   *       that has the same. CPSC 210 104 is an exmaple of this.
   */
  const checkSectionWithoutName = (sections: Section[]) => {
    let next = 1;
    for (let curr = 0; curr < sections.length - 1; curr++) {
      if (!sections[next].name) {
        // pick the schedule from next and merge with curr's 
        const schedulePopped = sections[next].schedule;
        sections[curr].schedule.push(...schedulePopped); 
        // remove next time from the sections
        sections.splice(next, 1);
        next++;
        curr++;
      }
      next++;
    }
  }

  const filterWaitlist = (sections:Section[]) => {
    // s.activity !== "Waiting List"
    return sections.filter(section => 
      section.activity !== "Waiting List"  
    )
  }