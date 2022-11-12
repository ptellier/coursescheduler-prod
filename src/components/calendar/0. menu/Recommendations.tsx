import React, { useContext } from 'react'
import ViewCompactAltIcon from '@mui/icons-material/ViewCompactAlt'
import ViewComfyAltIcon from '@mui/icons-material/ViewComfyAlt'
import ViewTimelineIcon from '@mui/icons-material/ViewTimeline'
import ViewKanbanIcon from '@mui/icons-material/ViewKanban'
import { SectionsContext } from '../../../context/SectionsContext'
import { Recommended } from '../../../data/DataDefinition/RecommendDD'
import { IconButton, Stack, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material'

interface RecommendationProps {
    prevent: boolean
}

export const Recommendations = ({ prevent }: RecommendationProps) => {
    const { setSelectedRecommended } = useContext(SectionsContext)
    const switchRecommendation = (recommended: Recommended) => {
        setSelectedRecommended(recommended)
    }
    const [alignment, setAlignment] = React.useState<string | null>('left')

    const handleAlignment = (event: React.MouseEvent<HTMLElement>, newAlignment: string | null) => {
        setAlignment(newAlignment)
    }

    return (
        <Stack direction="row" spacing={0}>
            <ToggleButtonGroup value={alignment} exclusive onChange={handleAlignment} aria-label="recommendation options">
                <Tooltip title="Most Compact" >
                    <span>
                        <ToggleButton value="compact" size="small" aria-label="Most Compact" onClick={() => switchRecommendation(Recommended.compact)} disabled={prevent}>
                            <ViewCompactAltIcon fontSize="medium" />
                        </ToggleButton>
                    </span>
                </Tooltip>

                <Tooltip title="Most Scattered">
                    <span>
                        <ToggleButton value="scattered" size="small" aria-label="Most Scattered" onClick={() => switchRecommendation(Recommended.scattered)} disabled={prevent}>
                            <ViewComfyAltIcon fontSize="medium" />
                        </ToggleButton>
                    </span>
                </Tooltip>

                <Tooltip title="Most Consistently Starting">
                    <span>
                        <ToggleButton value="consistent" size="small" aria-label="Most Consistent" onClick={() => switchRecommendation(Recommended.consistent)} disabled={prevent}>
                            <ViewTimelineIcon fontSize="medium" />
                        </ToggleButton>
                    </span>
                </Tooltip>

                <Tooltip title="Most Free days">
                    <span>
                        <ToggleButton value="freedays" size="small" aria-label="Most Free Days" onClick={() => switchRecommendation(Recommended.freeDays)} disabled={prevent}>
                            <ViewKanbanIcon fontSize="medium" />
                        </ToggleButton>
                    </span>
                </Tooltip>
            </ToggleButtonGroup>
        </Stack>
    )
}
