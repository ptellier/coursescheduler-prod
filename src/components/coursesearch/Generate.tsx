import { Course } from "../../data/DataDefinition/SearchWordDD";
import { Section } from "../../data/DataDefinition/SectionDD";
import { fetchParallel } from "../../helpers/fetch";
import { filterByTermStatusActivity, filterDuplicatedSchedules} from "../../helpers/filter";
import { solve } from "../../helpers/solve_newengine";
import { groupSections } from "../../helpers/groupby";
import { useState } from "react";
import { recommend } from "../../helpers/recommend";
import { Alert, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { EmptySearchResult } from "../../exceptions/EmptySearchResult";
import { PartitallyEmptySearchResult } from "../../exceptions/PartiallyEmptySearchResult";

export interface GenerateProps {
  loc: Course[];
  setRecommended: Function;
  setSections: Function;
}

export const Generate = ({loc, setRecommended, setSections}: GenerateProps) => {

  const [status, setStatus] = useState<string[]>(["Available", "Full", "Blocked", "Restricted", "STT"]);
  const [mode, setMode] = useState<string[]>(["In-Person", "Online", "Hybrid"]);
  const [term, setTerm] = useState<string>("1");

  /** If true, show loading icon (pulse) on the generate schedule btn */
  const [loading, setLoading] = useState(false);

  /** States containing error, warning message created from exceptions */
  const [errorMessage, setErrorMessage] = useState('');
  const [warnMessage, setWarnMessage] = useState('');

  /** Update 'los' state with fetched data when a user generates schedule
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
            setErrorMessage("Search result is empty!")
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
   *   Warning: fetchParallel is fast, but may strain the api server
   *            less risky with using: 'fetchSections(loc.map((c) => c.sw))'
   * @sectionsFiltered
   * @sectionsNoDuplicate
   * @sectionsGroup
   * @sectionsSolved
   * @sectionsRecommended
   */
  const invokeAPI = async() => {
    const {sectionsBatch, receipt} = await fetchParallel(loc.map((c) => c.sw));
    checkEmptySearchResult(sectionsBatch)
    let sectionsFiltered:Section[] = [];
    let sectionsFilteredNested:Section[][] = [];
    for (let sections of sectionsBatch) {
      checkSectionWithoutName(sections)
      //TODO: enable these after implementation
      //checkAbnormalTerm(sections)
      //checkAbnormalDay(sections)
      const filtered = filterByTermStatusActivity(sections, term, status, mode);
      sectionsFiltered = [...sectionsFiltered, ...filtered]
      sectionsFilteredNested.push(filtered)
    }
    const sectionsNoDuplicate = filterDuplicatedSchedules(sectionsFiltered);
    const sectionsGroup = groupSections(sectionsNoDuplicate);
    const sectionsSolved = solve(sectionsGroup);
    const sectionsRecommended = recommend(sectionsSolved);

    setSections(sectionsGroup.flatMap((section) => section));
    setRecommended(sectionsRecommended);

    checkPartiallyEmptySearchResult(sectionsFilteredNested, receipt)
    signalInvokeSuccess();
  }

  /** Throws excpetion if all arrays in sectionsGroup have length of zero */
  const checkEmptySearchResult = (sectionsGroup: Section[][]) => {
    if (sectionsGroup.every(sections => sections.length === 0)) {
      throw new EmptySearchResult();
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

  /* Throws exception if one of arrays in sectionsGroup is empty */
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

  // TODO: Implement this
  // example: 'Term 1-2'
  const checkAbnormalTerm = () => {
    // Loop: if section.term.includes(1) ^ section.term.includes(2) 
    //.      convert 1-2 to 1
    //.      duplicate to 2
  }

  // TODO: Implement this
  // example: '^Fri'
  const checkAbnormalDay = () => {

  }

  // TODO: Implement this
  // example: CPSC 110 has both lecture and lab,
  //          but say all lectures are full, some labs are available
  //          in this case you want to reject all CPSC 110, and raise warning.
  const checkIncompleteSchedule = () => {

  }

  const provideErrorAlertUI = () => {
    if (errorMessage.length > 0)
      return <Alert severity="error">{errorMessage}</Alert>
  }

  const provideWarnAlertUI = () => {
    if (warnMessage.length > 0) 
      return <Alert severity="warning">{warnMessage}</Alert>
  }

  const signalInvokeSuccess = () => {
    setErrorMessage('')
    setWarnMessage('')
  }


  return (
    <>
      <TextField
        id="term-choice-field"
        select
        label="Term"
        value={term}
        onChange={(event) => setTerm(event.target.value)}
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
          value={status}
          onChange={(event) => setStatus(event.target.value as string[])}
          sx={{
            [`& fieldset`]: { borderRadius: "10px" },
            marginTop: "20px",
            width: "100%"
          }}
        >
          <MenuItem disabled key={3} value={"Available"}>Available</MenuItem>
          <MenuItem key={4} value={"Full"}>Full</MenuItem>
          <MenuItem key={5} value={"Blocked"}>Blocked</MenuItem>
          <MenuItem key={6} value={"Restricted"}>Restricted</MenuItem>
          <MenuItem key={7} value={"STT"}>STT</MenuItem>

          {/* TODO: include waitlist */}
          {/* <MenuItem key={2} value={"2"}> Waitlist </MenuItem> */}
        </Select>
      </FormControl>
      
      <FormControl fullWidth>
        <InputLabel style={{marginTop:20}} id="mode-choice-field">Mode</InputLabel>
        <Select
          id="mode-choice-field"
          multiple
          label="Mode"
          value={mode}
          onChange={(event) => setMode(event.target.value as string[])}
          sx={{
            [`& fieldset`]: { borderRadius: "10px" },
            marginTop: "20px",
          }}
        >
          <MenuItem key={8} value={"In-Person"}>In-Person</MenuItem>
          <MenuItem key={9} value={"Online"}>Online</MenuItem>
          <MenuItem key={10} value={"Hybrid"}>Hybrid</MenuItem>
        </Select>
      </FormControl>
     
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
      {provideErrorAlertUI()}
      {provideWarnAlertUI()}
    </>
  );
};

export default Generate;
