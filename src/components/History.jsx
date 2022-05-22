import { Box, IconButton } from '@mui/material'
import { ButtonGroup } from 'react-bootstrap'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useContext } from 'react';
import { HistoryContext } from './context/HistoryContext';


const History = () => {
  
  const {pointer, history, showPrevInHistory, showNextInHistory} = useContext(HistoryContext);

  return (
    <Box p={1}>        
        <ButtonGroup>
            <IconButton onClick={() => showPrevInHistory()}><ChevronLeftIcon fontSize="large"/></IconButton>
            <IconButton onClick={() => showNextInHistory()}><ChevronRightIcon fontSize="large"/></IconButton>
        </ButtonGroup>

      {history.map((h, idx) => 
        // <IconButton className="btn btn-primary">{idx}</IconButton>

        <button className={`mx-2 btn ${idx === pointer ? "btn-primary" : "btn-secondary"}`}>{idx}</button>
      )}
   </Box>
  )
}

export default History
