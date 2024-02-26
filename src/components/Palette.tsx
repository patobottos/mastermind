import Circle from "./Circle";

function Palette() {
  const paletteColors: string[] = ["crimson", "sunrise"];

  return (
    <div className="flex">
      {paletteColors.map((backgroundColor, index) => {
        return (
          <Circle key={backgroundColor} size="large" color={backgroundColor} />
        );
      })}
    </div>
  );
}
export default Palette;
