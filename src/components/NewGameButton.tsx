import React from "react";

type NewGameButtonProps = {
  onClick: () => void;
};

export default function NewGameButton({ onClick }: NewGameButtonProps) {
  return (
    <button
      type="button"
      className="w-24 font-medium rounded-full text-sm px-2 py-2.5 text-center m-2 
        font-sans text-slate-900 bg-slate-400 hover:bg-slate-300 focus:outline-none 
        focus:ring-4 focus:ring-slate-400 dark:bg-sky-600 dark:text-slate-200 
        dark:hover:bg-sky-500 dark:hover:text-white dark:focus:ring-sky-400 
        transition-colors ease-in-out duration-300"
      onClick={onClick}
    >
      New Game
    </button>
  );
}
