import { useState, FC, useEffect } from "react";
import { Course } from "../data/DataDefinition/SearchWordDD";
import { Section } from "../data/DataDefinition/SectionDD";
import { SectionsProvider } from "./calendar/context/SectionsContext";
import {Box, Stack} from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';
import TopNavigationBar from "./topnavbar/TopNavigationBar";
import CourseSearchPaper from "./coursesearch/CourseSearchPaper";
import OptionsPaper from "./OptionsPaper";
import Calendar from "./calendar/1. calendar/Calendar";
import { theme } from "./Theme";
import { Recommended } from "../data/DataDefinition/RecommendDD";
import { HistoryProvider } from "./context/HistoryContext";
import { CalendarApps } from "./CalendarApps";


/**
 * User selected course description
 * @typedef  {Object}   Course
 */
export interface Recommendation {
  compact: Section[];
  consistent: Section[];
  scatter: Section[];
  earlyStart: Section[];
  lateStart: Section[];
  earlyEnd: Section[];
  lateEnd: Section[];
  freeDay: Section[];
}

const Main: FC = () => {

  /** all sections that were fetched from web scrapper */
  const [sections, setSections] = useState<Section[]>([]);

  /** sections that were recommended, each array is a recommendation */
  const [recommended, setRecommended] = useState<Recommendation>(
    {
      compact: [], consistent: [], scatter: [], earlyStart: [], 
      lateStart: [], earlyEnd: [], lateEnd: [], freeDay: [],
    }
  );

  /** courses that users looked up and want to get scheduled */
  const [coursesToFetch, setCoursesToFetch] = useState<Course[]>([]);

  /** indicates the current category of recommendation that user selected*/
  const [selectedRecommended, setSelectedRecommended] = useState<Recommended>(Recommended.compact)

  /** currently viewed sections that is selected from recommended data */
  const [currentRecommended, setCurrentRecommended] = useState<Section[]>([])
  
  /** Switch currently view sections whenever selected is changed from user's selection*/
  useEffect(() => {
    switch (selectedRecommended) {
      case Recommended.compact:
        setCurrentRecommended(recommended.compact) 
        break;
      case Recommended.scattered:
        setCurrentRecommended(recommended.scatter) 
        break;
      case Recommended.consistent:
        setCurrentRecommended(recommended.consistent) 
        break;
      default:
        setCurrentRecommended(recommended.freeDay)
        break;
    }
  }, [selectedRecommended, recommended])

 

  return (
      <ThemeProvider theme={theme}>
        <div className="Page">
          <TopNavigationBar/>
          <Box m={2} sx={{height:"100%"}}>
            <div className="main-page-flexbox">
              <div className="main-page-left">
                <Stack direction="column" spacing={2}>
                  <CourseSearchPaper coursesToFetch={coursesToFetch}
                                     setCoursesToFetch={setCoursesToFetch}
                                     setRecommended={setRecommended}
                                     setSections={setSections}
                  />
                  <OptionsPaper setSelectedRecommended={setSelectedRecommended}/>
                </Stack>
              </div>
              <div className="main-page-right">
                <SectionsProvider allSections={sections}>
                <HistoryProvider setCurrentRecommended={setCurrentRecommended}>
                  <Stack direction="column" spacing={1}>
                    <CalendarApps setSelectedRecommended={setSelectedRecommended} />
                    <Calendar recommended={currentRecommended}/>
                  </Stack>
                </ HistoryProvider>
                </ SectionsProvider>
              </div>
            </div>
          </Box>
        </div>
      </ThemeProvider>
  );
};

export default Main;
