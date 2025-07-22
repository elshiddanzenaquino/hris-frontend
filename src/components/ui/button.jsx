import React from "react";

export const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`w-full px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-all duration-200 dark:bg-indigo-500 dark:hover:bg-indigo-600 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
