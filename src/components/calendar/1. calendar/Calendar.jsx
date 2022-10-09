import { useContext, useEffect } from "react";
import {Paper} from "@mui/material";
import TopDayCells from "../layout/TopDayCells";
import LeftTimeCells from "../layout/LeftTimeCells";
import MainCells from "../layout/MainCells";
import ConvertToTimeSlot from "../2. converter/ConvertToTimeSlot";
import { SectionsContext } from "../context/SectionsContext";
import { HistoryContext } from "../../context/HistoryContext";


import {useDrop} from "react-dnd";

const Calendar = ({ recommended }) => {

    const { currentSections, setCurrentSections, nextSections } = useContext(SectionsContext);
    const {setHistory} = useContext(HistoryContext);
    /**
     * sets currentSections to the recommended data
     */
    useEffect(() => {
        setCurrentSections(recommended);
        setHistory([recommended]);
    }, [recommended])

    
    /** Important: designating Calendard <div> element 
     * to be droppable fixes hanging next timeslots bug
     * when user drops outside of nextTimeSlots.
     * so, DO NOT REMOVE THIS HOOK --
     */
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "calendarTimeSlot",
        drop: (item) => {
          // cancel any drag event and revert
        },
    }));
    
    
    return (
        <Paper className="Paper" elevation={0} sx={{borderRadius:"20px"}}>
            <div ref={drop} className="grid-calendar-container">    
                <ConvertToTimeSlot currentSections={currentSections}
                                   nextSections={nextSections} 
                />
                <TopDayCells/>
                <LeftTimeCells/>
                <MainCells/>
            </div>
        </Paper>
    );
}

export default Calendar;