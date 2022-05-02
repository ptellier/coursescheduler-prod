import {Paper} from "@mui/material";
import TopDayCells from "./TopDayCells";
import LeftTimeCells from "./LeftTimeCells";
import MainCells from "./MainCells";
import CalendarSection from "./CalendarSection";
import { useState } from "react";



const CalendarPaper = ({ sections, fetchedSections }) => {
    const [nextMoves, setNextMoves] = useState([])
    const [currentHover, setCurrentHover] = useState("")

    // Get and sets the next moves.
    // this function allows display of next possible moves
    // that user can make
    const showNextMoves = (section) => {
        const sections = getNextMoves(section)
        setNextMoves(sections)
    }
    // find all sections that match given course's name and number
    // and returns all of the search result as an array
    // important: itself, or given section, must be excluded
    const getNextMoves = (section) => {
        return fetchedSections.filter(fetchedSection => 
            fetchedSection.subject === section.subject && 
            fetchedSection.course === section.course &&
            fetchedSection.activity === section.activity
        );
    }

    const handleDrop = () => {
        //TODO
    }

    const hideNextMoves = () => {
        setNextMoves([])
    }

    const dragHandler = {
        showNextMoves,
        hideNextMoves
    }

    const current = {
        currentHover,
        setCurrentHover
    }

    /**
     * sections are sections given by recommendation algorithm
     * nextMoves are sections are next possible sections corresponding to user's dragging section
     */
    return (
        <Paper className="Paper" elevation={0} sx={{borderRadius:"20px"}}>
                <div id="grid-calendar-container">      

                    {sections.map(section => (
                        <CalendarSection key={section.id}
                                         section={section} 
                                         isNextMove={false} 
                                         handler={dragHandler}
                                         current={current}
                        />
                    ))}

                    {nextMoves.map(section => (
                        <CalendarSection key={section.id} 
                                         section={section} 
                                         isNextMove={true}
                                         handler={handleDrop}
                                         current={current}
                                         
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