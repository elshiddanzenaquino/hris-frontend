import { useEffect, useState } from "react";
import axiosInstance from "@/utils/axiosInstance";
import SidebarEmployee from "@/components/ui/SidebarEmployee";
import { motion } from "framer-motion";

const MyPayroll = () => {
  const [payroll, setPayroll] = useState([]);

  useEffect(() => {
    fetchPayroll();
  }, []);

  const fetchPayroll = async () => {
    try {
      const res = await axiosInstance.get("/payroll");
      setPayroll(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const formatCurrency = (amount) => {
  if (typeof amount !== "number") return "₱0.00";
  return `₱${amount.toFixed(2)}`;
};

  return (
    <div className="flex h-screen bg-gray-50 text-gray-800 overflow-auto">
      <SidebarEmployee />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="ml-56 flex-1 p-10 space-y-6"
      >
        <h1 className="text-2xl font-bold">My Payroll</h1>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Payroll Records</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-left border-b">
                  <th className="py-2">Payroll Period</th>
                  <th className="py-2">Basic Salary</th>
                  <th className="py-2">Deductions</th>
                  <th className="py-2">Net Pay</th>
                  <th className="py-2">Release Date</th>
                </tr>
              </thead>
              <tbody>
                {payroll.map((record) => (
                  <tr key={record.id} className="border-b">
                    <td className="py-2">{record.period}</td>
                    <td className="py-2">{formatCurrency(record.basicSalary)}</td>
                    <td className="py-2">{formatCurrency(record.deductions)}</td>
                    <td className="py-2">{formatCurrency(record.netPay)}</td>
                    <td className="py-2">{record.releaseDate?.split("T")[0]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MyPayroll;
