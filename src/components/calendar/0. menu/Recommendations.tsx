import React, { useContext } from "react";
import ViewCompactAltIcon from "@mui/icons-material/ViewCompactAlt";
import ViewComfyAltIcon from "@mui/icons-material/ViewComfyAlt";
import ViewTimelineIcon from "@mui/icons-material/ViewTimeline";
import ViewKanbanIcon from "@mui/icons-material/ViewKanban";
import { SectionsContext } from "../../../context/SectionsContext";
import { Recommended } from "../../../data/DataDefinition/RecommendDD";
import { IconButton, Stack } from "@mui/material";

interface RecommendationProps {
    prevent: boolean,
}

export const Recommendations = ({prevent} : RecommendationProps) => {
  const { setSelectedRecommended } = useContext(SectionsContext);
  const switchRecommendation = (recommended: Recommended) => {
    setSelectedRecommended(recommended);
  };


  return (
    <Stack direction="row" spacing={0}>
      <IconButton disabled={prevent} onClick={() => switchRecommendation(Recommended.compact)}>
        <ViewCompactAltIcon fontSize="medium" />
      </IconButton>

      <IconButton disabled={prevent} onClick={() => switchRecommendation(Recommended.scattered)}>
        <ViewComfyAltIcon fontSize="medium" />
      </IconButton>

      <IconButton disabled={prevent} onClick={() => switchRecommendation(Recommended.consistent)}>
        <ViewTimelineIcon fontSize="medium" />
      </IconButton>

      <IconButton disabled={prevent} onClick={() => switchRecommendation(Recommended.freeDays)}>
        <ViewKanbanIcon fontSize="medium" />
      </IconButton>
    </Stack>
  );
};
