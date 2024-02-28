"use client"; // This is a client component

import React, { useState } from "react";
import { getRandomColorCode } from "@/utilities/randomCodeGenerator";
import Circle from "./Circle";
import ColorPicker from "./ColorPicker";
import { radioColorVariants } from "@/utilities/radioColorVariants";
import ColorButton from "./ColorButton";
import { CODE_LENGTH, GUESS_CHANCES } from "@/utilities/store";

function Board() {
  const CodeInColors: string[] = getRandomColorCode();

  const [selectedColor, setSelectedColor] = useState<string>("crimsom");

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    console.log("seleccionado color =>", color);
  };

  return (
    <div className="text-white w-[80vw] justify-center mx-auto border">
      <div className="border">
        <p>Random Generated Code:</p>
        <div className="flex">
          {CodeInColors.map((color, index) => (
            <Circle key={index} size="large" color={color} />
          ))}
        </div>
      </div>
      <div className="border">
        <p>Test for board:</p>
        <div>
          {}
          <ColorButton />
        </div>
      </div>
      <div className="border">
        <p>Testing Color Picker Component:</p>
        <div className="w-[120px] mx-auto">
          <ColorPicker
            colors={Object.keys(radioColorVariants)}
            defaultColor={selectedColor}
            onChange={handleColorChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Board;
