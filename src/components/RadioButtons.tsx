import Circle from "./Circle";

function RadioButtons() {
  const RadioButtonsColors: string[] = [
    "crimson",
    "sunrise",
    "sunny",
    "emerald",
    "azure",
    "velvet",
    "sky",
    "rosy",
  ];

  return (
    <div className="flex flex-col margin-auto items-center">
      {/* SMALL TRIANGLE ON TOP*/}
      <div
        className="w-0 h-0 
          border-l-[6px] border-l-transparent
          border-b-[8px] border-b-slate-700
          border-r-[6px] border-r-transparent"
      ></div>
      <div className="w-28 flex justify-center border-2 border-slate-700 rounded-lg p-1">
        <fieldset className="grid grid-cols-3 gap-1">
          {RadioButtonsColors.map((backgroundColor, index) => (
            <>
              <input
                type="radio"
                id={backgroundColor}
                value={backgroundColor}
                name="color"
                className="bg-slate-300"
              />
              <label htmlFor={backgroundColor}>
                <Circle
                  key={backgroundColor}
                  size="small"
                  color={backgroundColor}
                />
              </label>
            </>
          ))}
        </fieldset>
      </div>
    </div>
  );
}

export default RadioButtons;
