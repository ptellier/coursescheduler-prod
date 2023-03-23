import * as React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

type DialogFullScreenProps = {
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
    dialogOpen: boolean
    title: string
    content: string
    additionalContent?: JSX.Element
    actionButtons: JSX.Element
}

export const DialogFullScreen = ({ setDialogOpen, dialogOpen, title, content, additionalContent, actionButtons }: DialogFullScreenProps) => {
    return (
        <div>
            <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{content}</DialogContentText>
                    {additionalContent}
                </DialogContent>
                <DialogActions>{actionButtons}</DialogActions>
            </Dialog>
        </div>
    )
}
