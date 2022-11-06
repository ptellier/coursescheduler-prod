import { Divider, Paper, Stack } from "@mui/material";
import { useContext } from "react";
import { SectionsContext } from "../../../context/SectionsContext";
import History from "./History";
import { Recommendations } from "./Recommendations";

export const CalandarMenu = () => {
    const { recommended } = useContext(SectionsContext);
    let prevent
    recommended.compact .length === 0 ? prevent = true : prevent = false 

    return (
        <Paper
          className="Paper p-2"
          elevation={0}
          sx={{ borderTopRightRadius: 20, borderTopLeftRadius: 20 }}
        >
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem />}
            spacing={3}
          >
            <History prevent={prevent}/>
            <Recommendations prevent={prevent} />
          </Stack>
        </Paper>
      );

};
