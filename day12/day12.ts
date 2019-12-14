const fs = require("fs");

function parseInput(input: string): number[][] {
  return input
    .split("\n")
    .map(i => i.slice(1, -1))
    .map(i =>
      i
        .replace(/\w=/g, "")
        .split(", ")
        .map(i => Number(i))
    );
}

function partOneSolution(input: string, steps: number) {
  const moonCoords = parseInput(input);
  const moons = moonCoords.map(coords => new Moon(coords));
  const gravityField = new GravityField(moons);

  for (let i = 0; i < steps; i++) {
    gravityField.step();
  }

  return gravityField.totalEnergy;
}

class Moon {
  public velocity = [0, 0, 0];
  constructor(public coords: number[]) {}

  public get totalEnergy() {
    const potential = this.coords.reduce(
      (acc, coord) => acc + Math.abs(coord),
      0
    );
    const kinetic = this.velocity.reduce(
      (acc, velocity) => acc + Math.abs(velocity),
      0
    );
    return potential * kinetic;
  }

  public updateCoords() {
    this.coords.forEach((_, i) => {
      this.coords[i] += this.velocity[i];
    });
  }
}

class GravityField {
  constructor(private moons: Moon[]) {}

  public step() {
    this.updateVelocities();
    this.updatePositions();
  }

  public get totalEnergy() {
    return this.moons.reduce((acc, moon) => acc + moon.totalEnergy, 0);
  }

  private updateVelocities() {
    this.moons.forEach((moon1, i) => {
      this.moons.forEach((moon2, j) => {
        if (i === j) return;
        moon1.coords.forEach((coord, k) => {
          moon1.velocity[k] +=
            coord < moon2.coords[k] ? 1 : coord > moon2.coords[k] ? -1 : 0;
        });
      });
    });
  }

  private updatePositions() {
    this.moons.forEach(moon => moon.updateCoords());
  }
}

const input = fs.readFileSync(__dirname + "/input.txt").toString();
const testInput = fs.readFileSync(__dirname + "/input-test.txt").toString();

console.log(partOneSolution(input, 1000));
