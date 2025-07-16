import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";
import { format } from "date-fns";

const DashboardClock = () => {
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000); // every second update

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-2">
            <p className="text-gray-500">{format(currentTime, "PPPP")}</p>
            <div className="flex items-center space-x-3">
                <Clock3 className="w-10 h-10 text-green-500" />
                <span className="text-5xl font-bold text-green-600">
                    {format(currentTime, "hh:mm a")}
                </span>
            </div>
            <p className="text-gray-500">Logged In</p>
            <p className="text-xs text-gray-400">
                {format(currentTime, "p")} Today
            </p>
            <button className="px-4 py-2 bg-red-600 text-white rounded-full transition hover:scale-105">
                Time-out
            </button>
        </div>
    );
};

export default DashboardClock;
