import { IntCodeComputerV2 } from "../lib/intCodeV2";

const fs = require("fs");

const input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split(",");

enum TileIds {
  EMPTY = "0",
  WALL = "1",
  BLOCK = "2",
  PADDLE = "3",
  BALL = "4"
}

function partOneSolution(input: string[]): number {
  const intCode = new IntCodeComputerV2(input);
  intCode.execute();
  const { outputs } = intCode;
  let blocks = 0;
  for (let i = 0; i < outputs.length; i += 3) {
    const type = outputs[i + 2];
    if (type === "2") {
      blocks += 1;
    }
  }
  return blocks;
}

console.log(partOneSolution(input));

function partTwoSolution(intCodeInstructions: string[]): number {
  // Set memory address to play for free
  intCodeInstructions[0] = "2";

  const outputs = [];

  (function recurse(
    intCodeInstructions: string[],
    pointer = 0,
    input?: number
  ) {
    const intCode = new IntCodeComputerV2(intCodeInstructions);
    intCode.pointer = pointer;

    if (input) {
      intCode.enqueueInput(input);
    }

    intCode.execute();

    if (intCode.executionHalted) {
      outputs.push(intCode.outputs);
      return;
    }

    if (intCode.executionPaused) {
      recurse([...intCode.instructions], intCode.pointer, 0);
      recurse([...intCode.instructions], intCode.pointer, -1);
      recurse([...intCode.instructions], intCode.pointer, 1);
    }
  })(intCodeInstructions);

  return outputs.filter(noTilesRemaining).reduce(findHighestScore, 0);
}

function noTilesRemaining(output: string[], i: number) {
  return output.every((_, i) => {
    if ((i + 1) % 3 === 0) {
      return output[i] !== TileIds.BLOCK;
    }
    return true;
  });
}

function findHighestScore(highScore: number, output: string[]): number {
  // find high score
  const score = findCurrentScore(output);
  return Math.max(highScore, score);
}

function findCurrentScore(output: string[]): number {
  let currentScore = 0;
  for (let i = 0; i < output.length; i += 3) {
    const xCoord = output[i];
    const yCoord = output[i + 1];
    const tileId = output[i + 2];

    if (xCoord === "-1" && yCoord === "0") {
      currentScore = Number(tileId);
    }
  }
  return currentScore;
}

partTwoSolution(input);
