import { useEffect, useState } from "react";
import axios from "axios";
import SidebarEmployee from "@/components/ui/SidebarEmployee";



const MyPayroll = () => {
    const [payroll, setPayroll] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/payroll")
            .then((res) => setPayroll(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">My Payroll</h1>
            <div className="bg-white rounded-lg shadow p-6">
                <ul className="space-y-2">
                    {payroll.map((pay) => (
                        <li key={pay.id} className="flex justify-between border-b pb-2">
                            <span>{pay.month}</span>
                            <span>₱{pay.salary}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MyPayroll;
