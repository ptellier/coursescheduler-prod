import { Box, Paper } from '@mui/material'
import React from 'react'
import { Stack } from 'react-bootstrap'

const Instructions = () => {
  return (
    <Paper className="Paper" elevation={0} sx={{borderRadius:"20px"}}>
    <Box p={2}>
        <Stack direction="column" spacing={2} alignItems="center">
            <h4>Instructions</h4>
            <p style={{fontSize:16}}>Search "CPSC 110" and "CPSC 121" and click 'GENERATE' Button</p>
            <p style={{fontSize:16}}>You can switch between recommendations using 'Schedule Options'</p>
        </Stack>
    </Box>
</Paper>
  )
}

export default Instructions