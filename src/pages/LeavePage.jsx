import { useState } from "react";
import Sidebar from "@/components/ui/Sidebar";
import { motion } from "framer-motion";

const LeavePage = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState("");

  const leaveData = Array(10).fill({
    date: "11/07/2023 - 11/09/2023",
    type: "Sick Leave",
    status: "Approved",
  });

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar />
      <div className="ml-56 flex-1 p-10 space-y-6">
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-2xl font-bold mb-4"
        >
          Leave Page
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-between items-center mb-4"
        >
          <div className="flex items-center gap-4">
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <span className="font-semibold">to</span>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border p-2 rounded"
              required
            />
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border p-2 rounded w-1/3"
              required
            >
              <option value="" disabled>
                Select Leave Type
              </option>
              <option value="Sick Leave">Sick Leave</option>
              <option value="Vacation Leave">Vacation Leave</option>
              <option value="Emergency Leave">Emergency Leave</option>
              <option value="Maternity Leave">Maternity Leave</option>
              <option value="Paternity Leave">Paternity Leave</option>
            </select>
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded">
            Submit Request
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <table className="w-full text-sm">
            <thead className="border-b text-gray-600">
              <tr>
                <th className="py-2 text-left">Date</th>
                <th className="py-2 text-left">Type</th>
                <th className="py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {leaveData.map((row, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-2">{row.date}</td>
                  <td className="py-2">{row.type}</td>
                  <td className="py-2">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex justify-between items-center mt-4"
        >
          <p className="text-gray-600 text-sm">
            Total Leaves This Period: <span className="font-bold">3 Days</span>
          </p>
          <div className="flex items-center gap-2">
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">
              &lt;
            </button>
            <span className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 bg-blue-50">
              1
            </span>
            <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-300 hover:bg-gray-100">
              &gt;
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LeavePage;
