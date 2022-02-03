import { useEffect, useState } from "react";
import { Section } from "../../data/DataDefinition/SectionDD";
import { group5Days, groupSectionsByWeek } from "../../helpers/groupby";
import { make_timeslot } from "../../helpers/overlap";
import { Recommendation } from "../Main";
import DayColumn from "./DayColumn";
import DaysRow from "./DaysRow";
import Layout from "./Layout";
import TimeColumn from "./TimeColumn";

export interface Props {
  recommended: Recommendation;
}



const Timetable = ({ recommended }: Props) => {
  const [currentData, setCurrentData] = useState<Section[][]>([[],[],[],[],[],[]]);
  useEffect(() => {
    const default_opt = "compact"
    selectRecommendation(default_opt)
  }, [recommended])


  const selectRecommendation = (opt: string) => {
    if (opt === "compact") {
      setCurrentData(groupSectionsByWeek(recommended.compact))
    } else if (opt === "consistent") {
      setCurrentData(groupSectionsByWeek(recommended.consistent))
    } else if (opt === "scatter") {
      setCurrentData(groupSectionsByWeek(recommended.scatter))
    } else if (opt === "freeDay") {
      setCurrentData(groupSectionsByWeek(recommended.freeDay))
    } else if (opt === "earlyEnd") {
      setCurrentData(groupSectionsByWeek(recommended.earlyEnd))
    } else if (opt === "earlyStart") {
      setCurrentData(groupSectionsByWeek(recommended.earlyStart))
    } else if (opt === "lateEnd") {
      setCurrentData(groupSectionsByWeek(recommended.lateEnd))
    } else if (opt === "lateStart") {
      setCurrentData(groupSectionsByWeek(recommended.lateStart))
    }
  }

  // IMPORTANT: UI was crashing because each section in los
  //            has string value in place of start, end time
  //            Your createCell() function assumes start and end time
  //            are numeric value. You need a helper that converts 
  //            current schedule element to timeslot
  const convertToTimeSlot = (los: Section[]): Section[] => {
    return los.map(section => {
      const schedule = section.schedule[0]
      const start = schedule.start_time
      const end = schedule.end_time
      const day = schedule.day
      const term = schedule.term

      const obj = Object.assign({}, section)
      obj.schedule = [make_timeslot(`${start}`, `${end}`, day, term)]
      return obj
    })
  }



  return (
    <>
      <div className="row my-2">
        <button className="btn btn-sm btn-primary mx-2" onClick={() => selectRecommendation("compact")}>Most Compact</button>
        <button className="btn btn-sm btn-primary mx-2" onClick={() => selectRecommendation("consistent")}>Most Consistent</button>
        <button className="btn btn-sm btn-primary mx-2" onClick={() => selectRecommendation("scatter")}>Most Scattered</button>
        <button className="btn btn-sm btn-primary mx-2" onClick={() => selectRecommendation("freeDay")}>Free Days</button>
        <button className="btn btn-sm btn-primary mx-2" onClick={() => selectRecommendation("earlyEnd")}>Early End</button>
        <button className="btn btn-sm btn-primary mx-2" onClick={() => selectRecommendation("earlyStart")}>Early Start</button>
        <button className="btn btn-sm btn-primary mx-2" onClick={() => selectRecommendation("lateEnd")}>Late End</button>
        <button className="btn btn-sm btn-primary mx-2" onClick={() => selectRecommendation("lateStart")}>Late Start</button>
        {/* <button className="btn btn-sm btn-primary mx-2" onClick={() => selectRecommendation("consistent")}>Other</button> */}
      </div>

      <div className="row">
        <TimeColumn />
        <div className="col-11">
          <DaysRow />
          <div className="table-container row p-0 m-0" style={{ position: "relative", width: "100%", height: "100%"}}>
            {/* Layout */}
            <div className="layout row" style={{ position: "relative", width: "100%" }}>
              <Layout />
              <Layout />
              <Layout />
              <Layout />
              <Layout />
              <Layout />
            </div>
            <div className="glass row" style={{ position: "absolute", width: "100%" }}>
              {/* Column from Monday to Saturday */}
              {currentData.map(d => 
                <DayColumn key={Math.random()} data={d} />
                )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timetable;
