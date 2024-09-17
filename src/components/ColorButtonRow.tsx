import React, { useState, useEffect } from "react";
import ColorButton from "./ColorButton";
import { CodePosition } from "@/utilities/randomCodeGenerator";
import { radioColorValues } from "./ColorButton";

type ColorButtonRowProps = {
  guessingCode: CodePosition[];
  size: "small" | "medium" | "large";
  onColorChange: (color: radioColorValues, position: number) => void;
  isEnabled: boolean;
};

export default function ColorButtonRow({
  guessingCode = [],
  size,
  onColorChange,
  isEnabled,
}: ColorButtonRowProps) {
  const [currentGuess, setCurrentGuess] = useState(guessingCode);
  const [openColorPickerIndex, setOpenColorPickerIndex] = useState<
    number | null
  >(null);

  useEffect(() => {
    setCurrentGuess(guessingCode);
  }, [guessingCode]);

  const handleColorPickerToggle = (index: number) => {
    setOpenColorPickerIndex(index === openColorPickerIndex ? null : index);
  };

  return (
    <div className="flex">
      {currentGuess.map((item, index) => (
        <ColorButton
          key={index}
          backgroundColor={item.color as radioColorValues}
          size={size}
          position={index + 1} // Pass the position to the ColorButton component
          onColorChange={(color, position) => {
            const updatedGuess = [...currentGuess];
            updatedGuess[index] = {
              position,
              color: color as radioColorValues,
            }; // Ensure the color is of type radioColorValues
            setCurrentGuess(updatedGuess);
            onColorChange(color as radioColorValues, position); // Ensure the color is of type radioColorValues
          }}
          isOpen={isEnabled && openColorPickerIndex === index}
          onToggle={() => handleColorPickerToggle(index)}
        />
      ))}
    </div>
  );
}
