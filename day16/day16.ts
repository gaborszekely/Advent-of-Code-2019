import { assert } from "../lib";
import { parseFile } from "../lib/fileParser";

const input = parseFile(__dirname);

function partOneSolution(input: string, phases: number): string {
  const basePattern = [0, 1, 0, -1];
  let currentInput = input;

  // For phases
  for (let i = 0; i < phases; i++) {
    let newInput = "";

    // For each cycle
    for (let j = 1; j <= currentInput.length; j++) {
      const pattern = getPatternForPosition(basePattern, j);

      let total = 0;

      // For each digig on a row
      for (let k = 0; k < currentInput.length; k++) {
        const digit = Number(currentInput[k]);
        const patternIndex = k % pattern.length;
        const patternNum = pattern[patternIndex];
        total += digit * patternNum;
      }

      newInput += Math.abs(Number(total.toString().slice(-1))).toString();
    }

    currentInput = newInput;
  }
  return currentInput.slice(0, 8);
}

/**
 * Helper methods
 */

function getPatternForPosition(pattern: number[], set: number): number[] {
  const newPattern = flatten(pattern.map(num => Array(set).fill(num)));

  let temp = newPattern[0];
  newPattern.splice(0, 1);
  newPattern.push(temp);
  return newPattern;
}

function flatten<T = any>(array: any): T[] {
  return array.reduce((acc: T[], item: any) => {
    return Array.isArray(item) ? [...acc, ...flatten(item)] : [...acc, item];
  }, []);
}

/**
 * Test
 */

const testInput = "12345678";

// assert(partOneSolution(testInput, 1), "48226158");
// assert(partOneSolution(testInput, 2), "34040438");
// assert(partOneSolution(testInput, 3), "03415518");
// assert(partOneSolution(testInput, 4), "01029498");

// assert(partOneSolution("80871224585914546619083218645595", 100), "24176176");

// console.log(1 * 1 + 2 * 0 + 3 * -1 + 4 * 0 + 5 * 1 + 6 * 0 + 7 * -1 + 8 * 0);
// console.log(1 * 0 + 2 * 1 + 3 * 1 + 4 * 0 + 5 * 0 + 6 * -1 + 7 * -1 + 8 * 0);

console.log(partOneSolution(input, 100));
