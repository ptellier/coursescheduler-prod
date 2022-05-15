import {Paper} from "@mui/material";
import {BottomNavigation, BottomNavigationAction} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import GitHubIcon from "@mui/icons-material/GitHub";
import PaletteIcon from "@mui/icons-material/Palette";

import NavButton from "./NavButton";


const TopNavigationBar = () => {
    return (
        <Paper id="top-nav-bar" className="Paper" elevation={1}>
            <div id="logo">
                <div id="logo-ubc">UBC</div>
                <div id="logo-course-scheduler">
                    <div>course</div><div>scheduler</div>
                </div>
            </div>
            <div id="nav-actions">
                <NavButton text="About" icon={<InfoOutlinedIcon/>}></NavButton>
                <NavButton href="https://github.com/limseung1/coursescheduler" text="GitHub" icon={<GitHubIcon/>}></NavButton>
                <NavButton text="Theme" icon={<PaletteIcon/>}></NavButton>
            </div>
        </Paper>
    );
}

export default TopNavigationBar;