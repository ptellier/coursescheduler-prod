import React from 'react'

const DaysRow = () => {
    return (
        <div className="row mr-3">
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
    )
}

export default DaysRow
