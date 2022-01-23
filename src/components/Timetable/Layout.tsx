import React from 'react'
import { createCells } from "../../helpers/time";

const Layout = () => {
    return (
        <div className="col-2 p-0">
        {createCells([]).map((c) => (
          <div className="border" style={{ height: `${c.height}rem` }}></div>
        ))}
      </div>
    )
}

export default Layout
