import { answerColorVariants } from "../utilities/radioColorVariants";
import Circle from "./Circle";
import { CODE_LENGTH } from "@/utilities/store";

type AnswerRowProps = {
  guessingCode: answerColorVariants[];
};

export default function AnswerRow({ guessingCode = [] }: AnswerRowProps) {
  const buttonsRemaining = CODE_LENGTH - guessingCode.length;

  return (
    <div className="flex">
      {guessingCode.map((item, index) => (
        <Circle key={index} backgroundColor={item} />
      ))}
    </div>
  );
}
