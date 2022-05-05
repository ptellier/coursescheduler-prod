import { useContext, useEffect, useState } from "react";
import {Paper} from "@mui/material";
import TopDayCells from "./TopDayCells";
import LeftTimeCells from "./LeftTimeCells";
import MainCells from "./MainCells";
import CalendarSection from "./CalendarSection";
import { NextMoveContext } from "./NextMoveContext";

import { TimeSlotContext } from "./TimeSlotContext";

const CalendarPaper = ({ recommended }) => {

    const {nextMoves} = useContext(NextMoveContext)
    const {displayedSections, setDisplayedSections} = useContext(TimeSlotContext)

    /**
     * sets displayedSections with recommended data
     */
    useEffect(() => {
        setDisplayedSections(recommended)
    }, [recommended])
    
    
    return (
        <Paper className="Paper" elevation={0} sx={{borderRadius:"20px"}}>
            <div id="grid-calendar-container">      
                {displayedSections.map(section => (
                    <CalendarSection key={section.id}
                                     section={section} 
                                     isNextMove={false}
                    />
                ))}

                {nextMoves.map(section => (
                    <CalendarSection key={section.id} 
                                     section={section} 
                                     isNextMove={true}                                  
                    />
                ))}
                <TopDayCells/>
                <LeftTimeCells/>
                <MainCells/>
            </div>
        </Paper>
    );
}

export default CalendarPaper;