import { FC } from 'react'
import { Box, Stack } from '@mui/material'
import { ThemeProvider } from '@mui/material/styles'
import TopNavigationBar from './topnavbar/TopNavigationBar'
import Calendar from './calendar/1. calendar/Calendar'
import { CalandarMenu } from './calendar/0. menu/CalandarMenu'
import { CourseColorProvider } from '../context/CourseColorContext'
import { SectionsProvider } from '../context/SectionsContext'
import CoursePanel from './coursesearch/0. CoursePanel'
import { UndoRedoProvider } from '../context/UndoRedoContext'
import { DragDropDialog } from './dialog/DragDropDialog'

const Main: FC = () => {
    return (
            <SectionsProvider>
                <CourseColorProvider>
                    <UndoRedoProvider>
                        <div className="Page">
                            <TopNavigationBar />
                            <Box m={2} sx={{ height: '100%' }}>
                                <div className="main-page-flexbox">
                                    <div className="main-page-left">
                                        <Stack direction="column" spacing={2}>
                                            <CoursePanel />
                                        </Stack>
                                    </div>
                                    <div className="main-page-right">
                                        <Stack direction="column" spacing={0.5} style={{position: "relative"}}>
                                            <CalandarMenu />
                                            <Calendar />
                                            <DragDropDialog />
                                        </Stack>
                                    </div>
                                </div>
                            </Box>
                        </div>
                    </UndoRedoProvider>
                </CourseColorProvider>
            </SectionsProvider>
    )
}

export default Main
