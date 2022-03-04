import { Section } from "../../data/DataDefinition/SectionDD";
import { subGroupByNonOverlap } from "../../helpers/overlap";
import { Cell_display, convertToDisplay, createCells, fillTimes, generateTimes, getGapCells } from "../../helpers/time";
import Droppable from "./Droppable";
import Gap from "./Gap";

export interface DayColumnProps {
  data: Section[];
  idx: number;
  dragEnd: Function;
  dragStart: Function;
  markTarget: Function;
  markId:string;
  setMarkId:Function;
}


const DayColumn = ({ data, idx, dragEnd: moveItem, dragStart, markTarget, markId, setMarkId}: DayColumnProps) => {
 
// EFFECTS: group overlapping course schedules
// INVARIANT: cells is a sorted by start time
const groupOverlap = (cells: Cell_display[]) => {
  const first = cells[0];
  let maxEnd = first.end;
  let result:Cell_display[][] = [];
  let curr:Cell_display[] = [];
  
  for (const cell of cells) {
    if (cell.start < maxEnd) {
      curr.push(cell)    //accumlate cell to curr
      //set maxEnd = max end of curr
      maxEnd = Math.max(...curr.map(c => c.end))
    } else {
      result.push(curr) //accumulate curr to result
      curr = [cell]     //set curr = [cell]
      maxEnd = cell.end //set maxEnd = cell.end
    }
  }
  return result;
} 

const handleNonOverlap = (group:Cell_display[]) => {
  const isOverlap = false
  const c = group[0];
  if (c.is_occupied) {
    return renderDroppable(c, isOverlap)
  } else {
    return renderGap(c)
  }
}


const handleOverlap = (group:Cell_display[]) => {
  const isOverlap = true
  const startW = Math.min(...group.flatMap(g => g).map(g => g.start))
  const endW = Math.max(...group.flatMap(g => g).map(g => g.end))
  
  const listOfCells = subGroupByNonOverlap(group).map(g => {
    const gapCells = getGapCells(
      g.map(item => fillTimes(item.start, item.end, 30)).flat(),
      generateTimes(startW, endW, 30)
    )
    const mergedCells = [...g, ...convertToDisplay(gapCells.map(c => [c]))];
    const sortedCells = mergedCells.sort((c1,c2) => c1.start > c2.start ? 1 : -1)
    return sortedCells;
  })

  //Without organizing non-overlap sub groups:
  // const listOfCells = group.map(g => {
  //   const gapCells = getGapCells(
  //     fillTimes(g.start, g.end, 30),
  //     generateTimes(startW, endW, 30)
  //   )
  //   const mergedCells = [g, ...convertToDisplay(gapCells.map(c => [c]))];
  //   const sortedCells = mergedCells.sort((c1,c2) => c1.start > c2.start ? 1 : -1)
  //   return sortedCells;
  // })

  return (
    <div className="d-flex w-100">
      {listOfCells.map(cells => 
        <div 
        key={cells[0].id}
        className="w-100">
          {cells.map(c => 
            c.is_occupied 
            ? renderDroppable(c, isOverlap)
            : renderGap(c)
          )}
        </div>
         
      )}
    </div>
  );
}

const renderDroppable = (c: Cell_display, isOverlap:boolean) => {
  return <Droppable key={"Droppable-" + c.id} c={c} idx={idx} moveItem={moveItem} dragStart={dragStart} markTarget={markTarget} markId={markId} isOverlap={isOverlap} /> 
}

const renderGap = (c: Cell_display) => {
  // console.log(c)
  // return <div key={Math.random().toString(36)} style={{ height: `${c.height}rem` }} />
  return <Gap c={c} idx={idx}  moveItem={moveItem} setMarkId={setMarkId}/>
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