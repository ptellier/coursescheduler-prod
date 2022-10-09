import * as React from 'react';
import {
    Box, FormControl, FormControlLabel, FormLabel,
    Paper, Radio, RadioGroup, Stack,
} from "@mui/material";
import { Recommended } from '../data/DataDefinition/RecommendDD';

function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

const ScheduleOptions = ({setSelectedRecommended}) => {
    const H_SPACING = "2rem";

    const switchRecommendation = (e, recommended) => {
        setSelectedRecommended(recommended)
    }
    return (
            <FormControl >
                {/* <FormLabel color="customFormLabel" id="generate-schedules-radio-buttons-group-label">Schedule Options</FormLabel> */}
                <RadioGroup
                    row
                    aria-labelledby="generate-schedule-options"
                    defaultValue="most compact"
                    name="radio-buttons-group"
                >
                    <FormControlLabel color="customRadioButtons" 
                                        sx={{height:H_SPACING}} 
                                        control={
                                        <Radio  value="most compact" 
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
                </RadioGroup>
            </FormControl>
    );
}

export default ScheduleOptions;