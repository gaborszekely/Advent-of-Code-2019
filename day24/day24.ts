import { parseFile, GridString } from "../lib";

export function partOneSolution(input: string): number {
  const gridStates: GridStates = {};

  let grid = new GridString(input);

  while (true) {
    if (gridStates[grid.grid]) {
      return getBioDiversityRating(grid);
    }
    gridStates[grid.grid] = true;
    grid = getNewState(grid);
  }
}

function getNewState(grid: GridString): GridString {
  const newGrid = new GridString(grid.grid);

  grid.forEach((val, row, col) => {
    // check adjacent values
    const neighborCoords = [
      [row + 1, col],
      [row - 1, col],
      [row, col + 1],
      [row, col - 1]
    ];

    // Find number of bug neighbors
    let bugCounter = 0;
    for (let [neighborRow, neighborCol] of neighborCoords) {
      // if neighbor is in bounds and is a bug, increment bug counter
      if (
        neighborRow >= 0 &&
        neighborRow < 5 &&
        neighborCol >= 0 &&
        neighborCol < 5 &&
        grid.get(neighborRow, neighborCol) === GridItems.BUG
      ) {
        bugCounter += 1;
      }
    }

    // A bug dies (becoming an empty space) unless there is exactly one bug adjacent to it
    if (val === GridItems.BUG && bugCounter !== 1) {
      newGrid.set(row, col, GridItems.EMPTY);
    }

    // An empty space becomes infested with a bug if exactly one or two bugs are adjacent to it
    if (val === GridItems.EMPTY && (bugCounter === 1 || bugCounter === 2)) {
      newGrid.set(row, col, GridItems.BUG);
    }
  });

  return newGrid;
}

function getBioDiversityRating(grid: GridString): number {
  let total = 0;
  let index = 0;
  grid.forEach(val => {
    if (val === GridItems.BUG) {
      total += 2 ** index;
    }
    index++;
  });

  return total;
}

/**
 * Types / Interfaces
 */

interface GridStates {
  [gridState: string]: boolean;
}

const enum GridItems {
  BUG = "#",
  EMPTY = "."
}

/**
 * Solution
 */
const inputText: string = parseFile(__dirname);

var partOne = partOneSolution(inputText);
console.log(partOne);
