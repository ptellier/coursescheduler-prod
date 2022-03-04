import React from 'react'
import { useEffect } from "react";
import { useDrop } from "react-dnd";
import { Cell_display } from '../../helpers/time';

interface GapProp {
  c: Cell_display;
  idx: number;
  moveItem: Function;
  setMarkId: Function
}


const Gap = ({ c, idx, moveItem, setMarkId }: GapProp) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "div",
        // function invokes whenever drops
        drop: (item) => moveItem(item, { destinIdx: idx, destinDroppableId: c.id }),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    useEffect(() => {
      if (isOver) {
        setMarkId("");
      } 
    }, [isOver])

  return (
    <div ref={drop} key={Math.random().toString(36)} style={{ height: `${c.height}rem` }} />
  )
}

export default Gap