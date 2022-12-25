import { Section, Timeslot } from "../data/DataDefinition/SectionDD"

export function cleanSections(sections:Section[], info:any) {
  
  const sectionsTobeCleaned = {

    _sections: sections,

    mergeSeparateSections() {
      let curr = 0;
      let next = 1;
      while (curr < this._sections.length && next < this._sections.length) {
        let currentSchedule = this._sections[curr].schedule;
        let nextSchedule = this._sections[next].schedule;
        if (!this._sections[next].name && 
            !this._hasSameSchedules(currentSchedule, nextSchedule)) {
          currentSchedule.push(...nextSchedule); 
        } else {
          curr = next;  
        }
        next++;
      }
      this._sections = this._sections.filter(s => s.name);
      return this;
    },

    handleYearLongSections() {
      for (let section of this._sections) {
        if (section.term === "1-2") {
          section.term = info.term;
          section.schedule.forEach(timeslot => timeslot.term = info.term);
        };
      };
      return this;
    },

    dropEmptyDaySections() {
      this._sections = this._sections.filter(section => 
        section.schedule.every(timeslot => timeslot.day)
      );
      return this;
    },

    dropEmptyTimeSections() {
      this._sections = this._sections.filter(section => 
        section.schedule.every(timeslot => 
          timeslot.start_time &&
          timeslot.end_time 
        ));
      return this;
    },

    dropWaitListSections() {
      this._sections = this._sections.filter(section => 
        section.activity !== "Waiting List"
      );
      return this;
    },

    getResult() {
      return this._sections;
    },

    _hasSameSchedules(currentSchedule:Timeslot[], nextSchedule:Timeslot[]) {
      return JSON.stringify(currentSchedule) === JSON.stringify(nextSchedule);
    },

  };

  return sectionsTobeCleaned
          .handleYearLongSections()
          .mergeSeparateSections()
          .dropEmptyDaySections()
          .dropEmptyTimeSections()
          .dropWaitListSections()
          .getResult();
};