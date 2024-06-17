import React, { useState } from "react";
import { radioColorVariants } from "@/utilities/radioColorVariants";
import ColorPicker from "./ColorPicker";

export enum radioColorValues {
  crimson = "crimson",
  sunrise = "sunrise",
  sunny = "sunny",
  emerald = "emerald",
  azure = "azure",
  velvet = "velvet",
  skyblue = "skyblue",
  rosy = "rosy",
  transparent = "transparent", // WHEN NO COLOR IS CHOSEN
  white = "white",
  black = "black",
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
  position: number;
  onClick?: () => void;
  onColorChange?: (color: string, position: number) => void;
  isOpen?: boolean;
  onToggle?: () => void;
};

export default function ColorButton({
  backgroundColor,
  size,
  position,
  onClick,
  onColorChange,
  isOpen,
  onToggle,
}: ColorButtonProps) {
  const sizeVariants = {
    small: "h-4 w-4",
    medium: "h-7 w-7",
    large: "h-9 w-9",
  };

  const [selectedColor, setSelectedColor] = useState(
    backgroundColor || "transparent"
  );

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    if (onColorChange) {
      onColorChange(color, position); // Call the onColorChange function with position
    }
    if (onToggle) {
      onToggle(); // Close the color picker
    }
  };

  const colorStyles =
    selectedColor === "transparent"
      ? "bg-transparent"
      : `${radioColorVariants[selectedColor]}`;

  return (
    <div className="relative">
      <button
        onClick={onToggle}
        className={`h-10 w-10 border-2 m-1 border-slate-500 rounded-full hover:brightness-[.8] ${colorStyles} ${sizeVariants[size]}`}
      ></button>
      {isOpen && (
        <div className="absolute z-10 top-10 left-1/2 transform -translate-x-1/2">
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
