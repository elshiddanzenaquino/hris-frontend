import { useNavigate } from "react-router-dom";
import SidebarEmployee from "@/components/ui/SidebarEmployee";

const EmployeeDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="flex h-screen bg-gray-50 text-gray-800">
            <div className="flex-1 p-8">
                <h1 className="text-2xl font-bold mb-6">Welcome, Employee!</h1>
                <div className="space-y-4">
                    <button onClick={() => navigate("/my-attendance")} className="w-full p-4 bg-blue-600 text-white rounded-lg">My Attendance</button>
                    <button onClick={() => navigate("/my-leave")} className="w-full p-4 bg-green-600 text-white rounded-lg">My Leave</button>
                    <button onClick={() => navigate("/my-payroll")} className="w-full p-4 bg-purple-600 text-white rounded-lg">My Payroll</button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDashboard;
