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
  "white",
  "black",
}

export const initialColorValues: radioColorValues[] = [
  radioColorValues.transparent,
  radioColorValues.transparent,
  radioColorValues.transparent,
  radioColorValues.transparent,
  radioColorValues.transparent,
];

type ColorButtonProps = {
  backgroundColor?: radioColorValues;
  size: "small" | "medium" | "large";
  position: number; // Add position prop
  onClick?: () => void;
  onColorChange?: (color: string, position: number) => void; // Modify the onColorChange type
};

export default function ColorButton({
  backgroundColor,
  size,
  position,
  onClick,
  onColorChange,
}: ColorButtonProps) {
  const sizeVariants = {
    small: "h-5 w-5",
    medium: "h-8 w-8",
    large: "h-10 w-10",
  };

  const [selectedColor, setSelectedColor] = useState(
    backgroundColor || "transparent"
  );
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleColorPickerToggle = () => {
    setShowColorPicker((prev) => !prev);
  };

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    setShowColorPicker(false); // Close ColorPicker after selection
    if (onColorChange) {
      onColorChange(color, position); // Call the onColorChange function with position
    }
  };

  const colorStyles =
    selectedColor === "transparent"
      ? "bg-transparent"
      : `${radioColorVariants[selectedColor]}`;

  return (
    <div className='relative'>
      <button
        onClick={handleColorPickerToggle}
        className={`h-10 w-10 border-2 border-slate-500 m-1 rounded-full hover:brightness-[.8] ${colorStyles} ${sizeVariants[size]}`}
      ></button>
      {showColorPicker && (
        <div className='absolute top-10 left-1/2 transform -translate-x-1/2'>
          <ColorPicker
            colors={Object.keys(radioColorVariants)}
            defaultColor={"transparent"}
            onChange={handleColorChange}
          />
        </div>
      )}
    </div>
  );
}
