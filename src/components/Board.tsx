import RandomCode from "@/utilities/randomCodeGenerator";
import Circle from "./Circle";
import Palette from "./Palette";

function Board() {
  const CODE: number[] = RandomCode();

  return (
    <div className="text-white w-[80vw] justify-center mx-auto border">
      <h1>My board here</h1>
      <p>{CODE}</p>
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
      <p>Testing Palette component:</p>
      <div className="flex">
        <Palette />
      </div>
    </div>
  );
}

export default Board;
