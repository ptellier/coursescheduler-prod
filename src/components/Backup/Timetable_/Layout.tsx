import React from "react";
import { createCells } from "../../../helpers/time";

const Layout = () => {
  return (
    <div className="col-2 p-0">
      {createCells([]).map((c) => {
        return (
          <div
            key={Math.random().toString(36)}
            className="border"
            style={{ height: `${c.height}rem` }}
          />
        );
      })}
    </div>
  );
};

export default Layout;
