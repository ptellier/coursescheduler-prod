
import { createContext, useContext } from 'react'
import { SectionsContext } from './SectionsContext';

export const UndoRedoContext = createContext();

let undos = []
let redos = []

/*
 * TODO: remame record => recordUndoRedo
* TODO: remame clear => clearUndoRedo
*/

export const UndoRedoProvider = (props) => {
    const { currentSections, setCurrentSections } = useContext(SectionsContext);
    
    // invoked every drag & drop event
    const recordUndo = (sections) => {
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

    const clearUndoRedo = () => {
        undos = []
        redos = []
    }

  
    return (
        <UndoRedoContext.Provider value={{
            record:recordUndo,
            undo: undo,
            redo: redo,
            canUndo:canUndo,
            canRedo:canRedo,
            clearUndoRedo:clearUndoRedo
        }} >
            {props.children}
        </UndoRedoContext.Provider>
    )
}
