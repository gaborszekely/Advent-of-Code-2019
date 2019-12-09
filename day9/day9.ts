import { IntCodeComputerV2, assert } from "../lib";

const fs = require("fs");
const input = fs.readFileSync(__dirname + "/input.txt").toString().split(",");

function partOneSolution(input: string[]) {
  const intCode = new IntCodeComputerV2(input);
  return intCode.enqueueInput(1).execute();
}

function partTwoSolution() {}


var res = partOneSolution(input);
console.log(res)


// const input1 = ["104","1125899906842624","99"];
// assert(partOneSolution(input1), "1125899906842624");

// const input2 = ["109","1","204","-1","1001","100","1","100","1008","100","16","101","1006","101","0","99"];
// const test2 = partOneSolution(input2);
// console.log(test2)

// var input3 = ["1102","34915192","34915192","7","4","7","99","0"];
// assert(partOneSolution(input3).length, 16)