import { NavLink, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import logo from "@/assets/logo.png";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside className="w-56 h-screen bg-[#0f3e5d] text-white fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b border-blue-900 flex items-center justify-center">
        <img src="/logo.png" alt="Logo" className="h-12 object-contain" />
      </div>
      <nav className="flex-1 p-6 space-y-4">
        <ul className="space-y-2 text-sm">
          <li>
            <NavLink
              to="/dashboard"
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
              to="/attendance"
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive ? "bg-[#166496]" : "hover:bg-[#145079] transition"
                }`
              }
            >
              Attendance
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/payroll"
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive ? "bg-[#166496]" : "hover:bg-[#145079] transition"
                }`
              }
            >
              Payroll
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leave"
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive ? "bg-[#166496]" : "hover:bg-[#145079] transition"
                }`
              }
            >
              Leave
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/memo"
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive ? "bg-[#166496]" : "hover:bg-[#145079] transition"
                }`
              }
            >
              Memo
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/employees"
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive ? "bg-[#166496]" : "hover:bg-[#145079] transition"
                }`
              }
            >
              Employee List
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/profile-settings"
              className={({ isActive }) =>
                `block p-2 rounded ${
                  isActive ? "bg-[#166496]" : "hover:bg-[#145079] transition"
                }`
              }
            >
              Profile Settings
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

export default Sidebar;
