import React from "react";
import { radioColorVariants } from "@/utilities/radioColorVariants";

interface ColorPickerProps {
  colors: string[];
  defaultColor: string;
  onChange: (color: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  colors,
  defaultColor,
  onChange,
}) => {
  return (
    <div className="flex flex-col items-center justify-center w-32 h-32 x-wrap">
      {/* SMALL TRIANGLE ON TOP*/}
      <div
        className="w-0 h-0 
          border-l-[6px] border-l-transparent
          border-b-[8px] border-b-slate-700
          border-r-[6px] border-r-transparent"
      ></div>
      <div className="flex justify-center border-2 border-slate-700 rounded-xl p-1 shadow-lg">
        <fieldset className="grid grid-cols-3 gap-1">
          {colors.map((color) => (
            <label
              key={color}
              className={`relative cursor-pointer inline-block h-6 w-6 rounded-full border-2 border-gray-600 m-1 hover:brightness-[.8] ${radioColorVariants[color]}`}
            >
              <input
                type="radio"
                name="color"
                value={color}
                className="sr-only"
                checked={color === defaultColor}
                onChange={() => onChange(color)}
              />
            </label>
          ))}
        </fieldset>
      </div>
    </div>
  );
};

export default ColorPicker;
