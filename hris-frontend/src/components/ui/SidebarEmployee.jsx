import { Link, useLocation } from "react-router-dom";

const SidebarEmployee = () => {
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
        <Link to="/employee-dashboard" className={linkClass("/employee-dashboard")}>Dashboard</Link>
        <Link to="/my-attendance" className={linkClass("/my-attendance")}>My Attendance</Link>
        <Link to="/my-payroll" className={linkClass("/my-payroll")}>My Payroll</Link>
        <Link to="/my-leave" className={linkClass("/my-leave")}>My Leave</Link>
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

export default SidebarEmployee;
