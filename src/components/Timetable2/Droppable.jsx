import { useDrop } from "react-dnd";
import Draggable from "./Draggable";

const Droppable = ({ c, idx, moveItem, dragStart }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "div",
    // function invokes whenever drops
    drop: (item) => moveItem(item, { destinIdx: idx, destinDroppableId: c.id }),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div ref={drop}>
      {c.isNextMove ? (
        <div
          className="bg-danger"
          style={{
            height: `${c.height}rem`,
            backgroundColor: "rgba(106,13,173,0.5)",
          }}
        ></div>
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
