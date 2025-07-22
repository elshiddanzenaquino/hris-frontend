import { Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import Dashboard from "@/pages/Dashboard";
import AttendancePage from "@/pages/AttendancePage";
import PayrollPage from "@/pages/PayrollPage";
import ProfileSettingsPage from "@/pages/ProfileSettingsPage";
import LeavePage from "@/pages/LeavePage";
import MemoPage from "@/pages/MemoPage";
import EmployeePage from "@/pages/EmployeePage";
import ProtectedRoute from "@/components/ui/ProtectedRoute";
import EmployeeDashboard from "@/pages/EmployeeDashboard";
import MyAttendance from "@/pages/MyAttendance";
import MyPayroll from "@/pages/MyPayroll";
import MyLeave from "@/pages/MyLeave";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MainLayout from "@/components/ui/MainLayout";
import LayoutEmployee from "@/components/ui/LayoutEmployee";
import AuthLayout from "@/components/ui/AuthLayout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/attendance" element={<ProtectedRoute><AttendancePage /></ProtectedRoute>} />
          <Route path="/payroll" element={<ProtectedRoute><PayrollPage /></ProtectedRoute>} />
          <Route path="/leave" element={<ProtectedRoute><LeavePage /></ProtectedRoute>} />
          <Route path="/memo" element={<ProtectedRoute><MemoPage /></ProtectedRoute>} />
          <Route path="/employees" element={<ProtectedRoute><EmployeePage /></ProtectedRoute>} />
          <Route path="/profile-settings" element={<ProtectedRoute><ProfileSettingsPage /></ProtectedRoute>} />
        </Route>

        <Route element={<LayoutEmployee />}>
          <Route path="/employee-dashboard" element={<ProtectedRoute><EmployeeDashboard /></ProtectedRoute>} />
          <Route path="/employee/my-attendance" element={<ProtectedRoute><MyAttendance /></ProtectedRoute>} />
          <Route path="/employee/my-payroll" element={<ProtectedRoute><MyPayroll /></ProtectedRoute>} />
          <Route path="/employee/my-leave" element={<ProtectedRoute><MyLeave /></ProtectedRoute>} />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
