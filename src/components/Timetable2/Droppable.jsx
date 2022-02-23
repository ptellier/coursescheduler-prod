import { useEffect } from "react";
import { useDrop } from "react-dnd";
import Draggable from "./Draggable";

const Droppable = ({ c, idx, moveItem, dragStart, markTarget, markId }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    // function invokes whenever drops
    drop: (item) => moveItem(item, { destinIdx: idx, destinDroppableId: c.id }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  useEffect(() => {
    if (isOver && c.id) {
      markTarget(c);
    }
  }, [isOver])

  return (
    <div ref={drop}>
      {c.isNextMove ? (
        <div
          key={`${c.id}`}
          className={`d-flex border rounded align-items-center justify-content-center ${markId == c.id && 'bg-success'}`}
          style={{
            height: `${c.height}rem`,
            backgroundColor: "rgba(30,50,173,0.5)",
          }}
        >
          {c.name}
        </div>
      ) : (
        <Draggable
          key={`${c.id}`}
          id={c.id}
          idx={idx}
          c={c}
          dragStart={dragStart}
        />
      )}
    </div>
  );
};

export default Droppable;
