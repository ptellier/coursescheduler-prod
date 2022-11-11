
import { useState, createContext, useContext } from 'react'
import { SectionsContext } from './SectionsContext';

export const UndoRedoContext = createContext();

let undos = []
let redos = []
/**
 * 
 * @param {*} props allSections, CalandarPaper and its children
 * @returns all logic related to current and next sections and states
 */
export const UndoRedoProvider = (props) => {
    const { currentSections, setCurrentSections } = useContext(SectionsContext);
    
    // invoked every drag & drop event
    const record = (sections) => {
        undos.push([...sections])
    }
    
    const undo = () => {
        if (canUndo()) {
            redos.push([...currentSections])
            const prior = undos.pop()
            setCurrentSections(prior)
        }
    }
    
    const redo = () => {
        if (canRedo()) {
            undos.push([...currentSections])
            const post = redos.pop()
            setCurrentSections(post)
        }
    }

    const canUndo = () => {
        return undos.length > 0;
    }

    const canRedo = () => {
        return redos.length > 0;
    }

  
    return (
        <UndoRedoContext.Provider value={{
            record:record,
            undo: undo,
            redo: redo,
            canUndo:canUndo,
            canRedo:canRedo,
        }} >
            {props.children}
        </UndoRedoContext.Provider>
    )
}
