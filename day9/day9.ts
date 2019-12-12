import { IntCodeComputerV2, assert } from "../lib";

const fs = require("fs");
const input = fs
  .readFileSync(__dirname + "/input.txt")
  .toString()
  .split(",");

function partOneSolution(input: string[]) {
  return new IntCodeComputerV2(input).enqueueInput(1).execute();
}

function partTwoSolution(input: string[]) {
  return new IntCodeComputerV2(input).enqueueInput(2).execute();
}

console.log(partOneSolution(input)); //3280416268
console.log(partTwoSolution(input)); //80210

// TEST CASE #1
const input1 = [
  "109",
  "1",
  "204",
  "-1",
  "1001",
  "100",
  "1",
  "100",
  "1008",
  "100",
  "16",
  "101",
  "1006",
  "101",
  "0",
  "99"
];
const test1 = new IntCodeComputerV2(input1);
test1.enqueueInput(1).execute();
assert(test1.outputs.join(","), input1.join(","));

// TEST CASE #2
var input2 = ["1102", "34915192", "34915192", "7", "4", "7", "99", "0"];
assert(partOneSolution(input2).length, 16); // true

// TEST CASE #3
const input3 = ["104", "1125899906842624", "99"];
assert(partOneSolution(input3), "1125899906842624"); // true
