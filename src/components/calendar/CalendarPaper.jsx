import { useContext, useEffect, useState } from "react";
import {Paper} from "@mui/material";
import TopDayCells from "./TopDayCells";
import LeftTimeCells from "./LeftTimeCells";
import MainCells from "./MainCells";
import CalendarSection from "./CalendarSection";
import { NextMoveContext } from "./NextMoveContext";

const CalendarPaper = ({ recommended }) => {

    const {nextMoves} = useContext(NextMoveContext)

    const [displayedSections, setDisplayedSections] = useState([])

    /**
     * sets displayedSections with recommended data
     */
    useEffect(() => {
        setDisplayedSections(recommended)
    }, [recommended])
    
    /**
     * TODO: move this function to drop context + rename it better
     * MODIFIES: displayedSections
     * EFFECTS: filter 'from' and insert 'to' in displayedSections
     */
    const handleDrop = (from, to) => {
        const filtered = displayedSections.filter(section => section.id !== from.id)
        const inserted = [...filtered, to]
        setDisplayedSections(inserted)
    }
    
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
                                         handleDrop={handleDrop}                        
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