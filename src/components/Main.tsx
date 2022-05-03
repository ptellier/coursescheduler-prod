import { useState, FC } from "react";
import SearchBar from "./SearchBar";
import Selections from "./Selections";
import { Course } from "../data/DataDefinition/SearchWordDD";
import { Section } from "../data/DataDefinition/SectionDD";
import TriggerAPI from "./TriggerAPI";
import CalendarPaper from "./calendar/CalendarPaper";
import TopNavigationBar from "./topnavbar/TopNavigationBar";
import { NextMoveProvider } from "./calendar/NextMoveContext";


/**
 * User selected course description
 * @typedef  {Object}   Course
 * @property {Section[]} compact        - "CPSC/110"

 */
export interface Recommendation {
  compact: Section[];
  consistent: Section[];
  scatter: Section[];
  earlyStart: Section[];
  lateStart: Section[];
  earlyEnd: Section[];
  lateEnd: Section[];
  freeDay: Section[];
}

const Main: FC = () => {

  const [sections, setSections] = useState<Section[]>([]);
  /** List of Schedule: combinations of sections list that form a schedule */
  const [recommended, set_recommended] = useState<Recommendation>({
    compact: [], consistent: [], scatter: [], earlyStart: [], 
    lateStart: [], earlyEnd: [], lateEnd: [], freeDay: [],
  });

  /** List of Courses: courses that users looked up and want to get scheduled */
  const [loc, set_loc] = useState<Course[]>([]);

  /** raw user input from search bar and term selection components */
  const [userTerm, setUserTerm] = useState<string>("1");

  return (
    <div className="p-2 m-2" style={{ height: 500 }}>
      <TopNavigationBar />
      <div className="row h-100">
        <div className="col-sm-3 border p-3">
          <SearchBar loc={loc} set_loc={set_loc} />
          <Selections loc={loc} set_loc={set_loc} />
          <TriggerAPI
            loc={loc}
            set_recommended={set_recommended}
            setSections={setSections}
            userTerm={userTerm}
            setUserTerm={setUserTerm}
          />
        </div>
        <div className="col-sm-9 border p-4 px-5">
          <NextMoveProvider allSections={sections}>
            <CalendarPaper recommended={recommended.compact}/>
          </ NextMoveProvider>
        </div>
      </div>
    </div>
  );
};

export default Main;
