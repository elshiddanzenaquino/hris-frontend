import { useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import logo from "/logo.png";

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
    <div className="flex h-screen w-full">
      {/* LEFT SIDE */}
      <div className="w-1/2 bg-white flex items-center justify-center">
        <img src={logo} alt="Logo" className="w-72" />
      </div>

      {/* RIGHT SIDE */}
      <div className="w-1/2 flex items-center justify-center bg-[#0f3e5d]">
        <form
          onSubmit={handleLogin}
          className="bg-white rounded-lg shadow-lg p-8 w-[320px] space-y-4"
        >
          <h2 className="text-center text-lg font-bold text-[#0f3e5d]">HRIS Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button className="w-full p-2 bg-[#0f3e5d] text-white rounded hover:bg-[#166496] transition">
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
      </div>
    </div>
  );
};

export default LoginPage;
