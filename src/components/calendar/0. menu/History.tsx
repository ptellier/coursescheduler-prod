import { IconButton, Tooltip } from "@mui/material";
import { ButtonGroup } from "react-bootstrap";
import { useContext } from "react";
import { HistoryContext } from "../../../context/HistoryContext";
import UndoIcon from "@mui/icons-material/Undo";
import RedoIcon from "@mui/icons-material/Redo";

interface HistoryProps {
  prevent: boolean;
}
const History = ({ prevent }: HistoryProps) => {
  const { pointer, history, showPrevInHistory, showNextInHistory } =
    useContext(HistoryContext);

  return (
    <ButtonGroup>
      <Tooltip title="Undo">
        <IconButton
          disabled={prevent || pointer === 0 ? true : false}
          onClick={() => showPrevInHistory()}
        >
          <UndoIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Redo">
        <IconButton
          disabled={prevent || pointer === history.length - 1 ? true : false}
          onClick={() => showNextInHistory()}
        >
          <RedoIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  );
};

export default History;
