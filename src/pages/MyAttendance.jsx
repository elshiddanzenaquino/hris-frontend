import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import SidebarEmployee from "@/components/ui/SidebarEmployee";
import { motion } from "framer-motion";

const MyAttendance = () => {
  const [startDate, setStartDate] = useState("");
  const [startHour, setStartHour] = useState("");
  const [startMinute, setStartMinute] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endHour, setEndHour] = useState("");
  const [endMinute, setEndMinute] = useState("");
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

  const handleFormSubmit = async () => {
    const startDateTime = `${startDate}T${startHour.padStart(2, "0")}:${startMinute.padStart(2, "0")}:00`;
    const endDateTime = `${endDate}T${endHour.padStart(2, "0")}:${endMinute.padStart(2, "0")}:00`;

    try {
      await axiosInstance.post("/attendance", {
        status: "Present",
        date: startDate,
        timeIn: startDateTime,
        timeOut: endDateTime,
      });
      fetchAttendance();
      alert("Attendance saved.");
      setStartDate("");
      setStartHour("");
      setStartMinute("");
      setEndDate("");
      setEndHour("");
      setEndMinute("");
    } catch (error) {
      console.error(error);
      alert("Failed to save attendance.");
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
      <SidebarEmployee />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="ml-56 flex-1 p-10 space-y-6"
      >
        <h1 className="text-2xl font-bold">My Attendance</h1>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold">Manual Attendance Entry</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="block font-medium">Start Date</label>
              <input
                type="date"
                className="border rounded px-4 py-2 w-40"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
              <div className="flex gap-4">
                <select
                  className="border rounded px-4 py-2 w-32"
                  value={startHour}
                  onChange={(e) => setStartHour(e.target.value)}
                >
                  <option value="">Hour</option>
                  {[...Array(24).keys()].map((hour) => (
                    <option key={hour} value={hour}>
                      {hour.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>

                <select
                  className="border rounded px-4 py-2 w-32"
                  value={startMinute}
                  onChange={(e) => setStartMinute(e.target.value)}
                >
                  <option value="">Minute</option>
                  {[...Array(60).keys()].map((min) => (
                    <option key={min} value={min}>
                      {min.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <label className="block font-medium">End Date</label>
              <input
                type="date"
                className="border rounded px-4 py-2 w-40"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
              <div className="flex gap-4">
                <select
                  className="border rounded px-4 py-2 w-32"
                  value={endHour}
                  onChange={(e) => setEndHour(e.target.value)}
                >
                  <option value="">Hour</option>
                  {[...Array(24).keys()].map((hour) => (
                    <option key={hour} value={hour}>
                      {hour.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>

                <select
                  className="border rounded px-4 py-2 w-32"
                  value={endMinute}
                  onChange={(e) => setEndMinute(e.target.value)}
                >
                  <option value="">Minute</option>
                  {[...Array(60).keys()].map((min) => (
                    <option key={min} value={min}>
                      {min.toString().padStart(2, "0")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={handleFormSubmit}
            className="mt-6 px-6 py-2 rounded-lg bg-[#166496] text-white font-medium hover:bg-[#145079] transition"
          >
            Submit Attendance Record
          </button>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Attendance Records (from Database)</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
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

export default MyAttendance;
