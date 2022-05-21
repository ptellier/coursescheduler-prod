
import { useState, createContext } from 'react'

export const HistoryContext = createContext();

/**
 * 
 * @param {*} props allSections, CalandarPaper and its children
 * @returns all logic related to current and next sections and states
 */
export const HistoryProvider = (props) => {

     /** history of schedules that user has explored so far */
    const [history, setHistory] = useState([]);

    /** current index of schedule in history  */
    const [pointer, setPointer] = useState(0);
    
    
    const addToHistory = (inserted) => {
        setHistory([...history, inserted])
        // set pointer to len - 1;
    }

    const showPrevInHistory = () => {
        // if not at the left end
        // update pointer to left
        // select sch from hitory according to pointer index
    }
    
    const showNextInHistory = () => {
        // if not at the right end:
        // update pointer to left
        // select sch from hitory according to pointer index
    }

    return (
        <HistoryContext.Provider value={{
            history: history,
            addToHistory: addToHistory,
            showPrevInHistory,
            showNextInHistory,
        }} >
            {props.children}
        </HistoryContext.Provider>
    )
}
