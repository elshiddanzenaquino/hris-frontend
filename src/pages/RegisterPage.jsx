import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/register", {
    name,
    email,
    department,
    role,
    password,
    });
      navigate("/");
    } catch (error) {
      setError("Registration failed.");
    }
  };

  return (
    <div className="w-[400px] bg-white shadow-md rounded-lg p-8 space-y-4">
      <h2 className="text-xl font-bold text-center text-[#0f3e5d]">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="text" placeholder="Department" value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full p-2 border rounded" required />
        <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-2 border rounded" required>
          <option value="">Select Role</option>
          <option value="HR">HR</option>
          <option value="Employee">Employee</option>
        </select>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full p-2 bg-[#0f3e5d] text-white rounded hover:bg-[#166496] transition">Register</button>
      </form>
      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default RegisterPage;
