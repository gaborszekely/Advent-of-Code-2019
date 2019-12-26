import { Coord } from "../types/coord";

/**
 * Enums / Interfaces
 */

export type MazeGrid = string[][];
export type PossiblePaths = Map<Set<string>, ItemDistance[]>;

export interface Keys {
  [key: string]: boolean;
}

export interface Doors {
  [door: string]: Coord;
}

export interface ItemDistance {
  coords: Coord;
  steps?: number;
}

export interface KeyTarget extends ItemDistance {
  name: string;
}

export interface KeyMemo {
  [key: string]: number;
}

export const enum MazeItem {
  WALL = "#",
  START = "@",
  OPEN = "."
}

export interface KeyLocations {
  [key: string]: KeyTarget;
}
