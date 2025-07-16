import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AttendancePage from "./pages/AttendancePage";
import PayrollPage from "./pages/PayrollPage";
import LeavePage from "./pages/LeavePage";
import MemoPage from "./pages/MemoPage";
import ProfileSettingsPage from "./pages/ProfileSettingsPage";
import EmployeePage from "./pages/EmployeePage";
import AddEmployee from "./pages/AddEmployeePage";

import EmployeeDashboard from "./pages/EmployeeDashboard";
import MyAttendance from "./pages/MyAttendance";
import MyPayroll from "./pages/MyPayroll";
import MyLeave from "./pages/MyLeave";

import Layout from "@/components/ui/Layout";
import LayoutEmployee from "@/components/ui/LayoutEmployee";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";



function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* HR ROUTES (ADMIN) with Sidebar */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "hr"]} />}>
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/attendance" element={<AttendancePage />} />
          <Route path="/payroll" element={<PayrollPage />} />
          <Route path="/leave" element={<LeavePage />} />
          <Route path="/employees" element={<EmployeePage />} />
          <Route path="/memo" element={<MemoPage />} />
          <Route path="/profile-settings" element={<ProfileSettingsPage />} />
          <Route path="/add-employee" element={<AddEmployee />} />
        </Route>
      </Route>

      {/* EMPLOYEE ROUTES with SidebarEmployee */}
      <Route element={<ProtectedRoute allowedRoles={["employee"]} />}>
        <Route element={<LayoutEmployee />}>
          <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          <Route path="/my-attendance" element={<MyAttendance />} />
          <Route path="/my-payroll" element={<MyPayroll />} />
          <Route path="/my-leave" element={<MyLeave />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
