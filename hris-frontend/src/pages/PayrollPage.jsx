import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import AnimatedButton from "@/components/AnimatedButton";
import Sidebar from "@/components/ui/Sidebar";


const PayrollPage = () => {
    const [payroll, setPayroll] = useState([]);
    const [month, setMonth] = useState("");
    const [salary, setSalary] = useState("");
    const [editingId, setEditingId] = useState(null);

    const fetchPayroll = () => {
        axios.get("http://localhost:3000/api/payroll")
            .then((res) => setPayroll(res.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchPayroll();
    }, []);

    const handleAddOrUpdate = async (e) => {
        e.preventDefault();
        try {
            if (editingId) {
                await axios.put(`http://localhost:3000/api/payroll/${editingId}`, { month, salary });
            } else {
                await axios.post("http://localhost:3000/api/payroll", { month, salary });
            }
            setMonth("");
            setSalary("");
            setEditingId(null);
            fetchPayroll();
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = (pay) => {
        setEditingId(pay.id);
        setMonth(pay.month);
        setSalary(pay.salary);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/payroll/${id}`);
            fetchPayroll();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="p-8">
            <h1 className="text-2xl font-bold mb-4">Payroll Records</h1>

            <form onSubmit={handleAddOrUpdate} className="flex space-x-4 mb-6">
                <input type="text" placeholder="Month" value={month} onChange={(e) => setMonth(e.target.value)} className="border p-2 rounded w-1/3" required />
                <input type="number" placeholder="Salary" value={salary} onChange={(e) => setSalary(e.target.value)} className="border p-2 rounded w-1/3" required />
                <AnimatedButton className="bg-blue-500 text-white">
                    {editingId ? "Update" : "Add"}
                </AnimatedButton>
            </form>

            <div className="overflow-x-auto rounded-lg shadow bg-white">
                <table className="min-w-full text-sm text-gray-700">
                    <thead className="bg-gray-50 text-xs uppercase">
                        <tr>
                            <th className="p-4">Month</th>
                            <th className="p-4">Salary</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payroll.map((pay) => (
                            <motion.tr key={pay.id} whileHover={{ scale: 1.01 }} className="border-b hover:bg-gray-50">
                                <td className="p-4">{pay.month}</td>
                                <td className="p-4">₱{pay.salary}</td>
                                <td className="p-4 flex space-x-2">
                                    <AnimatedButton className="bg-yellow-500 text-white px-3 py-1 text-xs" onClick={() => handleEdit(pay)}>Edit</AnimatedButton>
                                    <AnimatedButton className="bg-red-500 text-white px-3 py-1 text-xs" onClick={() => handleDelete(pay.id)}>Delete</AnimatedButton>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </motion.div>
    );
};

export default PayrollPage;
