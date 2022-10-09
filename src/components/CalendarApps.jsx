import { Box } from '@mui/material'
import History from './History'

export const CalendarApps = ({setSelectedRecommended}) => {
  return (
    <div className='d-flex'>
        <Box p={1}>       


     
            <History />

            {/* ETA calculation */}
            {/* https://developers.google.com/maps/documentation/routes/demo */}
            {/* <ButtonGroup>
                <Button>
                    <DirectionsRunIcon fontSize='large'/>
                </Button>
            </ButtonGroup> */}

            {/* Prof rating */}
            {/* <ButtonGroup>
                <Button>
                    <ThumbsUpDownSharpIcon fontSize='large'/>
                </Button>
            </ButtonGroup> */}

            {/* Reddit rating */}

            {/* Recommendation */}
            {/* <ButtonGroup className='pl-3'>
                <ScheduleOptions setSelectedRecommended={setSelectedRecommended} />
            </ButtonGroup> */}
        </Box>

    </div>
  )
}
