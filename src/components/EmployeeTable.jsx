import React from "react";

const employees = [
  { id: 1, name: "Juan Dela Cruz", position: "Web Developer", status: "Active" },
  { id: 2, name: "Maria Santos", position: "HR Manager", status: "Active" },
  { id: 3, name: "Pedro Pascual", position: "Accountant", status: "On Leave" },
];

const EmployeeTable = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6 transition hover:shadow-lg">
      <h3 className="text-md font-bold mb-4">Employee List</h3>
      <table className="w-full text-sm text-left">
        <thead className="border-b text-gray-500">
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Position</th>
            <th className="py-2">Status</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp.id} className="border-b hover:bg-gray-50">
              <td className="py-2">{emp.name}</td>
              <td className="py-2">{emp.position}</td>
              <td className="py-2">{emp.status}</td>
              <td className="py-2 space-x-2">
                <button className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition">View</button>
                <button className="px-2 py-1 text-xs bg-yellow-500 text-white rounded hover:bg-yellow-600 transition">Edit</button>
                <button className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600 transition">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
