function getRandomIntInclusive(min: number, max: number): number {
  const minCeiled: number = Math.ceil(min);
  const maxFloored: number = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled);
}

export default function getRandomCode(): number[] {
  const CODE: number[] = [];
  for (let i: number = 0; i < 5; i++) {
    const number: number = getRandomIntInclusive(0, 7);
    CODE.push(number);
  }

  return CODE;
}

const CircleColorVariants: { [key: number]: string } = {
  0: "crimson",
  1: "sunrise",
  2: "sunny",
  3: "emerald",
  4: "azure",
  5: "velvet",
  6: "skyblue",
  7: "rosy"
};

export type CodePosition = {
  position: number;
  color: string;
};

export type AnswerCodeType = CodePosition[];

export function getRandomColorCode(): CodePosition[] {
  const CODE: number[] = getRandomCode();

  const AnswerCode: AnswerCodeType = CODE.map((item, index) => ({
    position: index + 1,
    color: CircleColorVariants[item]
  }));

  // console.log('Generated Code:', CODE);
  // console.log('Answer Code :', AnswerCode);
  return AnswerCode;
}


