import { useEffect, useState } from "react";
import axios from "axios";
import SidebarEmployee from "@/components/ui/SidebarEmployee";



const MyLeave = () => {
    const [leave, setLeave] = useState([]);
    const [date, setDate] = useState("");
    const [type, setType] = useState("");

    const fetchLeave = () => {
        axios.get("http://localhost:3000/api/leave")
            .then((res) => setLeave(res.data))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        fetchLeave();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:3000/api/leave", { date, type });
        setDate("");
        setType("");
        fetchLeave();
    };

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-4">My Leave</h1>

            <form onSubmit={handleSubmit} className="flex space-x-4 mb-6">
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="border p-2 rounded w-1/3" required />
                <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} className="border p-2 rounded w-1/3" required />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Request Leave</button>
            </form>

            <div className="bg-white rounded-lg shadow p-6">
                <ul className="space-y-2">
                    {leave.map((lv) => (
                        <li key={lv.id} className="flex justify-between border-b pb-2">
                            <span>{lv.date.split("T")[0]}</span>
                            <span>{lv.type}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default MyLeave;
