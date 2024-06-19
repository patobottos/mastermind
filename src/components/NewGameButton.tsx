import React from "react";

type NewGameButtonProps = {
  onClick: () => void;
};

export default function NewGameButton({ onClick }: NewGameButtonProps) {
  return (
    <button
      type="button"
      className="text-slate-800 bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 w-24 font-medium rounded-full text-sm px-2 py-2.5 text-center m-2 dark:bg-slate-300 dark:hover:bg-slate-600 dark:hover:text-slate-100 dark:focus:ring-slate-800 shadow-md"
      onClick={onClick}
    >
      New Game
    </button>
  );
}
