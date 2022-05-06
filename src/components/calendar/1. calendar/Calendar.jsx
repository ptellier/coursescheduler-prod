import { useContext, useEffect, useState } from "react";
import {Paper} from "@mui/material";
import TopDayCells from "../layout/TopDayCells";
import LeftTimeCells from "../layout/LeftTimeCells";
import MainCells from "../layout/MainCells";
import ConvertToTimeSlot from "../2. converter/ConvertToTimeSlot";
import { NextMoveContext } from "../context/NextMoveContext";

import { TimeSlotContext } from "../context/TimeSlotContext";

const Calendar = ({ recommended }) => {

    // const {currentSections, setCurrentSections} = useContext(TimeSlotContext)
    const {currentSections, setCurrentSections, nextMoves} = useContext(NextMoveContext)

    /**
     * sets displayedSections with recommended data
     */
    useEffect(() => {
        setCurrentSections(recommended)
    }, [recommended])
    
    
    return (
        <Paper className="Paper" elevation={0} sx={{borderRadius:"20px"}}>
            <div id="grid-calendar-container">    

                {currentSections.map(section => (
                    <ConvertToTimeSlot key={section.id}
                                     section={section} 
                                     isNextMove={false}
                    />
                ))}

                {nextMoves.map(section => (
                    <ConvertToTimeSlot key={section.id} 
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

export default Calendar;