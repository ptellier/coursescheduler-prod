import {Button} from "@mui/material";

const NavButton = ({text, icon}) => {
    return (
        <Button color="customNavButton" sx={{textTransform:"none"}} endIcon={icon}>{text}</Button>
    );
}

export default NavButton;