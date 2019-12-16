import { Coord } from "../types/coord";

export function fill<T>(
  grid: T[][],
  newCoord: Coord,
  value: T,
  defaultVal: T = null
): Coord {
  const [i, j] = newCoord;

  if (inBounds(i, grid.length) && inBounds(j, grid[i].length)) {
    grid[i][j] = value;
    return [i, j];
  }

  const [iOffset, jOffset] = findOutOfBoundsOffsets<T>(i, j, grid);

  if (iOffset !== 0) {
    for (let i = 0; i < Math.abs(iOffset); i++) {
      if (iOffset < 0) {
        grid.unshift(new Array(grid[0].length).fill(defaultVal));
      } else {
        grid.push(new Array(grid[0].length).fill(defaultVal));
      }
    }
  }

  if (jOffset !== 0) {
    for (let i = 0; i < Math.abs(jOffset); i++) {
      if (jOffset < 0) {
        grid.map(row => row.unshift(defaultVal));
      } else {
        grid.map(row => row.push(defaultVal));
      }
    }
  }

  if (i < 0 && j < 0) {
    grid[0][0] = value;
    return [0, 0];
  }

  if (i < 0) {
    grid[0][j] = value;
    return [0, j];
  }

  if (j < 0) {
    grid[i][0] = value;
    return [i, 0];
  }

  grid[i][j] = value;
  return [i, j];
}

export function inBounds(i: number, length: number): boolean {
  return i >= 0 && i < length;
}

function findOutOfBoundsOffsets<T>(i: number, j: number, grid: T[][]): Coord {
  let iOffset = 0;
  let jOffset = 0;
  // Check i
  if (!inBounds(i, grid.length)) {
    iOffset = i < 0 ? i : i - (grid.length - 1);
  }
  // Check j
  if (!inBounds(j, grid[0].length)) {
    jOffset = j < 0 ? j : j - (grid[0].length - 1);
  }
  return [iOffset, jOffset];
}
