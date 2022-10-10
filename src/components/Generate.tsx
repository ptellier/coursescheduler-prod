import { Course } from "../data/DataDefinition/SearchWordDD";
import { Section } from "../data/DataDefinition/SectionDD";
import { fetchParallel } from "../helpers/fetch";
import {
  filterByTermStatusActivity,
  filterDuplicatedSchedules,
} from "../helpers/filter";
import { solve } from "../helpers/solve_newengine";
import { groupSections } from "../helpers/groupby";
import { useState } from "react";
import { recommend } from "../helpers/recommend";
import { Alert, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { EmptySearchResult } from "../exceptions/EmptySearchResult";
import { PartitallyEmptySearchResult } from "../exceptions/PartiallyEmptySearchResult";

export interface GenerateProps {
  loc: Course[];
  set_recommended: Function;
  userTerm: string;
  setUserTerm: Function;
  setSections: Function;
}

// Warning:fast, but too much load on the server
// const sections_api = await fetchSections(loc.map((c) => c.sw));
export const Generate = ({
  loc,
  set_recommended,
  userTerm,
  setUserTerm,
  setSections,
}: GenerateProps) => {

  /** If true, show loading icon (pulse) on the generate schedule btn */
  const [loading, setLoading] = useState(false);

  /** States containing error, warning message created from exceptions */
  const [errorMessage, setErrorMessage] = useState('');
  const [warnMessage, setWarnMessage] = useState('');
  

  /** update los with fetched data when a user clicks Generate Schedule btn
   * @setLoading (true): turns oj loading icon
   * @invokeAPI : invoke API and process returned data
   * @setLoading (false): turns off loading icon
   */
  const handleGenerate = async() => {
    try {
      setLoading(true);
      await invokeAPI();
    } catch (error: any) {
        switch (true) {
          case (error instanceof EmptySearchResult): 
            setErrorMessage("Search result is completely empty!")
            setWarnMessage('')
            break;
          case (error instanceof PartitallyEmptySearchResult):
            setWarnMessage(error.message)
            setErrorMessage('')
            break;
        }
    } finally {
      setLoading(false);
    }
  };

  /** Invoke API to fetch and process course section data
   * @sectionsFiltered
   * @sectionsNoDuplicate
   * @sectionsGroup
   * @sectionsSolved
   * @sectionsRecommended
   */
  const invokeAPI = async() => {
    const {sections, receipt} = await fetchParallel(loc.map((c) => c.sw));

    let sectionsFiltered = filterByTermStatusActivity(sections, userTerm);
    checkEmptySearchResult(sectionsFiltered)

    const sectionsFilteredFlat = sectionsFiltered.flatMap(group => group)
    checkSectionWithoutName(sectionsFilteredFlat)

    const sectionsNoDuplicate = filterDuplicatedSchedules(sectionsFilteredFlat);
    const sectionsGroup = groupSections(sectionsNoDuplicate);
    const sectionsSolved = solve(sectionsGroup);
    const sectionsRecommended = recommend(sectionsSolved);

    setSections(sectionsGroup.flatMap((section) => section));
    set_recommended(sectionsRecommended);

    checkPartiallyEmptySearchResult(sectionsFiltered, receipt)
    successfulInvoke();
  }

  // Empty Search Result
  const checkEmptySearchResult = (sectionsGroup: Section[][]) => {
    if (sectionsGroup.every(sections => sections.length === 0)) {
      throw new EmptySearchResult();
    }
  }

  // Section has no name
  const checkSectionWithoutName = (sections: Section[]) => {
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
  }

  // Partially Empty Search Result
  const checkPartiallyEmptySearchResult = (sectionsGroup: Section[][], receipt: string[]) => {
    let emptyCourses = [];
    let triggerException = false;
    for (let i = 0; i <= sectionsGroup.length - 1; i++) {
      if (sectionsGroup[i].length === 0) {
        triggerException = true
        emptyCourses.push(receipt[i])
      }
    }
    if (triggerException === true) {
      const initialMessage = "Following courses are not offered: "
      const message = emptyCourses.reduce((msg, course) => msg + " " + course, initialMessage)
      throw new PartitallyEmptySearchResult(message)
    }
  };

  const checkTermIssues = () => {
    // 2. Term 1-2
    // Loop: if section.term.includes(1) ^ section.term.includes(2) 
    //.      convert 1-2 to 1
    //.      duplicate to 2

    // 3. '^Fri'
    // Loop: if section.includes(^)
  }

  const provideErrorAlertUI = () => {
    if (errorMessage.length > 0)
      return <Alert severity="error">{errorMessage}</Alert>
  }

  const provideWarnAlertUI = () => {
    if (warnMessage.length > 0) 
      return <Alert severity="warning">{warnMessage}</Alert>
  }

  const successfulInvoke = () => {
    setErrorMessage('')
    setWarnMessage('')
  }


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
        <MenuItem key={1} value={"1"}> #1 Winter (Sept - Dec)</MenuItem>
        <MenuItem key={2} value={"2"}> #2 Winter (Jan - Apr) </MenuItem>
      </TextField>

        

      <FormControl fullWidth>
        <InputLabel style={{marginTop:20}} id="status-choice-field">Status</InputLabel>
        <Select
          id="status-choice-field"
          multiple
          label="Status"
          value={[1,2,3]}
          // onChange={(event) => setUserTerm(event.target.value)}
          sx={{
            [`& fieldset`]: { borderRadius: "10px" },
            marginTop: "20px",
          }}
        >
          <MenuItem key={1} value={"1"}>Full</MenuItem>
          <MenuItem key={2} value={"2"}>Blocked</MenuItem>
          <MenuItem key={2} value={"2"}>Restricted</MenuItem>
          <MenuItem key={2} value={"2"}>STT</MenuItem>
          {/* <MenuItem key={2} value={"2"}> Waitlist </MenuItem> */}
        </Select>
      </FormControl>
      
      <FormControl fullWidth>
        <InputLabel style={{marginTop:20}} id="mode-choice-field">Mode</InputLabel>
        <Select
          id="mode-choice-field"
          multiple
          label="Mode"
          value={[1,2,3]}
          // onChange={(event) => setUserTerm(event.target.value)}
          sx={{
            [`& fieldset`]: { borderRadius: "10px" },
            marginTop: "20px",
          }}
        >
          <MenuItem key={1} value={"1"}>In-Person</MenuItem>
          <MenuItem key={2} value={"2"}>Online</MenuItem>
          <MenuItem key={2} value={"2"}>Hybrid</MenuItem>
        </Select>
      </FormControl>
      


      {provideErrorAlertUI()}
      {provideWarnAlertUI()}
     
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

export default Generate;
