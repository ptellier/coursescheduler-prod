import React from "react";
import { Section } from "../../data/DataDefinition/SectionDD";
import { createCells } from "../../helpers/time";

export interface Props {
    data: Section[]
  }
  

const DayColumn = ({data}: Props) => {
  return (
    <div className="col-2 p-0">
      {createCells(data).map((c) => {
        // console.log(c)

        return (
        c.is_occupied 
         ? <div className="d-flex border rounded align-items-center justify-content-center" 
                style={{ height: `${c.height}rem`, backgroundColor:"rgba(106,13,173,0.5)"}}

                >
                  {c.name}
          </div>
         : <div className="" style={{ height: `${c.height}rem` }}></div>
        )
      })}
    </div>
  );
};

export default DayColumn;
