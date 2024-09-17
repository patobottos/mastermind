import React from "react";
import Circle from "./Circle";

type AnswerRowProps = {
  evaluation: string[];
};

export default function AnswerRow({ evaluation }: AnswerRowProps) {
  return (
    <div className="flex">
      {evaluation.map((color, index) => (
        <Circle key={index} color={color} size="small" />
      ))}
    </div>
  );
}
