import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const linkClass = (path) =>
    `block px-4 py-2 rounded ${
      location.pathname === path ? "bg-blue-600 text-white" : "hover:bg-gray-100"
    }`;

  return (
    <div className="flex flex-col h-screen w-64 bg-white shadow p-4">
      <div className="flex items-center justify-center mb-8">
        <img src="/logo.png" alt="HRIS Logo" className="h-16" />
      </div>
      <nav className="flex flex-col flex-grow space-y-2">

        <Link to="/dashboard"className={`block px-4 py-2 rounded transition-all duration-300 ${location.pathname === "/dashboard"? "bg-blue-600 text-white": "hover:bg-gray-100 hover:scale-[1.02]"}`}>Dashboard</Link>
        <Link to="/attendance" className={linkClass("/attendance")}>Attendance</Link>
        <Link to="/payroll" className={linkClass("/payroll")}>Payroll</Link>
        <Link to="/leave" className={linkClass("/leave")}>Leave</Link>
        <Link to="/memo" className={linkClass("/memo")}>Memo</Link>
        <Link to="/employees" className={linkClass("/employees")}>Employee List</Link>
        <Link to="/profile-settings" className={linkClass("/profile-settings")}>Profile Settings</Link>
      </nav>
      <button
        onClick={() => {
          localStorage.removeItem("user");
          window.location.href = "/";
        }}
        className="mt-auto bg-red-500 text-white py-2 rounded hover:bg-red-600 transition"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;
