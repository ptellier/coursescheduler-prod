import {  FC } from "react";
import { Box, Stack } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import TopNavigationBar from "./topnavbar/TopNavigationBar";
import Calendar from "./calendar/1. calendar/Calendar";
import { theme } from "./Theme";
import { HistoryProvider } from "../context/HistoryContext";
import { CalandarMenu } from "./calendar/0. menu/CalandarMenu";
import { CourseColorProvider } from "../context/CourseColorContext";
import { SectionsProvider } from "../context/SectionsContext";
import CoursePanel from "./coursesearch/0. CoursePanel";


const Main: FC = () => {

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
                    <CoursePanel />
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
