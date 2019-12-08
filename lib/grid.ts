export const generateGrid = <T>(i: number, j: number, defaultVal = null): T[][] => {
  return Array.from(
    { length: i },
    () => Array.from(
      { length: j },
      () => defaultVal
    ))
    ;
};

export const inBounds = (i: number, j: number, grid: any[][]): boolean => {
  return i >= 0 && i < grid.length && j >= 0 && j < grid[i].length;
};
