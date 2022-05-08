import {Button} from "@mui/material";

const NavButton = ({text, icon}) => {
    return (
        <Button color="secondary" sx={{textTransform:"none"}} endIcon={icon}>{text}</Button>
    );
}

export default NavButton;