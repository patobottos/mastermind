export default function CheckButton() {
  const handleClick = () => {
    console.log("introduciendo código");
  };

  return (
    <button
      type="button"
      className="text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-4 focus:ring-slate-300 w-24 font-medium rounded-full text-sm px-2 py-2.5 text-center me-2 mb-2 dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800 shadow-md"
      onClick={handleClick}
      disabled // REMOVE DISABLED ONLY AFTER COMPLETING FULL CODE GUESS!!
    >
      Check
    </button>
  );
}
