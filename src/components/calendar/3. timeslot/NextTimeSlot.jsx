import { useContext, useEffect } from 'react'
import {useDrop} from "react-dnd";
import { timeToGridRow } from '../CalendarConstants';
import { SectionsContext } from '../../../context/SectionsContext';
import { useTheme } from '@mui/material';
import { HistoryContext } from '../../../context/HistoryContext';
import { CourseColorContext } from '../../../context/CourseColorContext';


const NextTimeSlot = ({ section, timeSlot, isInOverlapGroup }) => {

    const courseName = section.subject + " " + section.course
    const {focusedNextSection, focusNextSection, blurNextSection} = useContext(SectionsContext);
    const {currentSections, setCurrentSections} = useContext(SectionsContext);
    const {addToHistory} = useContext(HistoryContext);

    const {getColor, getBackgroundColor} = useContext(CourseColorContext)

    const theme = useTheme();
    const textColors = theme.palette.calendarTimeSlotTextColors;
    const dropAcceptedColor = theme.palette.calendarTimeSlotDropAccepted;
    
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "calendarTimeSlot",
        drop: (item) => {
          // parse from and to sections 
          // then invoke handleDrop(from, to)
          const from = item
          const to = section
          handleDrop(from, to)
        },
        collect: (monitor) => ({
          isOver:  !!monitor.isOver(),
        }),
        hover: () => {
          focusNextSection(section)
        }
    }));

    /**
     * EFFECTS: blur (uncolor) the available next sections when user moves the mouse away 
     *          from this next section. As a result, ensure all the next sections get uncolored
     */
    useEffect(() => {
      !isOver && blurNextSection();
    }, [isOver])

    /**
     * TODO: fix the specification V
     * EFFECTS: produce true if the section being hovered by user is
     *          the same section as this section
     * @returns {boolean}
     */
    function isHoverTheSameSection() {
      return (section.id === focusedNextSection.id);
    }

    /**
     * MODIFIES: currentSections
     * EFFECTS: change the 'from' Section to the 'to' Section in currentSections
     *          (preserves Array order so colors stay with their sections)
     */
     const handleDrop = (from, to) => {
          const replacementIndex = currentSections.findIndex(section => section.id === from.id);
          let newCurrentSections = currentSections;
          newCurrentSections.splice(replacementIndex, 1, to);
          setCurrentSections(newCurrentSections);
          addToHistory(newCurrentSections);
      }

    
    const provideStyle = () => {
        const gridStyle = {
            gridRow: timeToGridRow(timeSlot.start_time) + " / " 
                    + timeToGridRow(timeSlot.end_time),
            gridColumn:timeSlot.day,
            borderStyle: isHoverTheSameSection() && ("dashed"),
            borderWidth: isHoverTheSameSection() && "2px",
            color: isHoverTheSameSection() && dropAcceptedColor,
            transform: isHoverTheSameSection() && "scale(1.10)",
            borderColor : getColor(courseName),

        }
        const overlapGroupStyle = {
            height: (timeSlot.end_time - timeSlot.start_time)
        }
        return isInOverlapGroup ? {...gridStyle, ...overlapGroupStyle} : gridStyle
    }

    return (
      <div className="outlined-cal-slot cal-slot"
          ref={drop}
          style={provideStyle()}
      >
          
          <div>{section.subject}</div>
          <div>{section.course + " " + section.section}</div>
      </div>
    )
}

export default NextTimeSlot