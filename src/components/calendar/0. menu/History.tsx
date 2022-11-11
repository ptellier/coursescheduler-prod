import { IconButton, Tooltip } from "@mui/material";
import { ButtonGroup } from "react-bootstrap";
import { useContext } from "react";
// import { HistoryContext } from "../../../context/HistoryContext";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";
import { UndoRedoContext } from "../../../context/UndoRedoContext";


  // const { pointer, history, showPrevInHistory, showNextInHistory } =
  //   useContext(HistoryContext);
interface HistoryProps {
  prevent: boolean;
}


const History = ({ prevent }: HistoryProps) => {
  const {undo, redo, canUndo, canRedo} = useContext(UndoRedoContext)
  return (
    <ButtonGroup>
      <Tooltip title="Undo">
        <IconButton
          disabled={prevent || !canUndo() ? true : false}
          onClick={() => undo()}
          // disabled={prevent || pointer === 0 ? true : false}
          // onClick={() => showPrevInHistory()}
        >
          <UndoIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Redo">
        <IconButton
          disabled={prevent || !canRedo() ? true : false}
          onClick={() => redo()}
          // disabled={prevent || pointer === history.length - 1 ? true : false}
          // onClick={() => showNextInHistory()}
        >
          <RedoIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  );
};

export default History;
