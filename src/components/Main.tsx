import { useState, FC } from "react";
import SearchBar from "./SearchBar";
import Selections from "./Selections";
import { Course } from "../data/DataDefinition/SearchWordDD";
import { Section } from "../data/DataDefinition/SectionDD";
import TriggerAPI from "./TriggerAPI";
import Timetable from "./Timetable";

const Main: FC = () => {
  /** List of Schedule: combinations of sections list that forms a schedule */
  const [los, set_los] = useState<Section[][]>([]);
  
  /** List of Courses: courses that users looked up and want to get scheduled */
  const [loc, set_loc] = useState<Course[]>([])

  /** raw user input from search bar and term selection components */
  const [userTerm, setUserTerm] = useState<string>("1");

  return (
    <div className="p-2 m-2" style={{height:500}}>
      <h1>UBC Course Scheduler</h1>
      <div className="row h-100">
        <div className="col-sm-3 border p-3">
          <SearchBar
            loc={loc}
            set_loc={set_loc}
          />
          <Selections loc={loc} set_loc={set_loc} />
          <TriggerAPI
            loc={loc}
            set_los={set_los}
            userTerm={userTerm}
            setUserTerm={setUserTerm}
          />
        </div>
        <div className="col-sm-1 border">
        </div>
        <div className="col-sm-8 border">
          <Timetable los={los}/>
        </div>
      </div>
    </div>
  );
};

export default Main;
