import { Coord } from "../types/coord";
import { assert } from ".";

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

export class GridString {
  constructor(public grid: string = "") {}

  static create(rows: number, cols: number, defaultVal = "."): GridString {
    let grid = "";

    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        grid += defaultVal;
      }

      if (i < rows - 1) {
        grid += "\n";
      }
    }

    return new GridString(grid);
  }

  get(row: number, col: number): string {
    let currRow = 0;
    let currCol = 0;

    for (let i = 0; i < this.grid.length; i++) {
      if (currRow === row && currCol === col) {
        return this.grid[i] !== "\n" ? this.grid[i] : null;
      }

      currCol++;

      if (this.grid[i] === "\n") {
        currRow += 1;
        currCol = 0;
      }
    }

    return null;
  }

  set(row: number, col: number, val: string): void {
    let currRow = 0;
    let currCol = 0;

    for (let i = 0; i < this.grid.length; i++) {
      if (currRow === row && currCol === col && this.grid[i] !== "\n") {
        this.grid =
          this.grid.substring(0, i) + val + this.grid.substring(i + 1);
        return;
      }

      currCol++;

      if (this.grid[i] === "\n") {
        currRow += 1;
        currCol = 0;
      }
    }

    return null;
  }

  forEach(callbackFunc: (val: string, row: number, col: number) => void) {
    let currRow = 0;
    let currCol = 0;

    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i] === "\n") {
        currRow += 1;
        currCol = 0;
        continue;
      }

      callbackFunc(this.grid[i], currRow, currCol);
      currCol++;
    }

    return null;
  }

  log(): void {
    console.log(this.grid);
  }
}

/**
 * Tests
 */
const inputText = `##.##
.#.##
##..#
#.#..
.###.`;
const grid = new GridString(inputText);

assert(grid.get(2, 1), "#");
assert(grid.get(2, 2), ".");
assert(grid.get(2, 5), null);
assert(grid.get(5, 1), null);

let res = "";
grid.forEach(val => (res += val));
assert(res, inputText.replace(/\n/g, ""));
