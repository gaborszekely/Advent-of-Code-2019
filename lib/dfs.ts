import { generateGrid } from "./generateGrid";
import { Grid } from "../types/grid";
import { Coord } from "../types/coord";
import { inBounds } from "./grid";

const grid = generateGrid<number>(3, 4, 0);

const testGrid = [
  ["c", ".", ".", ".", ".", "."],
  ["#", ".", "#", ".", "A", "."],
  ["#", ".", "#", "#", "#", "b"],
  ["#", ".", ".", "@", "#", "#"],
  [".", "B", "#", ".", ".", "."],
  [".", ".", ".", "C", "#", "a"]
];

grid[1][0] = 1;
grid[1][1] = 1;
grid[1][2] = 1;

export const getNeighbors = (coord: Coord): Coord[] => {
  const [i, j] = coord;
  return [
    [i, j - 1], // Left
    [i, j + 1], // Right
    [i - 1, j], // Up
    [i + 1, j] // Down
  ];
};

export const isBlocked = (blocked: number[]) => (
  coord: Coord,
  grid: Grid<number>
): boolean => {
  const [i, j] = coord;
  return blocked.includes(grid[i][j]);
};

export const isBlockedRegex = (blocked: string[], regex: RegExp) => (
  coord: Coord,
  grid: Grid<string>
): boolean => {
  const [i, j] = coord;
  return !!blocked.find(block => regex.test(grid[i][j]));
};

function bfs(
  grid: Grid<number>,
  startCoord: Coord,
  targetCoord: Coord,
  block: number[]
): number {
  const getBlocked = isBlocked(block);

  if (getBlocked(startCoord, grid) || getBlocked(targetCoord, grid)) {
    throw new Error("Starting or target coordinate not valid");
  }
  const visited = {};
  const queue = [{ coord: startCoord, steps: 0 }];

  while (queue.length) {
    const current = queue.pop();
    visited[`${current.coord[0]}:${current.coord[1]}`] = true;

    if (
      current.coord[0] === targetCoord[0] &&
      current.coord[1] === targetCoord[1]
    ) {
      return current.steps;
    }

    const neighbors = getNeighbors(current.coord);

    for (let i = 0; i < neighbors.length; ++i) {
      const neighbor = neighbors[i];

      if (
        inBounds(neighbor, grid) &&
        !visited[`${neighbor[0]}:${neighbor[1]}`] &&
        !getBlocked(neighbor, grid)
      ) {
        queue.unshift({ coord: neighbor, steps: current.steps + 1 });
      }
    }
  }
}

// bfs(grid, [0, 0], [2, 1], [1]);
