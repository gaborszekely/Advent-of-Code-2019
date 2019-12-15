import { assert } from "../lib";
import { parseFile } from "../lib/fileParser";

const input = parseFile(__dirname);

enum ColorEnums {
  BLACK = "0",
  WHITE = "1",
  TRANSPARENT = "2"
}

function partOneSolution(input: string, width: number, height: number): number {
  const layers = processInput(input, width, height);

  const targetLayerIndex = layers
    .map(layer => findTotalColors(layer, ColorEnums.BLACK))
    .map((total, index) => ({ total, index }))
    .sort((a, b) => a.total - b.total)[0].index;

  const targetLayer = layers[targetLayerIndex];

  const whites = findTotalColors(targetLayer, ColorEnums.WHITE);
  const transparents = findTotalColors(targetLayer, ColorEnums.TRANSPARENT);
  return whites * transparents;
}

function partTwoSolution(input: string, width: number, height: number): string {
  const layers = processInput(input, width, height);
  let result = "";
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      for (let layer of layers) {
        const currentPixel = layer[i][j];
        if (currentPixel !== ColorEnums.TRANSPARENT) {
          result += layer[i][j] === ColorEnums.BLACK ? " " : "\u2588";
          break;
        }
      }
    }
    result += "\n";
  }
  return result;
}

function processInput(
  input: string,
  width: number,
  height: number
): string[][][] {
  const layers = [];
  let currentLayer = [[]];

  for (let char of input) {
    const currentRow = currentLayer[currentLayer.length - 1];
    if (currentRow.length < width) {
      currentRow.push(char);
    } else if (currentLayer.length === height) {
      layers.push(currentLayer);
      currentLayer = [[char]];
    } else {
      currentLayer.push([char]);
    }
  }

  if (currentLayer.length === height) {
    layers.push(currentLayer);
  }

  return layers;
}

function findTotalColors(layer: string[][], target: string): number {
  let total = 0;
  layer.forEach(row => {
    row.forEach(val => {
      if (val === target) {
        total += 1;
      }
    });
  });
  return total;
}

const testInput = "123456789012";
assert(partOneSolution(testInput, 3, 2), 1);

const pt1Solution = partOneSolution(input, 25, 6);
console.log(pt1Solution);

const testData = "0222112222120000";
assert(partTwoSolution(testData, 2, 2), ` █\n█ \n`);

const pt2Solution = partTwoSolution(input, 25, 6);
console.log(pt2Solution);
