import React, { ReactChildren } from 'react'
import dndGIF from './generate.gif';

type DragDropDialogProps = {
  open: boolean
}

type ContentProps = {
  children: JSX.Element
}

export const DragDropDialog = (props: DragDropDialogProps) => {
  const {open} = props;

  if (open) {
    return ( 
      <Content>
        <GIF />
      </Content>
    )
  }
  return <></>
}

const GIF = () => {
  return ( 
    <img style={{}} height={"90%"} width={"100%"} src={dndGIF} /> 
    
  )
}

const Content = ({children}:ContentProps) => {
  return (
    <div style={{position: "absolute", ...contentStyle}} >
      {children}
     </div>
  )
}


// Styles:
const contentStyle = {
  height: "40%",
  width: "40%",
  backgroundColor: 'white',
  padding: 10,
  border: '5px solid #c4c4c4',
  borderRadius: 10,
  zIndex:10,
  top: "20%",
  left: "30%"
}

const gifStyle = {
  borderRadius: 10,
  height: '85%',
  width: '100%'
}
