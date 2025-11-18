import React from "react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      <h1>Layout Goes here</h1>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
