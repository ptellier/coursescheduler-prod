import * as React from 'react';
import {
    Box, FormControl, FormControlLabel, FormLabel,
    Paper, Radio, RadioGroup, Stack,
} from "@mui/material";
import { Recommended } from '../data/DataDefinition/RecommendDD';

// function generate(element) {
//     return [0, 1, 2].map((value) =>
//         React.cloneElement(element, {
//             key: value,
//         }),
//     );
// }

const OptionsPaper = ({setSelectedRecommended}) => {
    const H_SPACING = "2rem";

    const switchRecommendation = (e, recommended) => {
        setSelectedRecommended(recommended)
    }
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
                            <FormControlLabel color="customRadioButtons" 
                                              sx={{height:H_SPACING}} 
                                              control={
                                                <Radio value="most compact" 
                                                       onChange={(e) => switchRecommendation(e,Recommended.compact)}/>
                                              }
                                               label="most compact"
                            />
                            <FormControlLabel color="customRadioButtons" 
                                              sx={{height:H_SPACING}} 
                                              control={
                                                <Radio value="most scattered"
                                                       onChange={(e) => switchRecommendation(e,Recommended.scattered)}/>
                                              }
                                               label="most scattered"
                            />
                            <FormControlLabel color="customRadioButtons" 
                                              sx={{height:H_SPACING}} 
                                              control={
                                                <Radio value="most consistent"
                                                       onChange={(e) => switchRecommendation(e,Recommended.consistent)}/>
                                              }
                                               label="most consistent"
                            />
                            <FormControlLabel color="customRadioButtons" 
                                              sx={{height:H_SPACING}} 
                                              control={
                                                <Radio value="most free days"
                                                       onChange={(e) => switchRecommendation(e,Recommended.freeDays)}/>
                                              }
                                               label="most free days"
                            />
                            {/* <FormControlLabel color="customRadioButtons" sx={{height:H_SPACING}} value="most scattered" control={<Radio value="most scattered" onChange={(e) => setSelectedRecommended(Recommended.scattered)}/>} label="most scattered" />
                            <FormControlLabel color="customRadioButtons" sx={{height:H_SPACING}} value="most consistent" control={<Radio value="most consistent" onChange={(e) => setSelectedRecommended(Recommended.consistent)}/>} label="most consistent" />
                            <FormControlLabel color="customRadioButtons" sx={{height:H_SPACING}} value="free days" control={<Radio value="free days" onChange={(e) => setSelectedRecommended(Recommended.freeDays)} />} label="free days" /> */}
                            {/* <FormControlLabel sx={{height:H_SPACING}} value="latest end" control={<Radio />} label="latest end" />
                            <FormControlLabel sx={{height:H_SPACING}} value="earliest start" control={<Radio />} label="earliest start" />
                            <FormControlLabel sx={{height:H_SPACING}} value="latest start" control={<Radio />} label="latest start" />
                            <FormControlLabel sx={{height:H_SPACING}} value="earliest end" control={<Radio />} label="earliest end" /> */}
                        </RadioGroup>
                    </FormControl>
                    {/* <Button variant="contained" color="customButton">Select</Button> */}
                </Stack>
            </Box>
        </Paper>
    );
}

export default OptionsPaper;