import { useEffect, useState } from "react";
import { Section, Status, Term } from "../../data/DataDefinition/SectionDD";
import { groupSectionsByWeek } from "../../helpers/groupby";
import { make_timeslot } from "../../helpers/overlap";
import { Cell, Cell_display, convertToTimeSlot } from "../../helpers/time";
import { Recommendation } from "../Main";
import DayColumn from "./DayColumn";
import DaysRow from "./DaysRow";
import Layout from "./Layout";
import TimeColumn from "./TimeColumn";

export interface Props {
  recommended: Recommendation;
}


const data: Section[][] = [
  [],
  [
    {
      id: Math.floor(Math.random() * 10000).toString(),
      status: "Full",
      name: "CPSC 110 104",
      subject: "CPSC",
      course: "110",
      section: "104",
      activity: "Lecture",
      term: "1",
      schedule: [
        {
          start_time: 930,
          end_time: 1020,
          day: "Tue",
          term: "1",
        },
      ],
      isNextMove:false,
    },
    {
      id: Math.floor(Math.random() * 10000).toString(),
      status: "Full",
      name: "CPSC 110 L1S",
      subject: "CPSC",
      course: "110",
      section: "L1S",
      activity: "Laboratory",
      term: "1",
      schedule: [
        {
          start_time: 750,
          end_time: 930,
          day: "Tue",
          term: "1",
        },
      ],
      isNextMove:false,
    },
  ],
  [
    {
      id: Math.floor(Math.random() * 10000).toString(),
      status: "Restricted",
      name: "COMM 388 101",
      subject: "COMM",
      course: "388",
      section: "101",
      activity: "Lecture",
      term: "1",
      schedule: [
        {
          start_time: 870,
          end_time: 1050,
          day: "Wed",
          term: "1",
        },
      ],
      isNextMove:false,
    },
  ],
  [
    {
      id: Math.floor(Math.random() * 10000).toString(),
      status: "Full",
      name: "CPSC 110 104",
      subject: "CPSC",
      course: "110",
      section: "104",
      activity: "Lecture",
      term: "1",
      schedule: [
        {
          start_time: 930,
          end_time: 1020,
          day: "Thu",
          term: "1",
        },
      ],
      isNextMove:false,
    },
  ],
  [],
  [],
];
const additional: Section[] = [
  {
    id: Math.floor(Math.random() * 10000).toString(),
    status: "Restricted",
    name: "COMM 388 102",
    subject: "COMM",
    course: "388",
    section: "101",
    activity: "Lecture",
    term: "1",
    schedule: [
      {
        start_time: 870,
        end_time: 1050,
        day: "Fri",
        term: "1",
      },
    ],
    isNextMove:true,
  },
  {
    id: Math.floor(Math.random() * 10000).toString(),
    status: "Restricted",
    name: "COMM 388 103",
    subject: "COMM",
    course: "388",
    section: "101",
    activity: "Lecture",
    term: "1",
    schedule: [
      {
        start_time: 870,
        end_time: 1050,
        day: "Mon",
        term: "1",
      },
    ],
    isNextMove:true,
  },
  {
    id: Math.floor(Math.random() * 10000).toString(),
    status: "Restricted",
    name: "CPSC 110 101",
    subject: "CPSC",
    course: "110",
    section: "101",
    activity: "Lecture",
    term: "1",
    schedule: [
      {
        start_time: 8*60,
        end_time: 10*60,
        day: "Mon",
        term: "1",
      },
      {
        start_time: 8*60,
        end_time: 10*60,
        day: "Wed",
        term: "1",
      },
      {
        start_time: 8*60,
        end_time: 10*60,
        day: "Fri",
        term: "1",
      },
    ],
    isNextMove:true,
  },
];

const Timetable = ({ recommended }: Props) => {
  const [currentData, setCurrentData] = useState<Section[][]>(data);
  const [prevData, setPrevData] = useState<Section[][]>([
    [],
    [],
    [],
    [],
    [],
    [],
  ]);
  useEffect(() => {
    const default_opt = "compact"
    selectRecommendation(default_opt)
  }, [recommended])
  const selectRecommendation = (opt: string) => {
    if (opt === "compact") {
      setCurrentData(
        groupSectionsByWeek(recommended.compact)
      );
      setCurrentData(
        groupSectionsByWeek(recommended.compact)
      );
    } else if (opt === "consistent") {
      setCurrentData(
        groupSectionsByWeek(recommended.consistent)
      );
    } else if (opt === "scatter") {
      setCurrentData(
        groupSectionsByWeek(recommended.scatter)
      );
    } else if (opt === "freeDay") {
      setCurrentData(
        groupSectionsByWeek(recommended.freeDay)
      );
    } else if (opt === "earlyEnd") {
      setCurrentData(
        groupSectionsByWeek(recommended.earlyEnd)
      );
    } else if (opt === "earlyStart") {
      setCurrentData(
        groupSectionsByWeek(recommended.earlyStart)
      );
    } else if (opt === "lateEnd") {
      setCurrentData(
        groupSectionsByWeek(recommended.lateEnd)
      );
    } else if (opt === "lateStart") {
      setCurrentData(
        groupSectionsByWeek(recommended.lateStart)
      );
    }
  };


  const onDragStart = (c:Cell_display) => {
    stashPrevData(currentData)
    displayPossibleMoves(currentData, c)
  };

  const stashPrevData = (currentData:Section[][]) => {
    setPrevData([...currentData]);
  }
  const displayPossibleMoves = (currentData:Section[][], c:Cell_display) => {
    // TODO: filter from additional for matching courses given c
    const filtered = additional.filter(a => 
      a.subject === c.subject &&
      a.course === c.course &&
      a.activity === c.activity
    )
    const unpacked = [... currentData.flatMap(d => d), ... filtered]
    const packed = groupSectionsByWeek(unpacked)
    setCurrentData([...packed]);
  }
  const onDragEnd = (source: any, destination: any) => {
    const { draggableId, sourceDroppableId, sourceIdx } = source;
    const { destinIdx, destinDroppableId } = destination;

    if (sourceDroppableId === destinDroppableId) {
      setCurrentData([...prevData]);
    } else {
      console.log("moving");
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
                  key={Math.floor(Math.random() * 10000)}
                  data={d}
                  idx={idx}
                  dragEnd={onDragEnd}
                  dragStart={onDragStart}
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
