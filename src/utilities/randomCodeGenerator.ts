function getRandomIntInclusive(min: number, max: number): number {
  const minCeiled: number = Math.ceil(min);
  const maxFloored: number = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

export default function getRandomCode(): number[] {
  const CODE: number[] = [];
  for (let i: number = 0; i < 5; i++) {
    const number: number = getRandomIntInclusive(0, 7);
    CODE.push(number);
  }

  return CODE;
}

export function getRandomColorCode(): string[] {
  const CircleColorVariants: { [key: number]: string } = {
    0: "crimson",
    1: "sunrise",
    2: "sunny",
    3: "emerald",
    4: "azure",
    5: "velvet",
    6: "skyblue",
    7: "rosy"
  }

  const CODE: number[] = getRandomCode();

  const CodeInColors: string[] = CODE.map(item => CircleColorVariants[item]);

  console.log('Generated Code:', CODE);
  console.log('Code in colors:', CodeInColors);
  return CodeInColors;
}

