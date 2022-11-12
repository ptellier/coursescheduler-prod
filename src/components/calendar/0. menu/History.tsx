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
        <span>
        <IconButton
          disabled={prevent || !canUndo() ? true : false}
          onClick={() => undo()}
        >
          <UndoIcon fontSize="small" />
        </IconButton>
        </span>
      </Tooltip>

      <Tooltip title="Redo">
      <span>
        <IconButton
          disabled={prevent || !canRedo() ? true : false}
          onClick={() => redo()}
        >
          <RedoIcon fontSize="small" />
        </IconButton>
        </span>
      </Tooltip>
    </ButtonGroup>
  );
};

export default History;
