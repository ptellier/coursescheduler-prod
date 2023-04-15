import {Button} from "@mui/material";

const NavButton = ({text, icon, href, onClick}) => {
    return (
        <Button color="customNavButton" sx={{textTransform:"none"}}
                endIcon={icon} onClick={onClick} href={href} target="_blank">{text}</Button>
    );
}

export default NavButton;