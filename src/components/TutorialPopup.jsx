import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";

const TutorialPopup = ({open, setOpen}) => {

    const handleClose = () => {
        setOpen(false);
    };

    return(
        <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Instructions</DialogTitle>
        <DialogContent>
            <DialogContentText>Try searching "CPSC 110" and "CPSC 121", then click "<i>GENERATE</i>".</DialogContentText>
            <br/>
            <DialogContentText>Below this, you can switch between different criteria for optimizing your schedule.</DialogContentText>
            <br/>
            <DialogContentText>By default, you will be shown the "most compact" schedule that attempts to minimize time between classes.</DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose} color="primary">
                Close
            </Button>
        </DialogActions>
        </Dialog>
    )
}

export default TutorialPopup;