import { Coord } from "../types/coord";
import { getNeighbors } from "../lib/dfs";
import { inBounds } from "../lib/grid";
import {
  ItemDistance,
  MazeGrid,
  MazeItem,
  KeyTarget,
  PossiblePaths
} from "./types";
import { cloneSet } from "../lib/set";
import { sleep } from "../lib/sleep";
import { findSubsets, findSubsetsSet } from "../lib/subsets";

/*
{
  a: {
    []: [{ key: b, steps: 12}, ...],
    [b]: [{ key: c, steps: 9}, ...],
    [c]: [{ key: d, steps: 19}, ...],
    [b, c]: [{ key: f, steps: 3}, ...],
    ...
  }
}
*/

export class Maze {
  private maze: string[][];
  private startCoords: Coord;
  private keyLocations: KeyTarget[];
  private possiblePaths = new Map<Set<string>, ItemDistance[]>();

  static keyRegex = /[a-z]/;
  static doorRegex = /[A-Z]/;

  constructor(input: string) {
    [this.maze, this.startCoords, this.keyLocations] = this.parseMaze(input);
  }

  // public collectKeys(
  //   startCoords = this.startCoords,
  //   openedDoors = new Set<string>(),
  //   // remainingKeys = cloneSet(this.remainingKeys),
  //   memo = {}
  // ): number {
  //   if (remainingKeys.size === 0) {
  //     return 0;
  //   }

  //   const keys = this.findNeighborKeys(startCoords, openedDoors, remainingKeys);

  //   let minSteps: number;

  //   for (let key of keys) {
  //     const newRemainingKeys = cloneSet(remainingKeys);
  //     newRemainingKeys.delete(key.name);

  //     const newOpenedDoors = cloneSet(openedDoors);
  //     newOpenedDoors.add(key.name.toUpperCase());

  //     const steps =
  //       key.steps +
  //       this.collectKeys(key.coords, newOpenedDoors, newRemainingKeys);

  //     if (minSteps == null || steps < minSteps) {
  //       minSteps = steps;
  //     }
  //   }

  //   return minSteps || 0;
  // }

  private findAllPaths(): PossiblePaths {
    // Loop through all keys
    for (let keyLocation of this.keyLocations) {
      // Get remaining keys
      const remainingKeys = this.keyLocations
        .filter(key => key.name !== keyLocation.name)
        .map(key => key.name.toUpperCase());

      console.log(remainingKeys);

      // Find all permutations of remaining keys
      // const keySubsets = findSubsetsSet(remainingKeys);
      // console.log(keySubsets.length);
    }
    return null;
  }

  private findNeighborKeys(
    startingCoords: Coord,
    openedDoors: Set<string>,
    remainingKeys: Set<string>
  ): KeyTarget[] {
    if (this.isBlocked(startingCoords, openedDoors)) {
      throw new Error("Starting or target coordinate not valid");
    }

    const keyTargets: KeyTarget[] = [];
    const visited = {};
    const queue: ItemDistance[] = [{ coords: startingCoords, steps: 0 }];
    const foundKeys = new Set<string>();

    while (queue.length) {
      const current = queue.pop();
      visited[`${current.coords[0]}:${current.coords[1]}`] = true;
      const item = this.getItem(current.coords);

      if (
        this.isUnclaimedKey(current.coords, openedDoors) &&
        !foundKeys.has(item)
      ) {
        keyTargets.push({ ...current, name: item });
        foundKeys.add(item);
        continue;
      }

      const neighbors = getNeighbors(current.coords);

      for (let i = 0; i < neighbors.length; ++i) {
        const neighbor = neighbors[i];

        if (
          inBounds(neighbor, this.maze) &&
          !visited[`${neighbor[0]}:${neighbor[1]}`] &&
          !this.isBlocked(neighbor, openedDoors)
        ) {
          queue.unshift({ coords: neighbor, steps: current.steps + 1 });
        }
      }
    }

    return keyTargets;
  }

  private isBlocked(coord: Coord, openedDoors: Set<string>): boolean {
    const item = this.getItem(coord);
    const isWall = item === MazeItem.WALL;
    const isClosedDoor = Maze.doorRegex.test(item) && !openedDoors.has(item);
    return isWall || isClosedDoor;
  }

  private isUnclaimedKey(coord: Coord, openedDoors: Set<string>): boolean {
    const item = this.getItem(coord);
    return Maze.keyRegex.test(item) && !openedDoors.has(item.toUpperCase());
  }

  private getItem(coord: Coord): string {
    const [i, j] = coord;
    return this.maze[i][j];
  }

  private parseMaze(input: string): [MazeGrid, Coord, KeyTarget[]] {
    let startIndex = null;
    const keys: KeyTarget[] = [];
    const maze: MazeGrid = input.split("\n").map((row, rowIndex) => {
      const rowAry = [];
      for (let i = 0; i < row.length; ++i) {
        const char = row[i];
        if (char === "@") {
          startIndex = [rowIndex, i];
        }
        if (/[a-z]/.test(char)) {
          keys.push({ name: char, coords: [rowIndex, i] });
        }
        rowAry.push(char);
      }
      return rowAry;
    });
    return [maze, startIndex, keys];
  }
}

// const testGrid = [
//   ["c", ".", ".", ".", ".", "."],
//   ["#", ".", ".", ".", "A", "."],
//   ["#", ".", "#", ".", "#", "b"],
//   ["#", ".", ".", "@", "#", "#"],
//   [".", "B", "#", ".", ".", "."],
//   [".", ".", ".", "C", "#", "a"]
// ];

// const maze = new Maze(testGrid.map(row => row.join("")).join("\n"));

// maze.collectKeys();
