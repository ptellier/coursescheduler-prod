import { Box, IconButton } from '@mui/material'
import { ButtonGroup } from 'react-bootstrap'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';


const History = () => {
  return (
    <Box p={1}>        
        <ButtonGroup>
            <IconButton><ChevronLeftIcon fontSize="large"/></IconButton>
            <IconButton><ChevronRightIcon fontSize="large"/></IconButton>
        </ButtonGroup>
   </Box>
  )
}

export default History
