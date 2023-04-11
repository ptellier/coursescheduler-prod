import {Paper} from "@mui/material";


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