import { parseFile } from "../lib/fileParser";
import { Maze } from "./maze";

/**
 * Solutions
 */

export function partOneSolution(input: string): number {
  const maze = new Maze(input);
  maze["findAllPaths"]();
  // return maze.collectKeys();
  return 1;
}

/**
 * Get Solution
 */
const input = parseFile(__dirname, "input.txt");
partOneSolution(input);
