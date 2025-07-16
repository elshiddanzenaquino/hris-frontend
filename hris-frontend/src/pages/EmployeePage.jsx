import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";

const EmployeePage = () => {
    const [form, setForm] = useState({
        name: "",
        department: "",
        email: "",
        password: "",
        role: "employee",
    });

    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const res = await axiosInstance.get("/employees");
            setEmployees(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post("/employees", form);
            setForm({
                name: "",
                department: "",
                email: "",
                password: "",
                role: "employee",
            });
            fetchEmployees();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Employee List</h2>

            <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
                <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    required
                />
                <input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={form.department}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    required
                />
                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                >
                    <option value="employee">Employee</option>
                    <option value="hr">HR</option>
                    <option value="admin">Admin</option>
                </select>
                <button type="submit" className="bg-blue-600 text-white px-4 rounded">
                    Add
                </button>
            </form>

            <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2 border">Name</th>
                        <th className="p-2 border">Department</th>
                        <th className="p-2 border">Email</th>
                        <th className="p-2 border">Role</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((emp) => (
                        <tr key={emp.id} className="text-center">
                            <td className="border p-2">{emp.name}</td>
                            <td className="border p-2">{emp.department}</td>
                            <td className="border p-2">{emp.email}</td>
                            <td className="border p-2">{emp.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default EmployeePage;
