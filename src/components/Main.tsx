import { useState, FC } from "react";
import SearchBar from "./SearchBar";
import Selections from "./Selections";
import { SearchWord } from "../data/DataDefinition/SearchWordDD";
import { Section } from "../data/DataDefinition/SectionDD";
import Schedules from "./Schedules";
import TriggerAPI from "./TriggerAPI";

const Main: FC = () => {
  /** ??? Result that will be used after solve & optimize stage */
  const [los, set_los] = useState<Section[][]>([]);

  /** accumulated user search words history */
  const [losw, set_losw] = useState<SearchWord[]>([]);

  /** raw user input from search bar and term selection components */
  const [userInput, setUserInput] = useState<string>("");
  const [userTerm, setUserTerm] = useState<string>("1");

  /** section data from API that are accumulated so far */
  // const [all_sections, set_all_sections] = useState<Section[]>([])

  return (
    <div className="container p-4">
      <h1>UBC Course Scheduler</h1>
      <SearchBar userInput={userInput} 
                 setUserInput={setUserInput} 
                 losw={losw}
                 set_losw={set_losw}

                 //  all_sections={all_sections}
                 //  set_all_sections={set_all_sections}
                 />
      <Selections losw={losw} set_losw={set_losw}/>
      <TriggerAPI losw={losw} 
                  set_los={set_los}
                  userTerm={userTerm}
                  setUserTerm={setUserTerm}

                  // all_sections={all_sections}
                  />
      <Schedules los={los}/>
    </div>
  );
};

export default Main;
