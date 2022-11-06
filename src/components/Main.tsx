import { useState, FC, useEffect, useContext } from "react";
import { Course } from "../data/DataDefinition/SearchWordDD";
import { Section } from "../data/DataDefinition/SectionDD";
import { SectionsContext, SectionsProvider } from "../context/SectionsContext";
import { Box, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import TopNavigationBar from "./topnavbar/TopNavigationBar";
import CourseSearchPaper from "./coursesearch/CourseSearchPaper";
import Calendar from "./calendar/1. calendar/Calendar";
import { theme } from "./Theme";
import { HistoryProvider } from "../context/HistoryContext";
import { CalandarMenu } from "./calendar/0. menu/CalandarMenu";
import { CourseColorProvider } from "../context/CourseColorContext";

/**
 * User selected course description
 * @typedef  {Object}   Course
 */
export interface Recommendation {
  compact: Section[];
  consistent: Section[];
  scatter: Section[];
  freeDay: Section[];
}

const Main: FC = () => {
  /** courses that users looked up and want to get scheduled */
  const [coursesToFetch, setCoursesToFetch] = useState<Course[]>([]);

  return (
    <ThemeProvider theme={theme}>
      <SectionsProvider>
        <CourseColorProvider>
          <div className="Page">
            <TopNavigationBar />
            <Box m={2} sx={{ height: "100%" }}>
              <div className="main-page-flexbox">
                <div className="main-page-left">
                  <Stack direction="column" spacing={2}>
                    <CourseSearchPaper
                      coursesToFetch={coursesToFetch}
                      setCoursesToFetch={setCoursesToFetch}
                    />
                  </Stack>
                </div>
                <div className="main-page-right">
                  <HistoryProvider>
                    <Stack direction="column" spacing={0.5}>
                      <CalandarMenu />
                      <Calendar />
                    </Stack>
                  </HistoryProvider>
                </div>
              </div>
            </Box>
          </div>
        </CourseColorProvider>
      </SectionsProvider>
    </ThemeProvider>
  );
};

export default Main;
