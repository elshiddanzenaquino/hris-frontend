import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ["Active", "On Leave", "Resigned"],
  datasets: [
    {
      label: "Employee Status",
      data: [25, 5, 3],
      backgroundColor: ["#3b82f6", "#facc15", "#ef4444"],
      borderColor: ["#3b82f6", "#facc15", "#ef4444"],
      borderWidth: 1,
    },
  ],
};

const EmployeeStatsChart = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 transition hover:shadow-lg">
      <h3 className="text-md font-bold mb-4">Employee Status Overview</h3>
      <Pie data={data} />
      <p className="text-xs text-gray-400 mt-4">Updated as of July 2025</p>
    </div>
  );
};

export default EmployeeStatsChart;
