"use client"; // This is a client component

import React, { useState } from "react";
import { getRandomColorCode } from "@/utilities/randomCodeGenerator";
import Circle from "./Circle";
import RadioButtons from "./RadioButtons";
import ColorPicker from "./ColorPicker";

function Board() {
  const CodeInColors: string[] = getRandomColorCode();
  const RadioColors = [
    "crimsom",
    "sunrise",
    "sunny",
    "emerald",
    "azure",
    "velvet",
    "sky",
    "rosy",
  ];
  const [selectedColor, setSelectedColor] = useState<string>("crimsom");

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    // Additional logic for handling color change if needed
  };

  return (
    <div className="text-white w-[80vw] justify-center mx-auto border">
      <h1>My board here</h1>
      <h3>TESTING COLOR CIRCLES... </h3>
      <div className="flex border">
        <Circle size="large" color="crimson" />
        <Circle size="large" color="sunrise" />
        <Circle size="large" color="sunny" />
        <Circle size="large" color="emerald" />
        <Circle size="large" color="azure" />
        <Circle size="large" color="velvet" />
        <Circle size="large" color="sky" />
        <Circle size="large" color="rosy" />
        <Circle size="large" color="miss" />
        <Circle size="large" color="present" />
        <Circle size="large" color="match" />
      </div>
      <div className="border">
        <p>Testing Code translation into Color Circles:</p>
        <div className="flex">
          {CodeInColors.map((color, index) => (
            <Circle key={index} size="large" color={color} />
          ))}
        </div>
      </div>
      <div className="border">
        <p>Introducing a Guess Radio Buttons:</p>
        <div className="flex">
          <RadioButtons />
        </div>
      </div>
      <div className="border">
        <p>Testing Color Picker Component:</p>
        <div className="w-[120px] mx-auto">
          <ColorPicker
            colors={RadioColors}
            defaultColor={selectedColor}
            onChange={handleColorChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Board;
