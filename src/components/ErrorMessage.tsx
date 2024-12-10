import React from "react";
import { useGameStore } from "@/utilities/store";

const ErrorMessage = () => {
  const errorMessage = useGameStore((state) => state.errorMessage);
  const clearError = useGameStore((state) => state.clearError);

  if (!errorMessage) return null; // Don't render if no error

  return (
    <div className="error-message bg-red-100 text-red-700 p-4 rounded-md mb-4">
      {errorMessage}
      <button
        onClick={clearError}
        className="ml-4 text-red-500 underline"
      >
        Dismiss
      </button>
    </div>
  );
};

export default ErrorMessage;
