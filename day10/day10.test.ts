import { assert } from "../lib";
import { partOneSolution, partTwoSolution } from "./day10";

/*
 * Part One Test Cases
 */

const test1 = `.#..#
.....
#####
....#
...##`;

const [maxSeen1, test1Solution] = partOneSolution(test1);
assert(maxSeen1, 8);
assert(test1Solution.join(","), "4,3");

const test2 = `......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`;
const [maxSeen2, test2Solution] = partOneSolution(test2);
assert(maxSeen2, 33);
assert(test2Solution.join(","), "8,5");

const test3 = `#.#...#.#.
.###....#.
.#....#...
##.#.#.#.#
....#.#.#.
.##..###.#
..#...##..
..##....##
......#...
.####.###.`;

const [maxSeen3, test3Solution] = partOneSolution(test3);
assert(maxSeen3, 35);
assert(test3Solution.join(","), "2,1");

const test4 = `.#..#..###
####.###.#
....###.#.
..###.##.#
##.##.#.#.
....###..#
..#.#..#.#
#..#.#.###
.##...##.#
.....#.#..`;

const [maxSeen4, test4Solution] = partOneSolution(test4);
assert(maxSeen4, 41);
assert(test4Solution.join(","), "3,6");

const test5 = `.#..##.###...#######
##.############..##.
.#.######.########.#
.###.#######.####.#.
#####.##.#.##.###.##
..#####..#.#########
####################
#.####....###.#.#.##
##.#################
#####.##.###..####..
..######..##.#######
####.##.####...##..#
.#####..#.######.###
##...#.##########...
#.##########.#######
.####.#.###.###.#.##
....##.##.###..#####
.#.#.###########.###
#.#.#.#####.####.###
###.##.####.##.#..##
`;

const [maxSeen5, test5Solution] = partOneSolution(test5);
assert(maxSeen5, 227);
assert(test5Solution.join(","), "13,11");

/*
 * Part Two Test Cases
 */

const test6 = `.#..#
.....
#####
....#
...##`;

const test6Solution = partTwoSolution(test6, 8);
assert(test6Solution.join(","), "2,2");
