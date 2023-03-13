import React, { useContext, useEffect, useState } from 'react'
import { SectionsContext } from '../../context/SectionsContext';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Checkbox from '@mui/material/Checkbox';
import dndGIF from './DragDrop.gif';
import { Button, FormControlLabel } from '@mui/material';


type CloseButtonProps = {
  fnClose: Function
  variant: string
}

type DoNotShowAgainProps = {
  disableDialog:boolean,
  setDisableDialog:Function
}

type Wrapper = {
  children: JSX.Element[]
}


export const DragDropDialog = () => {

  const { recommended } = useContext(SectionsContext);
  const [isOpen, setIsOpen] = useState(false);
  const [disableDialog, setDisableDialog] = useState(false);

  useEffect(() => {
    let doNotshowDialog = "disable-dnd-dialog" in window.sessionStorage || "disable-dnd-dialog" in window.localStorage;
    setTimeout(() => {
      (!doNotshowDialog && recommended.compact.length > 0 && !disableDialog) && setIsOpen(true);
    }, 1000)
  }, [recommended]);

  function closeDialog() {
    setIsOpen(false);
    if (disableDialog) {
      window.localStorage["disable-dnd-dialog"] = true;
    } else {
      setDisableDialog(true);
    }
  }
  
  if (isOpen) {
    return ( 
      <Layout>
        <CloseButton variant="icon" fnClose={closeDialog}/>
        <GIF />
        <Content >
          <Message />
          <Controls >
            <DoNotShowAgain disableDialog={disableDialog} setDisableDialog={setDisableDialog}/>
            <CloseButton variant="button" fnClose={closeDialog}/>
          </Controls>
        </Content>
      </Layout>
    );
  };
  return <></>;
}

const GIF = () => {
  return  <img style={GIFstyle} src={dndGIF} />;
}

const CloseButton = ({fnClose, variant} : CloseButtonProps) => {
  return (
    <div style={CloseButtonStyle}>
      {variant === 'icon'   && <IconButton onClick={() => fnClose()}><CloseIcon /></IconButton>}
      {variant === 'button' && <Button variant="contained" onClick={() => fnClose()} >Close</Button>}
    </div>
  );
}


const DoNotShowAgain = ({disableDialog, setDisableDialog}: DoNotShowAgainProps) => {
  return (
      <FormControlLabel 
        control={<Checkbox checked={disableDialog} onChange={() => setDisableDialog(!disableDialog)}/>} 
        label="Do not show me this again" 
      />
  );
}
const Message = () => {
  return <p style={MessageStyle}>See other available sections by drag and drop</p>;
}


const Layout = ({children} : Wrapper) => {
  return (
    <div style={{position: "absolute", ...LayoutStyle}}>
      {children}
     </div>
  );
}

const Content = ({children}: Wrapper) => {
  return <div style={ContentStyle}>{children}</div>;
}

const Controls = ({children}: Wrapper) => {
  return <div style={{position:'absolute', ...ControlsStyle}}>{children}</div>;
}


// Styles:
const MessageStyle = {
  fontSize: 20,
}

const ContentStyle = {
  marginTop: 10
}

const ControlsStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  minWidth: '95%',
  bottom:0,
}

const LayoutStyle = {
  height: 500,
  width: 450,
  backgroundColor: 'white',
  padding: 10,
  border: '5px solid #c4c4c4',
  borderRadius: 10,
  zIndex:10,
  top: "50%",
  left: "50%",
  transform: 'translate(-50%, -50%)'
}

const GIFstyle = {
  borderRadius: 10,
  height: '60%',
  width: '100%',
}

const CloseButtonStyle = {
  display:'flex', 
  justifyContent: 'end', 
  alignItems: 'center',
}
