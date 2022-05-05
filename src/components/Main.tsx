import { useState, FC } from "react";
import { Course } from "../data/DataDefinition/SearchWordDD";
import { Section } from "../data/DataDefinition/SectionDD";
import TriggerAPI from "./TriggerAPI";
import CalendarPaper from "./calendar/CalendarPaper";
import TopNavigationBar from "./topnavbar/TopNavigationBar";
import { NextMoveProvider } from "./calendar/NextMoveContext";
import { TimeSlotProvider } from "./calendar/TimeSlotContext";
import CourseSearchPaper from "./coursesearch/CourseSearchPaper";


/**
 * User selected course description
 * @typedef  {Object}   Course
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

  /** all sections that were fetched from web scrapper */
  const [sections, setSections] = useState<Section[]>([]);

  /** sections that were recommended, each array is a recommendation */
  const [recommended, set_recommended] = useState<Recommendation>(
    {
      compact: [], consistent: [], scatter: [], earlyStart: [], 
      lateStart: [], earlyEnd: [], lateEnd: [], freeDay: [],
    }
  );

  /** courses that users looked up and want to get scheduled */
  const [coursesToFetch, setCoursesToFetch] = useState<Course[]>([]);

  /** raw user input from search bar and term selection components */
  const [userTerm, setUserTerm] = useState<string>("1");

  return (
    <div className="p-2 m-2" style={{ height: 500 }}>
      <TopNavigationBar />
      <div className="row h-100">
        <div className="col-sm-3 border p-3">
          <CourseSearchPaper coursesToFetch={coursesToFetch} 
                             setCoursesToFetch={setCoursesToFetch}
          />
          <TriggerAPI
            loc={coursesToFetch}
            set_recommended={set_recommended}
            setSections={setSections}
            userTerm={userTerm}
            setUserTerm={setUserTerm}
          />
        </div>
        <div className="col-sm-9 border p-4 px-5">
          <NextMoveProvider allSections={sections}>
            <TimeSlotProvider>
             <CalendarPaper recommended={recommended.compact}/>
            </TimeSlotProvider>
          </ NextMoveProvider>
        </div>
      </div>
    </div>
  );
};

export default Main;
