import RandomCode from "@/utilities/randomCodeGenerator";
import Circle from "./Circle";

function Board() {
  const CODE: number[] = RandomCode();

  return (
    <div className="text-white w-[80vw] justify-center mx-auto border">
      <h1>My board here</h1>
      <p>{CODE}</p>
      <div className="flex border">
        <Circle />
      </div>
    </div>
  );
}

export default Board;
