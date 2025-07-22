import React, { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


const AddEmployee = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        department: "",
        role: "employee",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post("/employees", form);
            setMessage("Employee created successfully!");
            setForm({
                name: "",
                email: "",
                password: "",
                department: "",
                role: "employee",
            });
        } catch (error) {
            console.error(error);
            setMessage("Failed to create employee.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
            {message && <p className="mb-4 text-green-500">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    required
                />
                <Input
                    type="text"
                    name="department"
                    placeholder="Department"
                    value={form.department}
                    onChange={handleChange}
                    required
                />
                <select
                    name="role"
                    value={form.role}
                    onChange={handleChange}
                    className="w-full border p-2 rounded"
                >
                    <option value="employee">Employee</option>
                    <option value="hr">HR</option>
                    <option value="admin">Admin</option>
                </select>
                <Button type="submit" className="w-full">
                    Add Employee
                </Button>
            </form>
        </div>
    );
};

export default AddEmployee;
