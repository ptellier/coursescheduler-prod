import { Section } from "./SectionDD";

 export interface Recommendation {
    compact: Section[];
    consistent: Section[];
    scatter: Section[];
    freeDay: Section[];
  }
  