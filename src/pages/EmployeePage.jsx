import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import Sidebar from "@/components/ui/Sidebar";
import { motion } from "framer-motion";

const EmployeePage = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", department: "", role: "Employee" });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axiosInstance
      .get("/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  };

  const handleCreate = (e) => {
    e.preventDefault();
    axiosInstance
      .post("/auth/register", { ...form, password: "123456" })
      .then(() => {
        fetchEmployees();
        setForm({ name: "", email: "", department: "", role: "Employee" });
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <Sidebar />
      <div className="ml-56 flex-1 flex flex-col p-8 space-y-6 transition-all duration-300">
        <h1 className="text-2xl font-bold">Employee List</h1>

        <form onSubmit={handleCreate} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Department"
            className="border p-2 rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            required
          />
          <select
            className="border p-2 rounded w-full focus:outline-none focus:ring focus:border-blue-300"
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            required
          >
            <option value="Employee">Employee</option>
            <option value="HR">HR / Admin</option>
          </select>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all"
          >
            Add Employee
          </button>
        </form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow p-6 space-y-4"
        >
          {employees.map((emp) => (
            <motion.div
              whileHover={{ scale: 1.02 }}
              key={emp.id}
              className="p-4 border-b hover:bg-gray-50 transition-all rounded-md"
            >
              <p><strong>Name:</strong> {emp.name}</p>  
              <p><strong>Email:</strong> {emp.email}</p>
              <p><strong>Department:</strong> {emp.department}</p>
              <p><strong>Role:</strong> {emp.role}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default EmployeePage;
