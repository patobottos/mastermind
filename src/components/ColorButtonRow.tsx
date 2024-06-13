import React, { useState } from "react";
import ColorButton from "./ColorButton";
import { radioColorValues } from "./ColorButton";

type ColorButtonRowProps = {
  guessingCode: radioColorValues[];
  size: "small" | "medium" | "large";
  onColorChange: (color: string, position: number) => void; // Updated onColorChange type
};

export default function ColorButtonRow({
  guessingCode = [],
  size,
  onColorChange,
}: ColorButtonRowProps) {
  const [openColorPickerIndex, setOpenColorPickerIndex] = useState<
    number | null
  >(null);

  const handleColorPickerToggle = (index: number) => {
    setOpenColorPickerIndex(index === openColorPickerIndex ? null : index);
  };

  return (
    <div className="flex">
      {guessingCode.map((item, index) => (
        <ColorButton
          key={index}
          backgroundColor={item}
          size={size}
          position={index + 1} // Pass the position to the ColorButton component
          onColorChange={onColorChange} // Pass the onColorChange function
          isOpen={openColorPickerIndex === index}
          onToggle={() => handleColorPickerToggle(index)}
        />
      ))}
    </div>
  );
}
