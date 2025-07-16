import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AnimatedButton from "@/components/AnimatedButton";
import Sidebar from "@/components/ui/Sidebar";


const LeavePage = () => {
    const [leave, setLeave] = useState([]);
    const [date, setDate] = useState("");
    const [type, setType] = useState("");
    const [editingId, setEditingId] = useState(null);

    const fetchLeave = () => {
        axios.get("http://localhost:3000/api/leave")
            .then((res) => setLeave(res.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchLeave();
    }, []);

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:3000/api/leave/${editingId}`, { date, type });
            } else {
                await axios.post("http://localhost:3000/api/leave", { date, type });
            }
            setDate("");
            setType("");
            setEditingId(null);
            fetchLeave();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (lv) => {
        setEditingId(lv.id);
        setDate(lv.date.split("T")[0]);
        setType(lv.type);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/leave/${id}`);
            fetchLeave();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-8">
            <h1 className="text-2xl font-bold mb-4">Leave Records</h1>

            <form onSubmit={handleAddOrUpdate} className="flex space-x-4 mb-6">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 rounded w-1/3" required />
                <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded w-1/3" required />
                <AnimatedButton className="bg-blue-500 text-white">
                    {editingId ? "Update" : "Add"}
                </AnimatedButton>
            </form>

            <div className="overflow-x-auto rounded-lg shadow bg-white">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 text-xs uppercase">
                        <tr>
                            <th className="p-4">Date</th>
                            <th className="p-4">Type</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leave.map((lv) => (
                            <motion.tr key={lv.id} whileHover={{ scale: 1.01 }} className="border-b hover:bg-gray-50">
                                <td className="p-4">{lv.date.split("T")[0]}</td>
                                <td className="p-4">{lv.type}</td>
                                <td className="p-4 flex space-x-2">
                                    <AnimatedButton className="bg-yellow-500 text-white px-3 py-1 text-xs" onClick={() => handleEdit(lv)}>Edit</AnimatedButton>
                                    <AnimatedButton className="bg-red-500 text-white px-3 py-1 text-xs" onClick={() => handleDelete(lv.id)}>Delete</AnimatedButton>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default LeavePage;
