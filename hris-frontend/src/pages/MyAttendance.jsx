import { useEffect, useState } from "react";
import axios from "axios";
import SidebarEmployee from "@/components/ui/SidebarEmployee";



const MyAttendance = () => {
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/attendance")
            .then((res) => setAttendance(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">My Attendance</h1>
            <div className="bg-white rounded-lg shadow p-6">
                <ul className="space-y-2">
                    {attendance.map((att) => (
                        <li key={att.id} className="flex justify-between border-b pb-2">
                            <span>{att.date.split("T")[0]}</span>
                            <span>{att.status}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MyAttendance;
