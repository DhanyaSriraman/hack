import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Outlet /> {/* This will render the nested route's component */}
      </div>
    </div>
  );
};

export default MainLayout;
