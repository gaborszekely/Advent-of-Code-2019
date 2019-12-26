const testGrid = [
  ["c", ".", ".", ".", ".", "."],
  ["#", ".", "#", ".", "A", "."],
  ["#", ".", "#", "#", "#", "b"],
  ["#", ".", ".", "@", "#", "#"],
  [".", "B", "#", ".", ".", "."],
  [".", ".", ".", "C", "#", "a"]
];

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
  const visited = { [`${startCoord[0]}:${startCoord[1]}`]: true };
  const queue = [{ coord: startCoord, steps: 0 }];

  while (true) {
    const current = queue.pop();
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
        visited[`${neighbor[0]}:${neighbor[1]}`] = true;
        queue.unshift({ coord: neighbor, steps: current.steps + 1 });
      }
    }
  }
}
