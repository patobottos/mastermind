import React, { useState } from "react";
import { radioColorVariants } from "@/utilities/radioColorVariants";
import ColorPicker from "./ColorPicker";

export enum radioColorValues {
  "crimson",
  "sunrise",
  "sunny",
  "emerald",
  "azure",
  "velvet",
  "skyblue",
  "rosy",
  "transparent", // WHEN NO COLOR IS CHOSEN
}

type ColorButtonProps = {
  value?: radioColorValues;
};

export function ColorButton({ value }: ColorButtonProps) {
  const [selectedColor, setSelectedColor] = useState(value || "transparent");
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorPickerToggle = () => {
    setShowColorPicker(!showColorPicker);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setShowColorPicker(false); // Close ColorPicker after selection
  };

  const valueStyles =
    selectedColor === "transparent"
      ? "bg-transparent"
      : `${radioColorVariants[selectedColor]}`;

  return (
    <div className="relative">
      <button
        onClick={handleColorPickerToggle}
        className={`h-10 w-10 border-2 border-slate-500 m-1 rounded-full hover:brightness-[.8] ${valueStyles}`}
      ></button>
      {showColorPicker && (
        <div className="absolute top-12 right-1/2">
          <ColorPicker
            colors={Object.keys(radioColorVariants)}
            defaultColor={selectedColor}
            onChange={handleColorChange}
          />
        </div>
      )}
    </div>
  );
}

export default ColorButton;
