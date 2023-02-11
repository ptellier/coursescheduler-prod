import { useContext, useEffect } from 'react'
import {useDrop} from "react-dnd";
import { timeToGridRow } from '../CalendarConstants';
import { SectionsContext } from '../../../context/SectionsContext';
import { CourseColorContext } from '../../../context/CourseColorContext';
import { UndoRedoContext } from '../../../context/UndoRedoContext';


const NextTimeSlot = ({ section, timeSlot, isInOverlapGroup }) => {

    const courseName = section.subject + " " + section.course
    const {focusedNextSection, focusNextSection, blurNextSection} = useContext(SectionsContext);
    const {currentSections, setCurrentSections} = useContext(SectionsContext);
    const {record} = useContext(UndoRedoContext)
    const {getColor} = useContext(CourseColorContext)

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
          record(newCurrentSections);
          newCurrentSections.splice(replacementIndex, 1, to);
          setCurrentSections(newCurrentSections);
      }

    
    const provideStyle = () => {
        const gridStyle = {
            gridRow: timeToGridRow(timeSlot.start_time) + " / " 
                    + timeToGridRow(timeSlot.end_time),
            gridColumn:timeSlot.day,
            borderStyle: isHoverTheSameSection() && ("dashed"),
            borderWidth: isHoverTheSameSection() && "2px",
            transform: isHoverTheSameSection() && "scale(1.10)",
            borderColor : getColor(courseName),

        }
        const overlapGroupStyle = {
            height: (timeSlot.end_time - timeSlot.start_time - 4)
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