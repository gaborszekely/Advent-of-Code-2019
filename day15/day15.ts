import { parseFile } from "../lib/fileParser";
import { IntCodeComputerV2 } from "../lib";
import { Coord } from "../types/coord";
import { fill } from "../lib/unlimitedGrid";

const input = parseFile(__dirname).split(",");

export function partOneSolution1(input: string[]): number {
  // let minSteps: number = 0;
  // const inner = (input: string[], pointer = 0, steps = 0) => {
  //   const intCodeComputer = new IntCodeComputerV2(input);
  //   for (let direction = 1; direction <= 4; direction++) {
  //     let newSteps = steps;
  //     intCodeComputer.enqueueInput(direction).execute();
  //     const output = intCodeComputer.currentOutput as StatusCodes;
  //     // Since we didn't hit a wall, increment steps
  //     if (output !== StatusCodes.WALL) {
  //       newSteps += 1;
  //     }
  //     if (output === StatusCodes.FOUND) {
  //       minSteps = Math.min(minSteps, newSteps);
  //     }
  //   }
  // };
  // inner(input);
  // return minSteps;
}

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
    console.clear();
    console.log(`Current Coords: ${coords.join(", ")}\n\n`);
    console.log(grid);

    let moved = false;

    for (let direction of directions) {
      console.log(previousDirection);
      intCodeComputer.enqueueInput(direction).execute();
      const output = intCodeComputer.currentOutput as StatusCode;

      if (output === StatusCode.FOUND) {
        return false;
      }

      if (output === StatusCode.WALL) {
        const wallCoords = updateCoords(coords, previousDirection, direction);
        fill(grid, wallCoords, "#", " ");
        continue;
      }

      moved = true;
      steps += 1;
      grid[coords[0]][coords[1]] = ".";
      coords = fill(
        grid,
        updateCoords(coords, previousDirection, direction),
        "*",
        " "
      );
      previousDirection = direction;
      break;
    }
    return moved;
  }, 200);

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

// const grid = [["*"]];
// const newCoords = updateCoords([0, 0], Direction.STRAIGHT, Direction.LEFT);
// fill(grid, newCoords, "*", " ");
// console.log(grid);
