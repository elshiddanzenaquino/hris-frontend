import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isTokenExpired } from "@/utils/checkTokenExpiry";
import Sidebar from "@/components/ui/Sidebar";

const Layout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || isTokenExpired(token)) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/");
        }
    }, [navigate]);

    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
};

export default Layout;
