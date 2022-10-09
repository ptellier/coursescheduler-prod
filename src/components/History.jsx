import { Box, IconButton } from '@mui/material'
import { ButtonGroup } from 'react-bootstrap'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { useContext } from 'react';
import { HistoryContext } from './context/HistoryContext';


const History = () => {
  
  const {pointer, history, showPrevInHistory, showNextInHistory} = useContext(HistoryContext);


  return (      
      <ButtonGroup>
          <IconButton 
            disabled={pointer === 0 ? true : false}
            onClick={() => showPrevInHistory()}
          >
            <ChevronLeftIcon fontSize="large"/>
          </IconButton>
          
          <IconButton 
            disabled={pointer === history.length-1 ? true : false}
            onClick={() => showNextInHistory()}
            >
              <ChevronRightIcon fontSize="large"/>
          </IconButton>
      </ButtonGroup>
  )
}

export default History
