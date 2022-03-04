import React, { useEffect } from "react";
import { useDrag } from "react-dnd";

const Draggable = ({ id, idx, c, dragStart }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "div",
    item: { draggableId: id, sourceDroppableId: id, sourceIdx: idx },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  useEffect(() => {
    isDragging && dragStart(c)
  }, [isDragging]);

  return (
          <div
            ref={drag}
            className="d-flex border rounded align-items-center justify-content-center"
            style={{
              height: `${c.height}rem`,
              backgroundColor: "rgba(106,13,173,0.5)",
            }}
          >
            {c.name}
          </div>
  );
};

export default Draggable;
