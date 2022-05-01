import { useEffect, useState } from "react";
import { Section } from "../../../data/DataDefinition/SectionDD";
import { groupSectionsByWeek } from "../../../helpers/groupby";
import { Cell_display } from "../../../helpers/time";
import { Recommendation } from "../../Main";
import DayColumn from "./DayColumn";
import DaysRow from "./DaysRow";
import Layout from "./Layout";
import TimeColumn from "./TimeColumn";

export interface TimetableProps {
  recommended: Recommendation;
  sections:Section[];
}


const Timetable = ({ recommended, sections }: TimetableProps) => {
  
  const [currentData, setCurrentData] = useState<Section[][]>([]);
  const [prevData, setPrevData] = useState<Section[][]>([[],[],[],[],[],[]]);
  const [markId, setMarkId] = useState<string>("");

  useEffect(() => {
    const default_opt = "compact"
    selectRecommendation(default_opt)
  }, [recommended])

  // group sections state based on recommendation option that user selects
  const selectRecommendation = (opt: string) => {
    if (opt === "compact") {
      setCurrentData(groupSectionsByWeek(recommended.compact));
    } else if (opt === "consistent") {
      setCurrentData(groupSectionsByWeek(recommended.consistent));
    } else if (opt === "scatter") {
      setCurrentData(groupSectionsByWeek(recommended.scatter));
    } else if (opt === "freeDay") {
      setCurrentData(groupSectionsByWeek(recommended.freeDay));
    } else if (opt === "earlyEnd") {
      setCurrentData(groupSectionsByWeek(recommended.earlyEnd));
    } else if (opt === "earlyStart") {
      setCurrentData(groupSectionsByWeek(recommended.earlyStart));
    } else if (opt === "lateEnd") {
      setCurrentData(groupSectionsByWeek(recommended.lateEnd));
    } else if (opt === "lateStart") {
      setCurrentData(groupSectionsByWeek(recommended.lateStart));
    }
  };

  // stash previous data before the move and display possible moves
  const onDragStart = (c: Cell_display) => {
    stashPrevData(currentData);
    displayPossibleMoves(currentData, c);
  };

  // store schedule information before user starts to drag
  // this information is used for reversing move if user decides to cancel drag
  const stashPrevData = (currentData: Section[][]) => {
    setPrevData([...currentData]);
  };

  // display set of course cells that are relevant to currently dragged course
  const displayPossibleMoves = (currentData: Section[][], c: Cell_display) => {
    let filtered = sections.filter(
      (a) =>
        a.subject === c.subject &&
        a.course === c.course &&
        a.activity === c.activity
    );
    filtered = filtered.filter(f => f.name !== c.name)
    const sectionsNextMove = markNextMove(filtered);
    const unpacked = [...currentData.flatMap((d) => d), ...sectionsNextMove];
    const packed = groupSectionsByWeek(unpacked);
    setCurrentData(packed);
  };

  // set each section to be considered as next move
  const markNextMove = (sections: Section[]) => {
    for (let s of sections) {
      s.isNextMove = true;
    }
    return sections
  }

  // set each section to be considered not as next move
  const unmarkNextMove = (sections: Section[]) => {
    for (let s of sections) {
      s.isNextMove = false;
    }
    return sections
  }

  const markTarget = (c: Cell_display) => {
    setMarkId(c.id)
  }

  const onDragEnd = (source: any, destination: any) => {
    unmarkNextMove(sections);
    const { draggableId, sourceDroppableId } = source;
    const { destinDroppableId } = destination;
    if(destinDroppableId === "gap") {
      setCurrentData([...prevData])
      return;
    }
    const unpackedPrev = prevData.flatMap(d => d)
    const removed = unpackedPrev.filter(item => item.id !== draggableId)
    const add = sections.filter(section => section.id === destinDroppableId)
    const result = [...removed, ...add]

    if (sourceDroppableId === destinDroppableId) {
      setCurrentData([...prevData]);
    } else {
      setCurrentData(groupSectionsByWeek(result));
    }
  };

  return (
    <>
      <div className="row my-2">
        <button
          className="btn btn-sm btn-primary mx-2"
          onClick={() => selectRecommendation("compact")}
        >
          Most Compact
        </button>
        <button
          className="btn btn-sm btn-primary mx-2"
          onClick={() => selectRecommendation("consistent")}
        >
          Most Consistent
        </button>
        <button
          className="btn btn-sm btn-primary mx-2"
          onClick={() => selectRecommendation("scatter")}
        >
          Most Scattered
        </button>
        <button
          className="btn btn-sm btn-primary mx-2"
          onClick={() => selectRecommendation("freeDay")}
        >
          Free Days
        </button>
        <button
          className="btn btn-sm btn-primary mx-2"
          onClick={() => selectRecommendation("earlyEnd")}
        >
          Early End
        </button>
        <button
          className="btn btn-sm btn-primary mx-2"
          onClick={() => selectRecommendation("earlyStart")}
        >
          Early Start
        </button>
        <button
          className="btn btn-sm btn-primary mx-2"
          onClick={() => selectRecommendation("lateEnd")}
        >
          Late End
        </button>
        <button
          className="btn btn-sm btn-primary mx-2"
          onClick={() => selectRecommendation("lateStart")}
        >
          Late Start
        </button>
        {/* <button className="btn btn-sm btn-primary mx-2" onClick={() => selectRecommendation("consistent")}>Other</button> */}
      </div>
      <div className="row">
        <TimeColumn />
        <div className="col-11">
          <DaysRow />
          <div
            className="table-container row p-0 m-0"
            style={{ position: "relative", width: "100%", height: "100%" }}
          >
            {/* Layout */}
            <div
              className="layout row"
              style={{ position: "relative", width: "100%" }}
            >
              <Layout />
              <Layout />
              <Layout />
              <Layout />
              <Layout />
              <Layout />
            </div>
            <div
              className="glass row"
              style={{ position: "absolute", width: "100%" }}
            >
              {/* Column from Monday to Saturday */}
              {currentData.map((d, idx) => (
                <DayColumn
                  key={"DayCol-"+idx.toString()}
                  data={d}
                  idx={idx}
                  dragEnd={onDragEnd}
                  dragStart={onDragStart}
                  markTarget={markTarget}
                  markId={markId}
                  setMarkId={setMarkId}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Timetable;
