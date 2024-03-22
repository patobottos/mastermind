import React from "react";
import Circle from "./Circle";

type AnswerRowProps = {
  evaluation: string[];
};

export default function AnswerRow({ evaluation }: AnswerRowProps) {
  return (
    <div className='flex'>
      {evaluation.map((item, index) => (
        <Circle key={index} color={item as string} size='small' />
      ))}
    </div>
  );
}
