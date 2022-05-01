import * as React from "react";
import {Paper} from "@mui/material";
import TopDayCells from "./TopDayCells";
import LeftTimeCells from "./LeftTimeCells";
import MainCells from "./MainCells";
import CalendarSlot from "./CalendarSlot";
// import {DndProvider} from "react-dnd";
// import {HTML5Backend} from "react-dnd-html5-backend";



const CalendarPaper = ({ sections }) => {
    return (
        // <DndProvider backend={HTML5Backend}>
            <Paper className="Paper" elevation={0} sx={{borderRadius:"20px"}}>
                    <div id="grid-calendar-container">        
                        {sections.map(section => (
                            <CalendarSlot section={section} />
                        ))}
                        <TopDayCells/>
                        <LeftTimeCells/>
                        <MainCells/>
                    </div>
            </Paper>
        // </DndProvider>
    );
}

export default CalendarPaper;