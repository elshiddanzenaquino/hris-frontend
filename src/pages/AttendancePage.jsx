import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Sidebar from "@/components/ui/Sidebar";
import { motion } from "framer-motion";

const AttendancePage = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const res = await axiosInstance.get("/attendance");
      setRecords(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const calculateTotalHours = (timeIn, timeOut) => {
    if (!timeIn || !timeOut) return 0;
    const start = new Date(timeIn);
    const end = new Date(timeOut);
    const diff = (end - start) / (1000 * 60 * 60);
    return diff > 0 ? parseFloat(diff.toFixed(2)) : 0;
  };

  const totalHours = records.reduce((acc, rec) => {
    return acc + calculateTotalHours(rec.timeIn, rec.timeOut);
  }, 0);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 overflow-auto">
      <Sidebar />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="ml-56 flex-1 p-10 space-y-8"
      >
        <h1 className="text-2xl font-bold">Attendance Records</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">All Employees Attendance</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Employee Email</th>
                  <th className="py-2">Attendance Date</th>
                  <th className="py-2">In DateTime</th>
                  <th className="py-2">Out DateTime</th>
                  <th className="py-2">Status</th>
                  <th className="py-2">Total Hours</th>
                </tr>
              </thead>
              <tbody>
                {records.map((rec) => (
                  <tr key={rec.id} className="border-b">
                    <td className="py-2">{rec.email}</td>
                    <td className="py-2">{rec.date?.split("T")[0]}</td>
                    <td className="py-2">{rec.timeIn?.split("T").join(" ").slice(0, 16)}</td>
                    <td className="py-2">{rec.timeOut?.split("T").join(" ").slice(0, 16)}</td>
                    <td className="py-2">{rec.status}</td>
                    <td className="py-2">{calculateTotalHours(rec.timeIn, rec.timeOut).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-4 text-sm">
            <span className="font-medium">Total Hours This Month:</span>{" "}
            <span className="font-bold">{totalHours.toFixed(2)} Hours</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AttendancePage;
