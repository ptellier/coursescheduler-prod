import { Course } from "../data/DataDefinition/SearchWordDD";
import { Section } from "../data/DataDefinition/SectionDD";
import { fetchParallel,fetchSections } from "../helpers/fetch";
import {
  filter_term_avail_waitlist,
  filter_duplicate_schedules,
} from "../helpers/filter";
import { solve } from "../helpers/solve_newengine";
import { groupSections } from "../helpers/groupby";
import { useState } from "react";
import { recommend } from "../helpers/recommend";
import { MenuItem, TextField } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton'


export interface TriggerAPIProps {
  loc: Course[];
  set_recommended: Function;
  userTerm: string;
  setUserTerm: Function;
  setSections: Function;
}

export const TriggerAPI = ({ loc, set_recommended, userTerm, setUserTerm, setSections}: TriggerAPIProps) => {
  /** If true, show loading icon (pulse) on the generate schedule btn */
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Run")

  /**
   * update los with fetched data when a user clicks Generate Schedule btn
   */
  const handleGenerate = async () => {
    setLoading(true); // turns on loading icon
    setStatus("Fetching")
  
    // const sections_api = await fetchSections(loc.map((c) => c.sw));
    // console.log("fetched: ", sections_api)
    // Warning:fast, but too much load on the server
    const sections_api = await fetchParallel(loc.map((c) => c.sw)); 
    // console.log(sections_api)
    // 2) Prepare sections data for solve
    // TODO  1.1) take note of required sections (lecs, labs, tuts); are they all present?
    const prep = (sections: Section[]) => {
      const prep1 = filter_term_avail_waitlist(sections, userTerm);
      const prep2 = filter_duplicate_schedules(prep1);
      const prep3 = groupSections(prep2);
      return prep3;
    };
    const sections_prepped = prep(sections_api);
    // console.log("prepped: ", sections_prepped);
    const sections_solved = solve(sections_prepped);
    // console.log("Solved: ", sections_solved);
    const sections_recommended = recommend(sections_solved);
    // console.log("Recommended: ", sections_recommended)

    setSections(sections_prepped.flatMap(s => s))
    set_recommended(sections_recommended);  // pass recommended data for UI
    setStatus("Run")
    setLoading(false); // turns off loading icon
  };

  return (
      <>
          <TextField
              id="term-choice-field"
              select
              label="Term"
              value={userTerm}
              onChange={(event) => setUserTerm((event.target.value))}
              sx={{[`& fieldset`]:{borderRadius:"10px"}, width:"100%", marginTop:"20px"}}
          >
              <MenuItem key={1} value={"1"}>#1 Winter (Sept - Dec)</MenuItem>
              <MenuItem key={2} value={"2"}>#2 Winter (Jan - Apr)</MenuItem>
              <MenuItem key={3} value={"3"}>#1 Summer (May - June)</MenuItem>
              <MenuItem key={4} value={"4"}>#2 Summer (July - Aug)</MenuItem>
          </TextField>
          <div className="d-flex justify-content-center">
            <LoadingButton className="mt-3 w-100" 
                           variant="contained"
                           color="primary"
                           onClick={handleGenerate}
                           loading={loading}
            >Generate</LoadingButton>
          </div>
      </>
  );
};

export default TriggerAPI;
