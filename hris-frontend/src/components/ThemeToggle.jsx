import React from "react";
import { Moon, Sun } from "lucide-react";

const ThemeToggle = () => {
  const handleToggle = () => {
    const rootWrapper = document.getElementById("root-wrapper");
    rootWrapper.classList.toggle("dark");
  };

  return (
    <button onClick={handleToggle} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition">
      <Sun className="w-4 h-4 hidden dark:block" />
      <Moon className="w-4 h-4 dark:hidden" />
    </button>
  );
};

export default ThemeToggle;
