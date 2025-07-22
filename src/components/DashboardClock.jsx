import { useState, useEffect } from "react";
import axiosInstance from "@/utils/axiosInstance";
import { Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const DashboardClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isTimedIn, setIsTimedIn] = useState(false);
  const [isTimedOut, setIsTimedOut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleTimeToggle = async () => {
    const token = localStorage.getItem("token");

    if (!isTimedIn) {
      try {
        await axiosInstance.post(
          "/attendance/time-in",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsTimedIn(true);
        toast.success("Time-in successfully recorded.");
      } catch (error) {
        if (error.response?.status === 400) {
          toast.warning(error.response.data.message);
        }
      }
    } else if (!isTimedOut) {
      try {
        await axiosInstance.post(
          "/attendance/time-out",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsTimedOut(true);
        toast.success("Time-out successfully recorded.");
        navigate("/attendance");
      } catch (error) {
        if (error.response?.status === 400) {
          toast.warning(error.response.data.message);
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center space-y-4"
    >
      <p className="text-sm text-gray-500">
        {currentTime.toLocaleDateString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </p>

      <div className="flex items-center justify-center space-x-4 text-4xl font-bold text-green-600">
        <Clock className="w-8 h-8 text-green-600" />
        <span>
          {currentTime.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
      </div>

      <p className="text-xs text-gray-500">Logged In</p>
      <p className="text-xs text-gray-500">
        {currentTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })}{" "}
        Today
      </p>

      <button
        onClick={handleTimeToggle}
        disabled={isTimedOut}
        className={`px-4 py-2 rounded-full transition ${
          isTimedOut
            ? "bg-gray-300 cursor-not-allowed"
            : isTimedIn
            ? "bg-red-500 text-white hover:bg-red-600"
            : "bg-green-500 text-white hover:bg-green-600"
        }`}
      >
        {isTimedOut ? "Timed Out" : isTimedIn ? "Time-out" : "Time-in"}
      </button>
    </motion.div>
  );
};

export default DashboardClock;
