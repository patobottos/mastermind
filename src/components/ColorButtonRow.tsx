import ColorButton from "./ColorButton";
import { CODE_LENGTH } from "@/utilities/store";
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
  const buttonsRemaining = CODE_LENGTH - guessingCode.length;

  return (
    <div className="flex">
      {guessingCode.map((item, index) => (
        <ColorButton
          key={index}
          backgroundColor={item}
          size={size}
          onClick={() => onColorChange(item, index + 1)} // Pass both color and position
        />
      ))}
    </div>
  );
}
