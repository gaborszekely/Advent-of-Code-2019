export function findGreatestCommonDivisorMultiple(...input: number[]): number {
  let a = input[0];
  let b: number;
  for (let i = 1; i < input.length; i++) {
    b = input[i];
    a = findGreatestCommonDivisor(a, b);
  }
  return a;
}

export function findGreatestCommonDivisor(x: number, y: number): number {
  if (typeof x !== "number" || typeof y !== "number") {
    throw new Error("Wrong input types");
  }
  x = Math.abs(x);
  y = Math.abs(y);
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}
