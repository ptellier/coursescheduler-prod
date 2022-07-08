import { useState, createContext } from 'react'

export const SectionsContext = createContext();

/**
 * 
 * @param {*} props allSections, CalandarPaper and its children
 * @returns all logic related to current and next sections and states
 */
export const SectionsProvider = (props) => {
    
    /**
     * currentSections: sections that are displayed on the calendar
     * setCurrentSections: sets current sections; common usage includes
     *                     switching between recommended schedules by user
     */
    const [currentSections, setCurrentSections] = useState([]);

    /** 
     * nextSections: all possible next sections available for drop
     * setNextSections: sets next possible sections
     */
    const [nextSections, setNextSections] = useState([]);

    /**
     * focusedNextSection: section that user is hovering on
     * setFocusedNextSection: sets focused next section
     */
    const [focusedNextSection, setFocusedNextSection] = useState({})

    /**
     * MODIFIES: nextSections
     * EFFECTS: retreieves and updates the next sections. As a result,
     *          this method allows displaying of next possible sections when
     *          dragging starts
     * @param {Section[][]} section 
     */
    const showNextSections = (section) => {
        const sections = getNextSections(section)
        setNextSections(sections)
    }

    /**
     * EFFECTS: find all sections that match with given section's
     *          subject, course, and activity and return all of the
     *          matched sections. Exclude given section from result
     * @param {*} section 
     * @returns 
     */
    const getNextSections = (section) => {
        const nextSections = props.allSections.filter(fetchedSection => 
            fetchedSection.subject === section.subject && 
            fetchedSection.course === section.course &&
            fetchedSection.activity === section.activity
        );
        const excludeThisSections = nextSections.filter(nextSection => 
            !(nextSection.name === section.name)
        )
        return excludeThisSections
    }

    /**
     * EFFECTS: hide the next sections when user stops dragging
     *          by setting it to empty array
     */
    const hideNextSections = () => {
        setNextSections([])
    }

    /**
     * MODIFIES: focusedNextSection
     * EFFECTS: sets focusedNextSection as given section. As a result,
     *          next section(s) that user is hovering on gets colored
     */
    const focusNextSection = (section) => {
        setFocusedNextSection(section);
    }

    /**
     * MODIFIES: focusedNextSection
     * EFFECTS: sets focusedNextSection to empty object. As a result, 
     *          uncolor next section(s) that user was hovering on
     */
    const blurNextSection = () => {
        setFocusedNextSection({});
    }

  return (
    <SectionsContext.Provider value={{
        currentSections: currentSections,
        setCurrentSections: setCurrentSections,

        nextSections: nextSections,
        showNextSections: showNextSections,
        getNextSections: getNextSections,
        hideNextSections: hideNextSections,

        focusedNextSection: focusedNextSection,
        focusNextSection: focusNextSection,
        blurNextSection: blurNextSection,
    }} >
        {props.children}
    </SectionsContext.Provider>
  )
}
