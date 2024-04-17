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
    <div className="flex my-2">
      {guessingCode.map((item, index) => (
        <ColorButton
          key={index}
          backgroundColor={item}
          size={size}
          position={index + 1} // Pass the position to the ColorButton component
          onColorChange={onColorChange} // Pass the onColorChange function
        />
      ))}
    </div>
  );
}
