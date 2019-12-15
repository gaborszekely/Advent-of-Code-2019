import { IntCodeComputerV2 } from "../lib/intCodeV2";
import { generateGrid } from "../lib/generateGrid";
import { parseFile } from "../lib/fileParser";

const input = parseFile(__dirname).split(",");

enum DirectionEnum {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right"
}

enum TurnEnum {
  LEFT = "0",
  RIGHT = "1"
}

enum ColorEnum {
  BLACK = "0",
  WHITE = "1"
}

type Coord = [number, number];

function partOneSolution(input: string[]): number {
  const intCode = new IntCodeComputerV2(input);
  const panels = {};
  const visitedCoords = {};
  let painted = 0;
  let currCoords: Coord = [0, 0];
  let currDirection = DirectionEnum.UP;
  let lowestI = 0;
  let highestI = 0;
  let lowestJ = 0;
  let highestJ = 0;
  let first = true;

  while (!intCode.executionHalted) {
    const [currI, currJ] = currCoords;

    if (!visitedCoords[`${currI}:${currJ}`]) {
      visitedCoords[`${currI}:${currJ}`] = true;
      painted += 1;
    }

    lowestI = Math.min(lowestI, currI);
    highestI = Math.max(highestI, currI);
    lowestJ = Math.min(lowestJ, currJ);
    highestJ = Math.max(highestJ, currJ);

    intCode
      .enqueueInput(
        panels[`${currI}:${currJ}`] ||
          (first ? ColorEnum.WHITE : ColorEnum.BLACK)
      )
      .execute();
    const [color, turnDirection] = intCode.outputs.slice(-2);
    panels[`${currI}:${currJ}`] = color;
    currDirection = getNewDirection(currDirection, turnDirection as TurnEnum);
    const [newI, newJ] = getNewCoords(currCoords, currDirection);

    currCoords = [newI, newJ];
    first = false;
  }

  // console.log(lowestI);
  // console.log(highestI);
  // console.log(lowestJ);
  // console.log(highestJ);

  const gridHeight = highestI - lowestI;
  const gridWidth = highestJ - lowestJ;

  console.log(gridHeight, gridWidth);

  const grid = generateGrid<string>(gridHeight, gridWidth, " ");

  for (let key in panels) {
    const [panelI, panelJ] = key.split(":").map(i => Number(i));
    const normalizedI = panelI - lowestI;
    const normalizedJ = panelJ - lowestJ;
    grid[normalizedI] = grid[normalizedI] || [];
    grid[normalizedJ][normalizedI] =
      panels[key] === ColorEnum.BLACK ? " " : "\u2588";
  }

  const gridDisp = grid.map(row => row.join("")).join("\n");

  console.log(gridDisp);

  return painted;
}

function partTwoSolution() {}

function getNewCoords(currCoords: Coord, currDirection: DirectionEnum): Coord {
  switch (currDirection) {
    case DirectionEnum.UP: {
      return [currCoords[0], currCoords[1] - 1];
    }
    case DirectionEnum.DOWN: {
      return [currCoords[0], currCoords[1] + 1];
    }
    case DirectionEnum.LEFT: {
      return [currCoords[0] - 1, currCoords[1]];
    }
    case DirectionEnum.RIGHT: {
      return [currCoords[0] + 1, currCoords[1]];
    }
    default: {
      throw new Error("Current direction invalid.");
    }
  }
}

function getNewDirection(
  currentDirection: DirectionEnum,
  turn: TurnEnum
): DirectionEnum {
  if (currentDirection === DirectionEnum.UP) {
    return turn === TurnEnum.LEFT ? DirectionEnum.LEFT : DirectionEnum.RIGHT;
  }

  if (currentDirection === DirectionEnum.DOWN) {
    return turn === TurnEnum.LEFT ? DirectionEnum.RIGHT : DirectionEnum.LEFT;
  }

  if (currentDirection === DirectionEnum.LEFT) {
    return turn === TurnEnum.LEFT ? DirectionEnum.DOWN : DirectionEnum.UP;
  }

  if (currentDirection === DirectionEnum.RIGHT) {
    return turn === TurnEnum.LEFT ? DirectionEnum.UP : DirectionEnum.DOWN;
  }
}

console.log(partOneSolution(input));

// HCZRUGAZ
