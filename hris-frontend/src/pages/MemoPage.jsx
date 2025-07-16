import React from "react";
import Sidebar from "@/components/ui/Sidebar";
import { motion } from "framer-motion";

const MemoPage = () => {
  return (
    <div className="flex h-screen bg-gray-50 text-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.3 }}
        className="flex-1 p-8 space-y-6"
      >
        <h1 className="text-2xl font-bold">Memo Announcements</h1>

        <div className="bg-white p-6 rounded-lg shadow space-y-4 transition hover:scale-[1.02] hover:shadow-lg active:scale-95">
          <div className="border-b pb-4">
            <h2 className="font-semibold text-lg">Company Meeting</h2>
            <p className="text-gray-500 text-sm">July 15, 2024</p>
            <p className="mt-2 text-sm text-gray-700">
              All employees are required to attend the quarterly company meeting at 3PM in the main hall.
            </p>
          </div>

          <div className="border-b pb-4">
            <h2 className="font-semibold text-lg">Holiday Notice</h2>
            <p className="text-gray-500 text-sm">July 20, 2024</p>
            <p className="mt-2 text-sm text-gray-700">
              Please be advised that July 20 is a special non-working holiday. Regular operations will resume the following day.
            </p>
          </div>

          <div>
            <h2 className="font-semibold text-lg">New Guidelines</h2>
            <p className="text-gray-500 text-sm">Effective Immediately</p>
            <p className="mt-2 text-sm text-gray-700">
              Please review the updated HR guidelines sent via email. These will take effect starting this month.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MemoPage;
