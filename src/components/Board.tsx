"use client"; // This is a client component

import React, { useState } from "react";
import { getRandomColorCode } from "@/utilities/randomCodeGenerator";
import { radioColorValues } from "./ColorButton";
import Circle from "./Circle";
import ColorButtonRow from "./ColorButtonRow";
import AnswerRow from "./AnswerRow";

export default function Board() {
  const CodeInColors: string[] = getRandomColorCode();

  const [selectedColor, setSelectedColor] = useState<string>("crimsom");

  const handleColorChange = (color: string) => {
    setSelectedColor(color);
    console.log("seleccionado color =>", color);
  };

  return (
    <div className="text-white w-[80vw] flex flex-col items-center justify-center">
      <div>
        <p>Random Generated Code:</p>
        <div className="flex">
          {CodeInColors.map((color, index) => (
            <Circle key={index} size="large" color={color} />
          ))}
        </div>
      </div>
      <div></div>

      <h2>The board here:</h2>
      <div className="border border-yellow-200 p-3 grid grid-cols-3 gap-4 items-end max-w-max">
        <div className="border-2 border-gray-600 rounded col-span-2">
          <h3>Left: The Guess</h3>
          <div className="border border-pink-300 flex justify-end">
            <ColorButtonRow
              guessingCode={[
                radioColorValues.transparent,
                radioColorValues.transparent,
                radioColorValues.transparent,
                radioColorValues.transparent,
                radioColorValues.transparent,
              ]}
              size="large"
            />
          </div>
        </div>
        <div className="border-2 border-gray-600 rounded col-span-1">
          <h3>Right: The Answers</h3>
          <div className="flex justify-start">
            <AnswerRow
              guessingCode={[
                radioColorValues.transparent,
                radioColorValues.transparent,
                radioColorValues.transparent,
                radioColorValues.transparent,
                radioColorValues.transparent,
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
