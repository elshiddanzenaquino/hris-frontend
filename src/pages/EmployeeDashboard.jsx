import { useEffect, useState } from "react";
import axios from "@/utils/axiosInstance";
import SidebarEmployee from "@/components/ui/SidebarEmployee";
import CalendarWidget from "@/components/CalendarWidget";
import { CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

const EmployeeDashboard = () => {
  const [payrollData, setPayrollData] = useState([]);

  useEffect(() => {
    fetchPayroll();
  }, []);

  const fetchPayroll = async () => {
    try {
      const res = await axios.get("/payroll");
      setPayrollData(res.data);
    } catch (error) {
      console.error("Failed to fetch payroll:", error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <SidebarEmployee />
      <div className="ml-56 flex-1 flex flex-col">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between p-6 bg-white shadow-md"
        >
          <h1 className="font-semibold text-lg">Employee Account Dashboard</h1>
        </motion.header>

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col p-8 space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow p-6 space-y-4"
            >
              <h2 className="font-semibold mb-2">Calendar</h2>
              <CalendarWidget />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow p-6 space-y-4"
            >
              <h3 className="text-md font-bold">Your Payroll Summary</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                {payrollData.map((item) => (
                  <li key={item.id} className="flex justify-between">
                    <span>Payroll #{item.id}</span>
                    <span className="font-semibold">₱ {item.salary}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white rounded-lg shadow p-6 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-md font-bold">Activity Logs</h3>
                <CalendarDays className="w-5 h-5 text-gray-500" />
              </div>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>Logged In - 8:00 AM (Nov 6, 2023)</li>
                <li>Break - 12:00 PM (Nov 6, 2023)</li>
                <li>Logged Out - 5:00 PM (Nov 6, 2023)</li>
              </ul>
              <button className="mt-2 text-blue-600 text-sm hover:underline hover:opacity-80 transition">
                View All →
              </button>
            </motion.div>
          </motion.div>
        </motion.main>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
