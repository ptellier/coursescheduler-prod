import { useState, createContext } from 'react'


export const TimeSlotContext = createContext();

export const TimeSlotProvider = (props) => {

  const [displayedSections, setDisplayedSections] = useState([]);

  return (
    <TimeSlotContext.Provider value={{
      displayedSections: displayedSections,
      setDisplayedSections: setDisplayedSections,
    }}>
      {props.children}
    </TimeSlotContext.Provider>
  )
}
