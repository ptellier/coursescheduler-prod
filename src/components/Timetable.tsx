import React from "react";
import Time from "./Time";
import { Section } from "../data/DataDefinition/SectionDD";

interface Props {
  los: Section[][];
}

// Temporal Test data
const data = [{ start_time: "9:00", end_time: "10:00", day: "Mon" }];

const Timetable = ({ los }: Props) => {
  return (
    <div className="row pr-3">
    <div className="col-2"></div>
    <div className="col-10">
        
        {/* Header */}
        <div className="row">
            <h4 style={{ width: `20%` }} className="col-2">Mon</h4>
            <h4 style={{ width: `20%` }} className="col-2">Tue</h4>
            <h4 style={{ width: `20%` }} className="col-2">Wed</h4>
            <h4 style={{ width: `20%` }} className="col-2">Thu</h4>
            <h4 style={{ width: `20%` }} className="col-2">Fri</h4>
            <h4 style={{ width: `20%` }} className="col-2">Sat</h4>
        </div>

        
        {/* Body */}
        <div>
            <div id="900" className="border-top row" style={{position:'relative', height:30}} >
                <span className="text-muted" style={{position: 'absolute', right:'102%', top:"-35%"}}>9:00AM</span>
                <div className="col-2 border bg-primary" >CPSC121</div>
                <div className="col-2 border" ></div>
                <div className="col-2 border" ></div>
                <div className="col-2 border" ></div>
                <div className="col-2 border" ></div>
                <div className="col-2 border" ></div>
            </div>
            <div id="930" className="border-top row" style={{position:'relative', height:30}} >
                <span className="text-muted" style={{position: 'absolute', right:'102%', top:"-35%"}}>9:30AM</span>
                <div className="col-2 border bg-primary" ></div>
                <div className="col-2 border" ></div>
                <div className="col-2 border" ></div>
                <div className="col-2 border" ></div>
                <div className="col-2 border" ></div>
                <div className="col-2 border" ></div>
            </div>
            <div id="1000" className="border-top row" style={{position:'relative', height:30}} >
                <span className="text-muted" style={{position: 'absolute', right:'102%', top:"-35%"}}>10:00AM</span>
                <div className="col-2 border" ></div>
                <div className="col-2 border" ></div>
                <div className="col-2 border" ></div>
                <div className="col-2 border" ></div>
                <div className="col-2 border" ></div>
                <div className="col-2 border" ></div>
            </div>
        </div>
        
    </div>
  </div>
  );
};

export default Timetable;

{/* <div className="row pr-3">
        <div className="col-2"></div>
        <table className="table table-bordered col-10">
            <thead>
            <tr>
                <th style={{ width: `20%` }} scope="col">Mon</th>
                <th style={{ width: `20%` }} scope="col">Tue</th>
                <th style={{ width: `20%` }} scope="col">Wed</th>
                <th style={{ width: `20%` }} scope="col">Thu</th>
                <th style={{ width: `20%` }} scope="col">Fri</th>
            </tr>
            </thead>
            <tbody>
            <tr id="900" className="border-top" style={{position:'relative', height:50}} >
                <span className="text-sm" style={{position: 'absolute', right:'102%', top:"-26%"}}>9:00AM</span>
                <td className="" scope="row"></td>
                <td className="" scope="row"></td>
                <td className="" scope="row"></td>
                <td className="" scope="row"></td>
                <td className="" scope="row"></td>
            </tr>
            <tr id="930" className="border-top" style={{position:'relative', height:50}} >
                <span className="text-sm" style={{position: 'absolute', right:'102%', top:"-26%"}}>9:30AM</span>
                <td scope="row"></td>
            </tr>
            <tr id="1000" className="border-top" style={{position:'relative', height:50}} >
                <span className="text-sm" style={{position: 'absolute', right:'102%', top:"-26%"}}>10:00AM</span>
                <td scope="row"></td>
            </tr>
            <tr id="1030" className="border-top" style={{position:'relative', height:50}} >
                <span className="text-sm" style={{position: 'absolute', right:'102%', top:"-26%"}}>10:30AM</span>
                <td scope="row"></td>
            </tr>
            
            </tbody>
        </table>
      </div> */}