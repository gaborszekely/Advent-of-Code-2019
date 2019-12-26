import { Coord } from "../types/coord";

export const generateGrid = <T>(
  i: number,
  j: number,
  defaultVal = null
): T[][] => {
  return Array.from({ length: i }, () =>
    Array.from({ length: j }, () => defaultVal)
  );
};

export const inBounds = (coord: Coord, grid: any[][]): boolean => {
  const [i, j] = coord;
  return i >= 0 && i < grid.length && j >= 0 && j < grid[i].length;
};
