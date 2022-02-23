import React from "react";
import { Section } from "../../data/DataDefinition/SectionDD";
import { Cell, Cell_display, convertToDisplay, createCells, fillTimes, generateTimes, getGapCells } from "../../helpers/time";
import Droppable from "./Droppable";

export interface DayColumnProps {
  data: Section[];
  idx: number;
  dragEnd: Function;
  dragStart: Function;
  markTarget: Function;
  markId:string;
}


const DayColumn = ({ data, idx, dragEnd: moveItem, dragStart, markTarget, markId }: DayColumnProps) => {

// REQUIRES: cells is sorted array
// EFFECTS: group overlapping course schedules
const groupOverlap = (cells: Cell_display[]) => {
  let acc = [];
  let prev = cells[0];
  let addition = [];
  let record:Cell_display[] = [];

  for (let i=1; i < cells.length; i++) {
      if (overlaps(prev, cells[i])) {
          if (record.includes(prev)) {
              record.push(cells[i])
              addition.push(cells[i]);
          } else {
              record.push(prev)
              record.push(cells[i])
              addition.push(prev, cells[i]);
          }

          if (prevLonger(prev, cells[i])) {
            prev = prev;
          } else {
            prev = cells[i];
          }

      } else {
          if (addition.length === 0) {
              acc.push([prev])
          } else {
              acc.push(addition);
              addition = [];
          }
          if (i === cells.length - 1) { acc.push([cells[i]])}

          prev = cells[i];
      }
      
      // OG: prev = cells[i];
  }
  
  acc.push(addition);
  if (acc[acc.length - 1].length === 0) { acc.pop() }
  return acc;
}

//EFFECTS: produce true if prev course has longer duration than curr
const prevLonger = (prev:Cell_display , curr: Cell_display) => {
  const prevDur = prev.end - prev.start;
  const currDur = curr.end - curr.start;
  return prevDur > currDur;
}

// EFFECTS: return true if two cells overlaps
const overlaps = (c1:Cell_display, c2:Cell_display) => {
  let s1 = c1.start; let e1 = c1.end;
  let s2 = c2.start; let e2 = c2.end;
  return ((e2 > e1) && (s2 < e1)) || ((e2 <= e1) && (e2 > s1))
}

const handleNonOverlap = (group:Cell_display[]) => {
  const c = group[0];
  if (c.is_occupied) {
    return renderDroppable(c)
  } else {
    return renderGap(c)
  }
}

const handleOverlap = (group:Cell_display[]) => {
  const startW = Math.min(...group.flatMap(g => g).map(g => g.start))
  const endW = Math.max(...group.flatMap(g => g).map(g => g.end))

  const listOfCells = group.map(g => {
    const gapCells = getGapCells(
      fillTimes(g.start, g.end, 30),
      generateTimes(startW, endW, 30)
    )
    const mergedCells = [g, ...convertToDisplay(gapCells.map(c => [c]))];
    const sortedCells = mergedCells.sort((c1,c2) => c1.start > c2.start ? 1 : -1)
    return sortedCells;
  })

  return (
    <div className="d-flex">
      {listOfCells.map(cells => 
        <div>
          {cells.map(c => 
            c.is_occupied 
            ? renderDroppable(c)
            : renderGap(c)
          )}
        </div>
         
      )}
    </div>
  );
}

const renderDroppable = (c: Cell_display) => {
  return <Droppable key={"Droppable-" + c.id} c={c} idx={idx} moveItem={moveItem} dragStart={dragStart} markTarget={markTarget} markId={markId} /> 
}

const renderGap = (c: Cell_display) => {
  return <div key={Math.random().toString(36)} style={{ height: `${c.height}rem` }} />
}


  return (
    <div key={Math.random().toString(36)} className="col-2 p-0">
      {groupOverlap(createCells(data)).map(group => (
        group.length === 1
          ? handleNonOverlap(group) 
          : handleOverlap(group)
      ))}
    </div>
  );
};

export default DayColumn;