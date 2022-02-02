import React from "react";
import { Section } from "../../data/DataDefinition/SectionDD";
import { createCells } from "../../helpers/time";
import Droppable from "./Droppable";

export interface DayColumnProps {
  data: Section[];
  idx: number;
  dragEnd: Function;
  dragStart: Function;
}

const DayColumn = ({ data, idx, dragEnd: moveItem, dragStart }: DayColumnProps) => {

  return (
    <div key={Math.random().toString(36)} className="col-2 p-0">
      {createCells(data).map(c =>
        c.is_occupied ? (
          <Droppable key={c.id} c={c} idx={idx} moveItem={moveItem} dragStart={dragStart} />
        ) : (
          <div
            key={Math.random().toString(36)}
            style={{ height: `${c.height}rem` }}
          ></div>
        )
      )}
    </div>
  );
};

export default DayColumn;
