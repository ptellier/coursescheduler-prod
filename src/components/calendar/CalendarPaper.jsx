import { useState } from "react";
import {Paper} from "@mui/material";
import TopDayCells from "./TopDayCells";
import LeftTimeCells from "./LeftTimeCells";
import MainCells from "./MainCells";
import CalendarSection from "./CalendarSection";



const CalendarPaper = ({ displayedSections, allSections }) => {
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
        const nextMoves = allSections.filter(fetchedSection => 
            fetchedSection.subject === section.subject && 
            fetchedSection.course === section.course &&
            fetchedSection.activity === section.activity
        );
        const excludeSelfNextMoves = nextMoves.filter(move => 
            !(move.name === section.name)
        )
        return excludeSelfNextMoves
    }

    const handleDrop = () => {
        //TODO
    }

    const hideNextMoves = () => {
        setNextMoves([])
    }

    //Note:
    // following wrappers are to contain
    // multiple variables and functions
    // for convinience in prop drilling

    // dragHandler contains functions that
    // handle displaying next moves ("timeslot")
    // when user starts dragging
    // and hiding next moves when user stops dragging
    const dragHandler = {
        showNextMoves,
        hideNextMoves
    }

    // current contains state and function that
    // maintains currently hovered timeslot.
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

                    {displayedSections.map(section => (
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