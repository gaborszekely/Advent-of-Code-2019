import { assert } from "../lib";
import { partOneSolution, findAsteroidsSeen } from "./day10";

const test1 = `.#..#
.....
#####
....#
...##`;


const test1Solution = partOneSolution(test1);
assert(findAsteroidsSeen(4, 3, test1.split('\n').map(i => i.split(''))), 8);
assert(test1Solution[0], 3);
assert(test1Solution[1], 4);

const test2 = `......#.#.
#..#.#....
..#######.
.#.#.###..
.#..#.....
..#....#.#
#..#....#.
.##.#..###
##...#..#.
.#....####`
const test2Solution = partOneSolution(test2);
assert(findAsteroidsSeen(8, 5, test2.split('\n').map(i => i.split(''))), 33)
assert(test2Solution[0], 5);
assert(test2Solution[1], 8);

const test3 = `#.#...#.#.
.###....#.
.#....#...
##.#.#.#.#
....#.#.#.
.##..###.#
..#...##..
..##....##
......#...
.####.###.`

const test3Solution = partOneSolution(test3);
assert(findAsteroidsSeen(2, 1, test3.split('\n').map(i => i.split(''))), 35)
assert(test3Solution[0], 1);
assert(test3Solution[1], 2);

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

const test4Solution = partOneSolution(test4);
assert(findAsteroidsSeen(3, 6, test4.split('\n').map(i => i.split(''))), 41)
assert(test4Solution[0], 6);
assert(test4Solution[1], 3);

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

const test5Solution = partOneSolution(test5);
assert(test5Solution[0], 11);
assert(test5Solution[1], 13);
