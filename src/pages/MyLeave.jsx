import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import SidebarEmployee from "@/components/ui/SidebarEmployee";
import { motion } from "framer-motion";

const MyLeave = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaves, setLeaves] = useState([]);

  const leaveOptions = [
    "Vacation Leave",
    "Sick Leave",
    "Maternity Leave",
    "Paternity Leave",
    "Bereavement Leave",
    "Emergency Leave",
    "Study Leave",
    "Personal Leave",
    "Special Leave",
    "Unpaid Leave",
  ];

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    try {
      const res = await axiosInstance.get("/leave");
      setLeaves(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async () => {
    if (!startDate || !endDate || !reason)
      return alert("All fields are required.");
    try {
      await axiosInstance.post("/leave", {
        startDate,
        endDate,
        reason,
        status: "Pending",
      });
      fetchLeaves();
      setStartDate("");
      setEndDate("");
      setReason("");
      alert("Leave request submitted.");
    } catch (error) {
      console.error(error);
      alert("Failed to submit leave request.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 overflow-auto">
      <SidebarEmployee />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="ml-56 flex-1 p-10 space-y-6"
      >
        <h1 className="text-2xl font-bold">My Leave Requests</h1>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow p-6 space-y-6"
        >
          <h2 className="text-xl font-semibold">Submit Leave Request</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col space-y-2">
              <label className="font-medium">Start Date</label>
              <input
                type="date"
                className="border rounded px-4 py-2"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium">End Date</label>
              <input
                type="date"
                className="border rounded px-4 py-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="font-medium">Reason</label>
              <select
                className="border rounded px-4 py-2"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
              >
                <option value="">Select Reason</option>
                {leaveOptions.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="mt-4 px-6 py-2 rounded-lg bg-[#166496] text-white font-medium hover:bg-[#145079] transition"
          >
            Submit Request
          </button>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white rounded-lg shadow p-6"
        >
          <h2 className="text-xl font-semibold mb-4">
            Leave Records (from Database)
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Start Date</th>
                  <th className="py-2">End Date</th>
                  <th className="py-2">Reason</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((leave) => (
                  <tr key={leave.id} className="border-b">
                    <td className="py-2">{leave.startDate?.split("T")[0]}</td>
                    <td className="py-2">{leave.endDate?.split("T")[0]}</td>
                    <td className="py-2">{leave.reason}</td>
                    <td
                      className={`py-2 font-medium ${
                        leave.status === "Approved"
                          ? "text-green-600"
                          : leave.status === "Rejected"
                          ? "text-red-500"
                          : "text-yellow-500"
                      }`}
                    >
                      {leave.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MyLeave;
