import ColorButton from "./ColorButton";
import { CODE_LENGTH } from "@/utilities/store";
import { radioColorValues } from "./ColorButton";

type ColorButtonRowProps = {
  guessingCode: radioColorValues[];
  size: "small" | "medium" | "large";
};

export default function ColorButtonRow({
  guessingCode = [],
  size,
}: ColorButtonRowProps) {
  const buttonsRemaining = CODE_LENGTH - guessingCode.length;

  return (
    <div className="flex">
      {guessingCode.map((item, index) => (
        <ColorButton key={index} backgroundColor={item} size={size} />
      ))}
    </div>
  );
}
