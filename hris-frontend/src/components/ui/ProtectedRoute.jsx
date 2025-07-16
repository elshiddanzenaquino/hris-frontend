import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRoles }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) return <Navigate to="/" />;
    if (!allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;

    return <Outlet />;
};

export default ProtectedRoute;
