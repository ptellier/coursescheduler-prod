import * as React from 'react';
import {
    Box, Button, Divider, FormControl, FormControlLabel, FormLabel, List, ListItem, ListItemIcon, ListItemText,
    Paper, Radio, RadioGroup, Stack,
} from "@mui/material";
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const OptionsPaper = () => {
    const H_SPACING = "2rem";

    return (
        <Paper className="Paper" elevation={0} sx={{borderRadius:"20px"}}>
            <Box p={2}>
                <Stack direction="column" spacing={2} alignItems="center">
                    <FormControl>
                        <FormLabel color="customFormLabel" id="generate-schedules-radio-buttons-group-label">Schedule Options</FormLabel>
                        <RadioGroup
                            aria-labelledby="generate-schedule-options"
                            defaultValue="most compact"
                            name="radio-buttons-group"
                        >
                            <FormControlLabel color="customRadioButtons" sx={{height:H_SPACING}} value="most compact" control={<Radio />} label="most compact" />
                            <FormControlLabel color="customRadioButtons" sx={{height:H_SPACING}} value="most scattered" control={<Radio />} label="most scattered" />
                            <FormControlLabel color="customRadioButtons" sx={{height:H_SPACING}} value="most consistent" control={<Radio />} label="most consistent" />
                            <FormControlLabel color="customRadioButtons" sx={{height:H_SPACING}} value="free days" control={<Radio />} label="free days" />
                            {/* <FormControlLabel sx={{height:H_SPACING}} value="latest end" control={<Radio />} label="latest end" />
                            <FormControlLabel sx={{height:H_SPACING}} value="earliest start" control={<Radio />} label="earliest start" />
                            <FormControlLabel sx={{height:H_SPACING}} value="latest start" control={<Radio />} label="latest start" />
                            <FormControlLabel sx={{height:H_SPACING}} value="earliest end" control={<Radio />} label="earliest end" /> */}
                        </RadioGroup>
                    </FormControl>
                    <Button variant="contained" color="customButton">Select</Button>
                </Stack>
            </Box>
        </Paper>
    );
}

export default OptionsPaper;