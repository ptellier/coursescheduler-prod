import {Paper} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { Button } from "react-bootstrap";


const TopNavigationBar = () => {
    return (
        <Paper id="top-nav-bar" className="Paper" elevation={1}>
            <div id="logo">
                <div id="logo-ubc">UBC</div>
                <div id="logo-course-scheduler">
                    <div>course</div><div>scheduler</div>
                </div>
            </div>
            <div id="nav-actions"></div>
        </Paper>
    );
}

export default TopNavigationBar;