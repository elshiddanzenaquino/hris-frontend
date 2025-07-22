import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

const CalendarWidget = () => {
  return (
    <div className="bg-white rounded-lg shadow p-4 transition hover:shadow-lg">
      <h3 className="text-md font-bold mb-4">Calendar</h3>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        height="auto"
        events={[
          { title: "Logged In", date: "2023-07-10", color: "#22c55e" },
          { title: "Leave", date: "2023-07-14", color: "#facc15" },
          { title: "Payroll Release", date: "2023-07-20", color: "#3b82f6" },
          { title: "Holiday", date: "2023-07-25", color: "#ef4444" },
        ]}
      />

      {/* 👉 Legend under the calendar */}
      <div className="flex gap-4 mt-4 text-sm">
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500"></span> Attendance</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-yellow-400"></span> Leave</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-blue-500"></span> Payroll</div>
        <div className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-red-500"></span> Holiday</div>
      </div>
    </div>
  );
};

export default CalendarWidget;
