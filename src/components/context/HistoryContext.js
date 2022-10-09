
import { useState, createContext, useContext } from 'react'
import { SectionsContext } from '../calendar/context/SectionsContext';

export const HistoryContext = createContext();

/**
 * 
 * @param {*} props allSections, CalandarPaper and its children
 * @returns all logic related to current and next sections and states
 */
export const HistoryProvider = (props) => {
    const { setCurrentSections } = useContext(SectionsContext);

     /** history of schedules that user has explored so far */
    const [history, setHistory] = useState([]);

    /** current index of schedule in history  */
    const [pointer, setPointer] = useState(0);
    
    
    const addToHistory = (inserted) => {
        let newHistory = [...history]
        if (pointer < history.length - 1) {
            const current = history[pointer];            
            newHistory = [...newHistory, current, inserted]
            setPointer(newHistory.length - 1);
        } else {
            newHistory = [...newHistory, inserted]
            setPointer(newHistory.length - 1);
        }
        setHistory(newHistory)
    }

    const showPrevInHistory = () => {
        // if not at the left end
        // update pointer to left
        // select sch from hitory according to pointer index
        if (pointer > 0) {
            const selectedHistory = history[pointer - 1];
            // await props.setCurrentRecommended(selectedHistory)
            setCurrentSections(selectedHistory)
            setPointer(pointer - 1);
        }
    }
    
    const showNextInHistory = () => {
        // if not at the right end:
        // update pointer to left
        // select sch from hitory according to pointer index
        if (pointer < history.length - 1) {
            const selectedHistory = history[pointer + 1];
            // await props.setCurrentRecommended(selectedHistory)
            setCurrentSections(selectedHistory)
            setPointer(pointer + 1);
        }
    }

    const jumpHistoryTo = (idx) => {
        setCurrentSections(history[idx])
        setPointer(idx)
    }



    return (
        <HistoryContext.Provider value={{
            history: history,
            pointer: pointer,
            jumpHistoryTo: jumpHistoryTo,
            setHistory: setHistory,
            addToHistory: addToHistory,
            showPrevInHistory,
            showNextInHistory,
        }} >
            {props.children}
        </HistoryContext.Provider>
    )
}
