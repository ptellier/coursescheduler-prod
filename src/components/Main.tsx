import { useState, FC } from "react";
import { Course } from "../data/DataDefinition/SearchWordDD";
import { Section } from "../data/DataDefinition/SectionDD";
import { SectionsProvider } from "./calendar/context/SectionsContext";
import {Box, ButtonGroup, Stack, IconButton} from "@mui/material";

import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

import TopNavigationBar from "./topnavbar/TopNavigationBar";
import CourseSearchPaper from "./coursesearch/CourseSearchPaper";
import TriggerAPI from "./TriggerAPI";
import OptionsPaper from "./OptionsPaper";
import Calendar from "./calendar/1. calendar/Calendar";


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
  const [recommended, set_recommended] = useState<Recommendation>(
    {
      compact: [], consistent: [], scatter: [], earlyStart: [], 
      lateStart: [], earlyEnd: [], lateEnd: [], freeDay: [],
    }
  );

  /** courses that users looked up and want to get scheduled */
  const [coursesToFetch, setCoursesToFetch] = useState<Course[]>([]);

  /** raw user input from search bar and term selection components */
  const [userTerm, setUserTerm] = useState<string>("1");

  return (
      <>
      <div className="Page">
        <TopNavigationBar/>
        <Box m={2} sx={{height:"100%"}}>
          <div className="main-page-flexbox">
            <div className="main-page-left">
              <Stack direction="column" spacing={2}>
                <CourseSearchPaper coursesToFetch={coursesToFetch}
                                   loc={coursesToFetch}
                                   setCoursesToFetch={setCoursesToFetch}
                                   set_recommended={set_recommended}
                                   userTerm={userTerm}
                                   setUserTerm={setUserTerm}
                                   setSections={setSections}
                />
                <OptionsPaper/>
              </Stack>
            </div>
            <div className="main-page-right">
              <Stack direction="column" spacing={1}>
                <Box p={1}>
                  <ButtonGroup>
                    <IconButton><ChevronLeftIcon fontSize="large"/></IconButton>
                    <IconButton><ChevronRightIcon fontSize="large"/></IconButton>
                  </ButtonGroup>
                </Box>
                <SectionsProvider allSections={sections}>
                  <Calendar recommended={recommended.compact}/>
                </ SectionsProvider>
                {/*<CalendarPaper text={"second right"}/>*/}
              </Stack>
            </div>
          </div>
        </Box>
      </div>








      </>
  );
};

export default Main;
