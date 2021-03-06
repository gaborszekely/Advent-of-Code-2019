import { assert, IntCodeComputerV2 } from "../lib";
import { permutateRange } from "../lib/permutations";
import { parseFile } from "../lib/fileParser";

const input = parseFile(__dirname).split(",");

/**
 * Part One Solution
 */

function partOneSolution(input: string[]): string {
  const permutations = permutateRange(0, 4);
  let maxOutput: string = "0";

  input = input.map(i => i.toString());

  permutations.forEach(permutation => {
    const amplifier1 = new IntCodeComputerV2(input);
    const amplifier2 = new IntCodeComputerV2(input);
    const amplifier3 = new IntCodeComputerV2(input);
    const amplifier4 = new IntCodeComputerV2(input);
    const amplifier5 = new IntCodeComputerV2(input);

    const result1 = amplifier1.enqueueInput(permutation[0], 0).execute();
    const result2 = amplifier2.enqueueInput(permutation[1], result1).execute();
    const result3 = amplifier3.enqueueInput(permutation[2], result2).execute();
    const result4 = amplifier4.enqueueInput(permutation[3], result3).execute();
    const finalResult = amplifier5
      .enqueueInput(permutation[4], result4)
      .execute();

    if (BigInt(finalResult) > BigInt(maxOutput)) {
      maxOutput = finalResult;
    }
  });

  return maxOutput;
}

const testInput1 = [
  3,
  15,
  3,
  16,
  1002,
  16,
  10,
  16,
  1,
  16,
  15,
  15,
  4,
  15,
  99,
  0,
  0
].map(i => i.toString());
const testInput2 = [
  3,
  23,
  3,
  24,
  1002,
  24,
  10,
  24,
  1002,
  23,
  -1,
  23,
  101,
  5,
  23,
  23,
  1,
  24,
  23,
  23,
  4,
  23,
  99,
  0,
  0
].map(i => i.toString());
const testInput3 = [
  3,
  31,
  3,
  32,
  1002,
  32,
  10,
  32,
  1001,
  31,
  -2,
  31,
  1007,
  31,
  0,
  33,
  1002,
  33,
  7,
  33,
  1,
  33,
  31,
  31,
  1,
  32,
  31,
  31,
  4,
  31,
  99,
  0,
  0,
  0
].map(i => i.toString());

assert(partOneSolution(testInput1), "43210");
assert(partOneSolution(testInput2), "54321");
assert(partOneSolution(testInput3), "65210");

const pt1Solution = partOneSolution(input);
console.log(pt1Solution);

/**
 * Part Two Solution
 */

function partTwoSolution(input: string[]): string {
  const permutations = permutateRange(5, 9);
  let maxOutput: string = "0";

  permutations.forEach(permutation => {
    const amplifier1 = new IntCodeComputerV2(input).enqueueInput(
      permutation[0]
    );
    const amplifier2 = new IntCodeComputerV2(input).enqueueInput(
      permutation[1]
    );
    const amplifier3 = new IntCodeComputerV2(input).enqueueInput(
      permutation[2]
    );
    const amplifier4 = new IntCodeComputerV2(input).enqueueInput(
      permutation[3]
    );
    const amplifier5 = new IntCodeComputerV2(input).enqueueInput(
      permutation[4]
    );

    let finalOutput: string = "0";

    while (
      !isHalted(amplifier1, amplifier2, amplifier3, amplifier4, amplifier5)
    ) {
      const output1 = amplifier1.enqueueInput(finalOutput).execute();
      const output2 = amplifier2.enqueueInput(output1).execute();
      const output3 = amplifier3.enqueueInput(output2).execute();
      const output4 = amplifier4.enqueueInput(output3).execute();
      finalOutput = amplifier5.enqueueInput(output4).execute();
    }

    if (BigInt(finalOutput) > BigInt(maxOutput)) {
      maxOutput = finalOutput;
    }
  });

  return maxOutput;
}

function isHalted(...amplifiers: IntCodeComputerV2[]): boolean {
  return amplifiers.some(amplifier => amplifier.executionHalted);
}

const testInput4 = [
  3,
  26,
  1001,
  26,
  -4,
  26,
  3,
  27,
  1002,
  27,
  2,
  27,
  1,
  27,
  26,
  27,
  4,
  27,
  1001,
  28,
  -1,
  28,
  1005,
  28,
  6,
  99,
  0,
  0,
  5
].map(i => i.toString());

const testInput5 = [
  3,
  52,
  1001,
  52,
  -5,
  52,
  3,
  53,
  1,
  52,
  56,
  54,
  1007,
  54,
  5,
  55,
  1005,
  55,
  26,
  1001,
  54,
  -5,
  54,
  1105,
  1,
  12,
  1,
  53,
  54,
  53,
  1008,
  54,
  0,
  55,
  1001,
  55,
  1,
  55,
  2,
  53,
  55,
  53,
  4,
  53,
  1001,
  56,
  -1,
  56,
  1005,
  56,
  6,
  99,
  0,
  0,
  0,
  0,
  10
].map(i => i.toString());

assert(partTwoSolution(testInput4), "139629729");
assert(partTwoSolution(testInput5), "18216");

const pt2Solution = partTwoSolution(input);
console.log(pt2Solution);
