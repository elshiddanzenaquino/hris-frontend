import React from "react";
import { Outlet } from "react-router-dom";
import SidebarEmployee from "./SidebarEmployee";

const LayoutEmployee = () => {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <SidebarEmployee />
      <main className="flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutEmployee;
