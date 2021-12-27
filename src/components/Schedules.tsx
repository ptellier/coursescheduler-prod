import React from "react";
import { ListOfSection, Section } from "../data/DataDefinition/SectionDD";

export interface Props {
  los: ListOfSection[];
}

const Schedules = ({ los }: Props) => {
  return (
    <ul>
      {los.map((los: ListOfSection) =>
        los.map((s) => (
          <li className="d-flex">
            <span className="pr-2">{s.name} </span>
            <span className="pr-2">{s.activity}</span>
            <span className="pr-2">{s.status}</span>
          </li>
        ))
      )}
    </ul>
  );
};

export default Schedules;
