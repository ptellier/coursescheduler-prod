import { useContext, useEffect } from "react";
import {Paper} from "@mui/material";
import TopDayCells from "../layout/TopDayCells";
import LeftTimeCells from "../layout/LeftTimeCells";
import MainCells from "../layout/MainCells";
import ConvertToTimeSlot from "../2. converter/ConvertToTimeSlot";
import { SectionsContext } from "../context/SectionsContext";

const Calendar = ({ recommended }) => {

    const { currentSections, setCurrentSections, nextSections } = useContext(SectionsContext)
    /**
     * sets currentSections to the recommended data
     */
    useEffect(() => {
        setCurrentSections(recommended)
    }, [recommended])
    
    
    return (
        <Paper className="Paper" elevation={0} sx={{borderRadius:"20px"}}>
            <div className="grid-calendar-container">    
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