import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import logo from "/logo.png";
import { motion } from "framer-motion";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post("/auth/login", { email, password });
      const { token, role, user } = res.data;
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("user", JSON.stringify(user));

      if (role.toLowerCase() === "hr") {
        navigate("/dashboard");
      } else if (role.toLowerCase() === "employee") {
        navigate("/employee-dashboard");
      }
    } catch {
      setError("Invalid credentials.");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen w-full">
      {/* LEFT SIDE */}
      <motion.div
        className="md:w-1/2 flex items-center justify-center bg-white p-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src={logo} alt="Logo" className="w-52 md:w-72" />
      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div
        className="md:w-1/2 flex items-center justify-center bg-[#0f3e5d] p-4"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-xl shadow-lg p-8 w-full max-w-sm space-y-4"
        >
          <h2 className="text-center text-xl font-bold text-[#0f3e5d]">HRIS Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            className="w-full py-2 bg-[#0f3e5d] text-white rounded hover:bg-[#166496] transition duration-200"
          >
            Login
          </button>
          <p className="text-sm text-center">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Register here
            </Link>
          </p>
          {error && <p className="text-center text-red-500">{error}</p>}
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
