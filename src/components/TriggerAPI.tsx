import { Course } from "../data/DataDefinition/SearchWordDD";
import { Section } from "../data/DataDefinition/SectionDD";
import { fetchParallel } from "../helpers/fetch";
import {
  filter_term_avail_waitlist,
  filter_duplicate_schedules,
} from "../helpers/filter";
import { solve } from "../helpers/solve_newengine";
import { groupSections } from "../helpers/groupby";
import { useState } from "react";
import { recommend } from "../helpers/recommend";
import { MenuItem, Select, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

export interface TriggerAPIProps {
  loc: Course[];
  set_recommended: Function;
  userTerm: string;
  setUserTerm: Function;
  setSections: Function;
}

// Warning:fast, but too much load on the server
// const sections_api = await fetchSections(loc.map((c) => c.sw));

export const TriggerAPI = ({
  loc,
  set_recommended,
  userTerm,
  setUserTerm,
  setSections,
}: TriggerAPIProps) => {
  /** If true, show loading icon (pulse) on the generate schedule btn */
  const [loading, setLoading] = useState(false);

  /**
   * update los with fetched data when a user clicks Generate Schedule btn
   */
  const handleGenerate = async () => {
    if (loc.length === 0) return;

    setLoading(true); // turns on loading icon
    let sections_api = await fetchParallel(loc.map((c) => c.sw));

    // TODO: handle error:
    handleError(sections_api)

    // 2) Prepare sections data for solve
    // TODO  1.1) take note of required sections (lecs, labs, tuts); are they all present?
    const prep = (sections: Section[]) => {
      const prep1 = filter_term_avail_waitlist(sections, userTerm);
      const prep2 = filter_duplicate_schedules(prep1);
      const prep3 = groupSections(prep2);
      return prep3;
    };
    const sections_prepped = prep(sections_api);
    const sections_solved = solve(sections_prepped);
    const sections_recommended = recommend(sections_solved);

    setSections(sections_prepped.flatMap((s) => s));
    set_recommended(sections_recommended); // pass recommended data for UI
    setLoading(false); // turns off loading icon
  };

  const handleError = (sections: Section[]) => {
    console.log(sections)
    // 1. Empty Result
    // if (... .length === 0) Raise warning to user and remove choosen course

    // 2. Term 1-2
    // Loop: if section.term.includes(1) ^ section.term.includes(2) 
    //.      convert 1-2 to 1
    //.      duplicate to 2

    // 3. '^Fri'
    // Loop: if section.includes(^)

    // 4. Section has no name
    let next = 1;
    for (let curr = 0; curr < sections.length - 1; curr++) {
      if (sections[next].name === '') {
        // transfer schedule from next to curr 
        const schedulePopped = sections[next].schedule;
        sections[curr].schedule.push(...schedulePopped); 
        // remove next time from the sections
        sections.splice(next,1);
        next++;
        curr++;
      }
      next++;
    }
  };


  return (
    <>
      <TextField
        id="term-choice-field"
        select
        label="Term"
        value={userTerm}
        onChange={(event) => setUserTerm(event.target.value)}
        sx={{
          [`& fieldset`]: { borderRadius: "10px" },
          width: "100%",
          marginTop: "20px",
        }}
      >
        <MenuItem key={1} value={"1"}>
          #1 Winter (Sept - Dec)
        </MenuItem>
        <MenuItem key={2} value={"2"}>
          #2 Winter (Jan - Apr)
        </MenuItem>
      </TextField>

      <Select
          // labelId="demo-multiple-chip-label"
          className="mt-2"
          label="Status"
          id="demo-multiple-chip"
          multiple
          fullWidth
      >

      </Select>

      <div className="d-flex justify-content-center">
        <LoadingButton
          className="mt-3 w-100"
          variant="contained"
          color="primary"
          onClick={handleGenerate}
          loading={loading}
        >
          Generate
        </LoadingButton>
      </div>
    </>
  );
};

export default TriggerAPI;
