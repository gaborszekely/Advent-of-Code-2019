import { parseFile } from "../lib/fileParser";
import { IntCodeComputerV2 } from "../lib";
import { Coord } from "../types/coord";
import { fill } from "../lib/unlimitedGrid";

const input = parseFile(__dirname).split(",");

export function partOneSolution(input: string[]): number {
  const intCodeComputer = new IntCodeComputerV2(input);
  const grid = [["*"]];
  let steps = 0;
  let reps = 0;
  let previousDirection = Direction.STRAIGHT;

  const directions = [
    Direction.LEFT,
    Direction.STRAIGHT,
    Direction.RIGHT,
    Direction.BACK
  ];

  let coords: Coord = [0, 0];

  animate(() => {
    let moved = false;

    for (let direction of directions) {
      intCodeComputer.enqueueInput(direction).execute();
      const output = intCodeComputer.currentOutput as StatusCode;

      if (output === StatusCode.FOUND) {
        return false;
      }

      if (output === StatusCode.WALL) {
        coords = setWall(grid, coords, previousDirection, direction);
        logGrid(grid, coords);
        continue;
      }

      moved = true;
      steps += 1;
      coords = move(grid, coords, previousDirection, direction);
      previousDirection = direction;
      logGrid(grid, coords);
      break;
    }

    return moved;
  }, 3000);

  return steps;
}

/**
 * Interfaces
 */

enum Direction {
  STRAIGHT = 1,
  BACK = 2,
  LEFT = 3,
  RIGHT = 4
}

enum StatusCode {
  WALL = "0",
  MOVED = "1",
  FOUND = "2"
}

// Use DFS to check each direction

console.log(partOneSolution(input));

function animate(animateFunction: () => boolean, delay: number): void {
  const continueIteration = animateFunction();
  if (continueIteration) {
    setTimeout(() => {
      animate(animateFunction, delay);
    }, delay);
  }
}

function updateCoords(
  coords: Coord,
  previousDirection: Direction,
  newDirection: Direction
): Coord {
  switch (previousDirection) {
    case Direction.STRAIGHT: {
      if (newDirection === Direction.STRAIGHT) {
        return [coords[0] - 1, coords[1]];
      }
      if (newDirection === Direction.LEFT) {
        return [coords[0], coords[1] - 1];
      }
      if (newDirection === Direction.RIGHT) {
        return [coords[0], coords[1] + 1];
      }
      if (newDirection === Direction.BACK) {
        return [coords[0] + 1, coords[1]];
      }
    }
    case Direction.BACK: {
      if (newDirection === Direction.STRAIGHT) {
        return [coords[0] + 1, coords[1]];
      }
      if (newDirection === Direction.LEFT) {
        return [coords[0], coords[1] + 1];
      }
      if (newDirection === Direction.RIGHT) {
        return [coords[0], coords[1] - 1];
      }
      if (newDirection === Direction.BACK) {
        return [coords[0] - 1, coords[1]];
      }
    }
    case Direction.LEFT: {
      if (newDirection === Direction.STRAIGHT) {
        return [coords[0], coords[1] - 1];
      }
      if (newDirection === Direction.LEFT) {
        return [coords[0] + 1, coords[1]];
      }
      if (newDirection === Direction.RIGHT) {
        return [coords[0] - 1, coords[1]];
      }
      if (newDirection === Direction.BACK) {
        return [coords[0], coords[1] + 1];
      }
    }
    case Direction.RIGHT: {
      if (newDirection === Direction.STRAIGHT) {
        return [coords[0], coords[1] + 1];
      }
      if (newDirection === Direction.LEFT) {
        return [coords[0] - 1, coords[1]];
      }
      if (newDirection === Direction.RIGHT) {
        return [coords[0] + 1, coords[1]];
      }
      if (newDirection === Direction.BACK) {
        return [coords[0], coords[1] - 1];
      }
    }
    default: {
      throw new Error("Incorrect direction provided.");
    }
  }
}

function setWall(
  grid: string[][],
  coords: Coord,
  previousDirection: Direction,
  direction: Direction
): Coord {
  const wallCoords = updateCoords(coords, previousDirection, direction);
  const newCoords = fill(grid, wallCoords, "#", " ");
  const offset = [coords[0] - wallCoords[0], coords[1] - wallCoords[1]];
  grid[newCoords[0] + offset[0]][newCoords[1] + offset[1]] = "*";
  return [newCoords[0] + offset[0], newCoords[1] + offset[1]];
}

function move(
  grid: string[][],
  coords: Coord,
  previousDirection: Direction,
  direction: Direction
): Coord {
  const updatedCoords = updateCoords(coords, previousDirection, direction);
  const newCoords = fill(grid, updatedCoords, "*", " ");
  const offset = [coords[0] - updatedCoords[0], coords[1] - updatedCoords[1]];
  grid[newCoords[0] + offset[0]][newCoords[1] + offset[1]] = ".";
  return newCoords;
}

function logGrid(grid: string[][], coords: Coord): void {
  console.clear();
  console.log(`Current Coords: ${coords.join(", ")}\n\n`);
  console.log(logMap(grid));
}

function logMap(grid: string[][]): void {
  console.log(grid.map(row => row.join("")).join("\n"));
}

// const grid = [["*"]];
// let ourCoords: Coord = [0, 0];

// logMap(grid);

// ourCoords = setWall(grid, ourCoords, Direction.STRAIGHT, Direction.BACK);
// logMap(grid);
// console.log(ourCoords);

// console.log("MOVING LEFT");
// ourCoords = move(grid, ourCoords, Direction.STRAIGHT, Direction.RIGHT);
// logMap(grid);
// console.log("Our Coords: ", ourCoords.join(", "));

// console.log("MOVING DOWN");
// ourCoords = move(grid, ourCoords, Direction.RIGHT, Direction.RIGHT);
// logMap(grid);
// console.log("Our Coords: ", ourCoords.join(", "));
