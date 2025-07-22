import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

const SidebarEmployee = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="w-56 h-screen bg-[#0f3e5d] text-white fixed left-0 top-0 flex flex-col">
      <div className="p-6 text-xl font-bold border-b border-blue-900">Employee</div>
      <nav className="flex-1 p-6 space-y-4">
        <ul className="space-y-2 text-sm">
          <li>
            <NavLink
              to="/employee-dashboard"
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive ? "bg-[#166496]" : "hover:bg-[#145079] transition"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/employee/my-attendance"
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive ? "bg-[#166496]" : "hover:bg-[#145079] transition"
                }`
              }
            >
              My Attendance
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/employee/my-payroll"
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive ? "bg-[#166496]" : "hover:bg-[#145079] transition"
                }`
              }
            >
              My Payroll
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/employee/my-leave"
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive ? "bg-[#166496]" : "hover:bg-[#145079] transition"
                }`
              }
            >
              My Leave
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className="p-6 border-t border-blue-900">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm hover:opacity-80 transition"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default SidebarEmployee;
