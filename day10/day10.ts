const fs = require("fs");

enum DirectionEnum {
  FORWARD = "forward",
  BACKWARD = "backward",
}

interface Asteroid {
  offset: number;
  coords: [number, number];
  quadrant: number;
  iteration: number;
}

type Coord = [number, number];

export function partOneSolution(input: string): [number, Coord] {
  const inputArr = input.split("\n").map((i: string) => i.split(""));
  const row = inputArr.length;
  const col = inputArr[0].length;

  let maxSeen = 0;
  let targetAsteroid: [number, number];

  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      if (inputArr[i][j] === ".") continue;
      const [totalSeen] = findAsteroidsSeen(i, j, inputArr);
      if(totalSeen > maxSeen) {
        maxSeen = totalSeen;
        targetAsteroid = [i, j];
      }
    }
  }

  return [maxSeen, targetAsteroid];
}

export function partTwoSolution(input: string, n: number): Coord {
  const inputArr = input.split("\n").map((i: string) => i.split(""));
  const [, [targetI, targetJ]] = partOneSolution(input);
  let totalAsteroids = findTotalAsteroids(targetI, targetJ, inputArr);
  let results = [];
  let iteration: number = 0;

  while(totalAsteroids > 0) {
    const [totalSeen, asteroidsSeen] = findAsteroidsSeen(targetI, targetJ, inputArr, true, ++iteration);
    totalAsteroids -= totalSeen;
    results = [...results, ...asteroidsSeen];
  }

  console.log(results.length)
  return results.sort(laserSort)[n - 1];
}

function laserSort(a: Asteroid, b: Asteroid) {
  if(a.iteration < b.iteration) return -1;
  if(a.iteration > b.iteration) return 1;
  if(a.quadrant > b.quadrant) return -1;
  if(a.quadrant < b.quadrant) return 1;
  if(a.offset > b.offset) return -1;
  if(a.offset < b.offset) return 1;
  return 0;
}

function findTotalAsteroids(asteroidI: number, asteroidJ: number, input: string[][]): number {
  let total = 0;
  for(let i = 0; i < input.length; i++) {
    for(let j = 0; j < input[i].length; j++) {
      if(input[i][j] === "#" && i !== asteroidI && j !== asteroidJ) {
        total += 1;
      }
    }
  }
  return total;
}

export function findAsteroidsSeen(i: number, j: number, inputArr: string[][], mutate = false, iteration?: number): [number, Asteroid[]] {
  let totalSeen = 0;
  const row = inputArr.length;
  const col = inputArr[0].length;
  const asteroidsSeen: Asteroid[] = [];
  
  // Traverse forward
  const inSightForward: number[] = [];
  for (let k = i; k < row; k++) {
    for (let l = 0; l < col; l++) {
      if (k === i && l <= j) continue;
      const current = inputArr[k][l];
      if (current === ".") continue;
      if (!isBlocked(k, l, i, j, inSightForward)) {
        if(mutate) {
          inputArr[k][l] = ".";
        }
        const [offset, quadrant] = findOffsetAngle(k, l, i, j);
        inSightForward.push(offset);
        asteroidsSeen.push({
          offset,
          quadrant,
          iteration,
          coords: [k, l]
        });
        totalSeen += 1;
      }
    }
  }

  // Traverse forward
  const inSightBackward: number[] = [];
  for (let k = i; k >= 0; k--) {
    for (let l = col - 1; l >= 0; l--) {
      if (k === i && l >= j) continue;
      const current = inputArr[k][l];
      if (current === ".") continue;
      if (!isBlocked(k, l, i, j, inSightBackward)) {
        if(mutate) {
          inputArr[k][l] = ".";
        }
        const [offset, quadrant] = findOffsetAngle(k, l, i, j);
        inSightBackward.push(offset);
        asteroidsSeen.push({
          offset,
          quadrant,
          iteration,
          coords: [k, l]
        });
        totalSeen += 1;
      }
    }
  }

  return [totalSeen, asteroidsSeen];
}

function findOffsetAngle(k: number, l: number, i: number, j: number): [number, number] {
  const rise = k - i;
  const run = l - j;
  const quadrant = findQuadrant(rise, run)
  let offset: number;
  if (run === 0) {
    offset = rise > 0 ? Infinity : -Infinity;
  } else {
    offset = rise / run;
  }
  return [offset, quadrant];
}

function findQuadrant(rise: number, run: number): number {
  if(run > 0) {
    return rise < 0 ? 1 : 2;
  }

  return rise > 0 ? 3 : 4;
}

function isBlocked(targetI: number, targetJ: number, stationI: number, stationJ: number, inSight: number[]): boolean {
  const [offset] = findOffsetAngle(targetI, targetJ, stationI, stationJ);
  return inSight.includes(offset);
}

const input = fs.readFileSync(__dirname + "/input.txt").toString();

const [maxSeen, targetAsteroid] = partOneSolution(input);

console.log(maxSeen);

const res = partTwoSolution(input, 200);
console.log(res)
