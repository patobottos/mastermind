import { getRandomColorCode } from "@/utilities/randomCodeGenerator";
import Circle from "./Circle";

function Board() {
  const CodeInColors: string[] = getRandomColorCode();
  console.log("Code in colors => ", CodeInColors.join(", "));
  //const CodeIncolorsArray: string[] = CodeInColors.map((item) => item.key);

  return (
    <div className="text-white w-[80vw] justify-center mx-auto border">
      <h1>My board here</h1>
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
      <p>Testing Code translation into Color Circles:</p>

      <div className="flex border">
        {CodeInColors.map((color, index) => (
          <Circle key={index} size="large" color={color} />
        ))}
      </div>
      <p>QQQ</p>
    </div>
  );
}

export default Board;
