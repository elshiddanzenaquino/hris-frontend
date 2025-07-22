import SidebarEmployee from "@/components/ui/SidebarEmployee";
import { Outlet } from "react-router-dom";

const LayoutEmployee = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      <SidebarEmployee />
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default LayoutEmployee;
