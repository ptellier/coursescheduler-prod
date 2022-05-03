import { useState, createContext } from 'react'

export const NextMoveContext = createContext();

/**
 * 
 * @param {*} props allSections, CalandarPaper and its children
 * @returns all logic related to next moves and states
 */
export const NextMoveProvider = (props) => {

    /** 
     * nextMoves: all possible next moves available to user
     * setNextMoves: sets next possible moves
     */
    const [nextMoves, setNextMoves] = useState([]);

    /**
     * focusedNextMove: section that user is hoverring on
     * setFocusedNextMove: sets focused next move
     */
    const [focusedNextMove, setFocusedNextMove] = useState({})

    /**
     * MODIFIES: nextMoves
     * EFFECTS: retreieves and updates the next moves. As a result,
     *          this fn allows displaying of next possible moves when
     *          dragging starts
     * @param {Section[][]} section 
     */
    const showNextMoves = (section) => {
        const sections = getNextMoves(section)
        setNextMoves(sections)
    }

    /**
     * EFFECTS: find all sections that match with given section's
     *          subject, course, and activity and return all of the
     *          matched sections. Exclude given section from result
     * @param {*} section 
     * @returns 
     */
    const getNextMoves = (section) => {
        const nextMoves = props.allSections.filter(fetchedSection => 
            fetchedSection.subject === section.subject && 
            fetchedSection.course === section.course &&
            fetchedSection.activity === section.activity
        );
        const excludeSelfNextMoves = nextMoves.filter(move => 
            !(move.name === section.name)
        )
        return excludeSelfNextMoves
    }

    /**
     * EFFECTS: hide the next moves when user stops dragging
     */
    const hideNextMoves = () => {
        setNextMoves([])
    }

    /**
     * MODIFIES: focusedNextMove
     * EFFECTS: sets focusedNextMove as given section, As a result,
     *          next move(s) that user is hoverring on get colors 
     */
    const focusNextMove = (section) => {
        setFocusedNextMove(section);
    }

    /**
     * MODIFIES: focusedNextMove
     * EFFECTS: sets focusedNextMove to empty object. As a result, 
     *          uncolor next move(s) that user was hoverring on
     */
    const blurNextMove = () => {
        setFocusedNextMove({});
    }

  return (
    <NextMoveContext.Provider value={{
        nextMoves: nextMoves,
        showNextMoves: showNextMoves,
        getNextMoves: getNextMoves,
        hideNextMoves: hideNextMoves,

        focusedNextMove: focusedNextMove,
        focusNextMove: focusNextMove,
        blurNextMove: blurNextMove,
    }} >
        {props.children}
    </NextMoveContext.Provider>
  )
}
