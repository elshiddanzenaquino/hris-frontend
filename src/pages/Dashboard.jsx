import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "@/components/ui/Sidebar";
import CalendarWidget from "@/components/CalendarWidget";
import { CalendarDays } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/api/employees", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setEmployees(Array.isArray(res.data) ? res.data : [res.data]);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col">
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between p-6 bg-white shadow-md"
        >
          <h1 className="font-semibold text-lg">HR/Admin Dashboard</h1>
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
            className="flex flex-col md:flex-row md:justify-between md:items-center"
          >
            <div>
              <h2 className="text-2xl font-bold">Dona Jane Acilar</h2>
              <p className="text-gray-500">HR</p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/attendance")}
                className="px-6 py-2 bg-blue-600 text-white rounded-full shadow transition"
              >
                Attendance
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/payroll")}
                className="px-6 py-2 bg-blue-700 text-white rounded-full shadow transition"
              >
                Payroll
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => navigate("/leave")}
                className="px-6 py-2 bg-gray-700 text-white rounded-full shadow transition"
              >
                Leave
              </motion.button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="col-span-2 flex flex-col gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow p-6 space-y-6"
              >
                <h3 className="text-md font-bold">Employee List</h3>
                {employees.map((emp) => (
                  <div
                    key={emp.id}
                    className="flex justify-between py-2 border-b hover:bg-gray-50 transition duration-300"
                  >
                    <p>{emp.name}</p>
                    <p className="text-sm text-gray-500">{emp.role}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="flex flex-col gap-6"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <h2 className="font-semibold mb-2">Calendar</h2>
                <CalendarWidget />
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-lg shadow p-6 space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-md font-bold">Employee’s Activity</h3>
                  <CalendarDays className="w-5 h-5 text-gray-500" />
                </div>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>Logged In - 8:00 AM (Sample)</li>
                  <li>Break - 12:00 PM (Sample)</li>
                  <li>Logged Out - 5:00 PM (Sample)</li>
                </ul>
                <button className="mt-2 text-blue-600 text-sm hover:underline hover:opacity-80 transition">
                  View All →
                </button>
              </motion.div>
            </motion.div>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default Dashboard;
