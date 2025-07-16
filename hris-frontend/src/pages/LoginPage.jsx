import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ThemeToggle";
import logo from "/logo.png";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                throw new Error("Invalid email or password");
            }

            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            const role = data.user.role.toLowerCase();

            if (role === "admin" || role === "hr") {
                navigate("/dashboard");
            } else if (role === "employee") {
                navigate("/employee-dashboard");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="flex flex-col justify-center items-center w-1/2 bg-white">
                <img src={logo} alt="Logo" className="w-32 h-32" />
            </div>
            <div className="flex flex-col justify-center items-center w-1/2 bg-[#0f3e5d] text-white">
                <h1 className="text-2xl font-bold mb-4">Employee’s Portal</h1>
                {error && <p className="text-red-400 mb-2">{error}</p>}
                <form onSubmit={handleLogin} className="w-72 space-y-4">
                    <Input
                        type="email"
                        placeholder="username or email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        type="submit"
                        className="w-full font-semibold transition-all duration-200 bg-white text-[#166496] hover:bg-gray-100 dark:bg-[#1f2937] dark:text-white dark:hover:bg-[#374151]"
                    >
                        LOGIN
                    </Button>
                </form>
                <div className="mt-4 flex justify-between w-72 text-sm">
                    <a href="#" className="hover:underline">Forgot Password?</a>
                    <a href="#" className="hover:underline">Register</a>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
