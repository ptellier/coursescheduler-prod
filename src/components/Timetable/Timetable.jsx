import React from "react";

//How to sort components in react
//https://stackoverflow.com/questions/48764203/how-to-sort-list-of-react-components-based-on-different-properties

const Timetable_test = () => {
  //TODO build logic here

  return (
    <div className="row">
      {/* time */}
      <div className="col-1">
        <div className="time" style={{ height: "1.5rem" }}>
          {" "}
        </div>
        <div className="time" style={{ height: "1.5rem" }}>
          8:00
        </div>
        <div className="time" style={{ height: "1.5rem" }}>
          8:30
        </div>
        <div className="time" style={{ height: "1.5rem" }}>
          9:00
        </div>
        <div className="time" style={{ height: "1.5rem" }}>
          9:30
        </div>
        <div className="time" style={{ height: "1.5rem" }}>
          10:00
        </div>
        <div className="time" style={{ height: "1.5rem" }}>
          10:30
        </div>
        <div className="time" style={{ height: "1.5rem" }}>
          11:00
        </div>
        <div className="time" style={{ height: "1.5rem" }}>
          11:30
        </div>
        <div className="time" style={{ height: "1.5rem" }}>
          12:00
        </div>
        <div className="time" style={{ height: "1.5rem" }}>
          12:30
        </div>
      </div>
      {/* days */}
      <div className="col-11">
        <div className="row">
          <div className="col-2">
            <div style={{ height: "1.5rem" }}>Mon</div>
          </div>
          <div className="col-2">
            <div style={{ height: "1.5rem" }}>Tue</div>
          </div>
          <div className="col-2">
            <div style={{ height: "1.5rem" }}>Wed</div>
          </div>
          <div className="col-2">
            <div style={{ height: "1.5rem" }}>Thu</div>
          </div>
          <div className="col-2">
            <div style={{ height: "1.5rem" }}>Fri</div>
          </div>
          <div className="col-2">
            <div style={{ height: "1.5rem" }}>Sat</div>
          </div>
        </div>

        {/* Day Columns */}
        <div className="row">
          <div className="col-2 p-0">
            <div className="bg-warning" style={{ height: "3rem" }}>
              CPSC121
            </div>
            <div className="border" style={{ height: "1.5rem" }}></div>
            <div className="border" style={{ height: "1.5rem" }}></div>
            <div className="border" style={{ height: "1.5rem" }}></div>
            <div className="border" style={{ height: "1.5rem" }}></div>
            <div className="bg-warning" style={{ height: "4.5rem" }}>
              CPSC110
            </div>
            <div className="border" style={{ height: "1.5rem" }}></div>
          </div>
          <div className="col-2 p-0">
            <div className="border" style={{ height: "1.5rem" }}></div>
            <div className="border" style={{ height: "1.5rem" }}></div>
            <div className="border" style={{ height: "1.5rem" }}></div>
            <div className="border" style={{ height: "1.5rem" }}></div>
            <div className="border" style={{ height: "1.5rem" }}></div>
            <div className="border" style={{ height: "1.5rem" }}></div>
            <div className="border" style={{ height: "1.5rem" }}></div>
            <div className="border" style={{ height: "1.5rem" }}></div>
          </div>
          <div className="col-2">
          </div>
          <div className="col-2">
            
          </div>
          <div className="col-2">
            
          </div>
          <div className="col-2">
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timetable_test;
