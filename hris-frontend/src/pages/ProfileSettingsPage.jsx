import React from "react";
import Sidebar from "@/components/ui/Sidebar";
import { motion } from "framer-motion";

const ProfileSettingsPage = () => {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="flex-1 p-8 space-y-6"
      >
        <h1 className="text-2xl font-bold">Profile Settings</h1>

        <div className="bg-white p-6 rounded-lg shadow space-y-6 transition hover:scale-[1.02] hover:shadow-lg active:scale-95">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your full name"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your email address"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="********"
            />
          </div>

          <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition transform hover:scale-105 active:scale-95">
            Save Changes
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfileSettingsPage;
