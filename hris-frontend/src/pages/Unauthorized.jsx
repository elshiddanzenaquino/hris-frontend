import { Link } from "react-router-dom";
import Sidebar from "@/components/ui/Sidebar";

const Unauthorized = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center text-center space-y-4">
      <h1 className="text-3xl font-bold">Unauthorized</h1>
      <p className="text-gray-500">You do not have permission to access this page.</p>
      <Link to="/" className="text-blue-600 hover:underline">Go to Login</Link>
    </div>
  );
};

export default Unauthorized;
