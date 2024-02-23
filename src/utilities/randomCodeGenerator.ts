function getRandomIntInclusive(min: number, max: number): number {
  const minCeiled: number = Math.ceil(min);
  const maxFloored: number = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled); // The maximum is inclusive and the minimum is inclusive
}

export default function getRandomCode(): number[] {
  const CODE: number[] = [];
  for (let i: number = 0; i < 5; i++) {
    const number: number = getRandomIntInclusive(1, 8);
    CODE.push(number);
  }

  console.log('Generated Code:', CODE);
  return CODE;
}

