import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AnimatedButton from "@/components/AnimatedButton";
import Sidebar from "@/components/ui/Sidebar";


const AttendancePage = () => {
    const [attendance, setAttendance] = useState([]);
    const [date, setDate] = useState("");
    const [status, setStatus] = useState("");
    const [editingId, setEditingId] = useState(null);

    const fetchAttendance = () => {
        axios.get("http://localhost:3000/api/attendance")
            .then((res) => setAttendance(res.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchAttendance();
    }, []);

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:3000/api/attendance/${editingId}`, { date, status });
            } else {
                await axios.post("http://localhost:3000/api/attendance", { date, status });
            }
            setDate("");
            setStatus("");
            setEditingId(null);
            fetchAttendance();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (att) => {
        setEditingId(att.id);
        setDate(att.date.split("T")[0]);
        setStatus(att.status);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/attendance/${id}`);
            fetchAttendance();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-8">
            <h1 className="text-2xl font-bold mb-4">Attendance Records</h1>

            <form onSubmit={handleAddOrUpdate} className="flex space-x-4 mb-6">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 rounded w-1/3" required />
                <input type="text" placeholder="Status" value={status} onChange={(e) => setStatus(e.target.value)} className="border p-2 rounded w-1/3" required />
                <AnimatedButton className="bg-blue-500 text-white">
                    {editingId ? "Update" : "Add"}
                </AnimatedButton>
            </form>

            <div className="overflow-x-auto rounded-lg shadow bg-white">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 text-xs uppercase">
                        <tr>
                            <th className="p-4">Date</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {attendance.map((att) => (
                            <motion.tr key={att.id} whileHover={{ scale: 1.01 }} className="border-b hover:bg-gray-50">
                                <td className="p-4">{att.date.split("T")[0]}</td>
                                <td className="p-4">{att.status}</td>
                                <td className="p-4 flex space-x-2">
                                    <AnimatedButton className="bg-yellow-500 text-white px-3 py-1 text-xs" onClick={() => handleEdit(att)}>Edit</AnimatedButton>
                                    <AnimatedButton className="bg-red-500 text-white px-3 py-1 text-xs" onClick={() => handleDelete(att.id)}>Delete</AnimatedButton>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default AttendancePage;
