import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import Main from "./components/Main";

function App() {

  // const onDragOver = (e:any) => {
  //   let event = e as Event;
  //   event.stopPropagation();
  //   event.preventDefault();
  //   console.log("hovering")
  //   }

  // const handleDrop = (e:any) => {
  //   let event = e as Event;
  //   event.preventDefault()
  //   event.stopPropagation()
  //   console.log("Dropped")
  // }
  
  return (
    <div className="App">
      {/* TODO: enable onDrop */}
      {/* <div style={{
                height: 50,
                width: 50,
                backgroundColor: "blue"
            }} 
           draggable="true" 
           onDragEnd={() => console.log('drag end')}
           onDragStart={() => console.log('drag start')}>Hello</div>

      <div style={{
                height: 50,
                width: 50,
                backgroundColor: "red"
            }} 
            onDragOver={(e) => onDragOver(e)}
            onDrop={(e) => handleDrop(e)}>
              Drop
        </div> */}
      <DndProvider backend={HTML5Backend}>
        <Main />
      </DndProvider>
    </div>
  );
}

export default App;
