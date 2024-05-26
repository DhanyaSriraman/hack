import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const MainLayout = ({ setIsConvoStarted }) => {
  return (
    <div className="flex">
      <Sidebar setIsConvoStarted={setIsConvoStarted} />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;