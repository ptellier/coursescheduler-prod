import { useState, FC } from "react";
import SearchBar from "./SearchBar";
import Selections from "./Selections";
import { ListOfSearchWord } from "../data/DataDefinition/SearchWordDD";
import { ListOfSection } from "../data/DataDefinition/SectionDD";
import Schedules from "./Schedules";
import TriggerAPI from "./TriggerAPI";

const Main: FC = () => {
  /**
   * los: ListOfSchedule
   * losw:ListOfSearchWord
   * userInput: Raw input of course name a user typed in
   * userTerm: academic term
   */
  const [los, set_los] = useState<ListOfSection[]>([]);
  const [losw, set_losw] = useState<ListOfSearchWord>([]);
  const [userInput, setUserInput] = useState<string>("");
  const [userTerm, setUserTerm] = useState<string>("1");

  return (
    <div className="container p-4">
      <h1>UBC Course Scheduler</h1>
      <SearchBar userInput={userInput} 
                 setUserInput={setUserInput} 
                 losw={losw}
                 set_losw={set_losw}
                 />
      <Selections losw={losw}/>
      <TriggerAPI losw={losw} 
                  set_los={set_los}
                  userTerm={userTerm}
                  setUserTerm={setUserTerm}
                  />
      <Schedules los={los}/>
    </div>
  );
};

export default Main;
