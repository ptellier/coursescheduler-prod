import { useContext } from "react";
import {Paper} from "@mui/material";
import TopDayCells from "../layout/TopDayCells";
import LeftTimeCells from "../layout/LeftTimeCells";
import MainCells from "../layout/MainCells";
import ConvertToTimeSlot from "../2. converter/ConvertToTimeSlot";
import { SectionsContext } from "../../../context/SectionsContext";
import {useDrop} from "react-dnd";

const Calendar = () => {
    const { currentSections, nextSections } = useContext(SectionsContext);

    //TODO: Fix and apply history here
    // const {setHistory} = useContext(HistoryContext);
    // useEffect(() => {
    //     setHistory([currentSections]);
    // }, [selectedRecommended, recommended])

    
    /** Important: designating Calendar <div> element
     * to be droppable fixes hanging next timeslots bug
     * when user drops outside of nextTimeSlots.
     * so, DO NOT REMOVE THIS HOOK --
     */
        // eslint-disable-next-line no-unused-vars
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "calendarTimeSlot",
        drop: (item) => {
          // cancel any drag event and revert
        },
    }));
    
    
    return (
        <Paper className="Paper" elevation={0} sx={{borderBottomLeftRadius: 20, borderBottomRightRadius: 20}}>
            <div ref={drop} className="grid-calendar-container">    
                <ConvertToTimeSlot 
                    currentSections={currentSections}
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