import { assert } from "../lib";
import { partOneSolution } from "./day18";

// /**
//  * Test #1
//  */
const test1Input = `#########
#b.A.@.a#
#########`;

// console.log(partOneSolution(test1Input));
// assert(partOneSolution(test1Input), 8);

// /**
//  * Test #2
//  */

const test2Input = `########################
#f.D.E.e.C.b.A.@.a.B.c.#
######################.#
#d.....................#
########################`;

// assert(partOneSolution(test2Input), 86);

// /**
//  * Test #3
//  */

const test3Input = `########################
#...............b.C.D.f#
#.######################
#.....@.a.B.c.d.A.e.F.g#
########################`;

// assert(partOneSolution(test3Input), 132);

/**
 * Test #4
 */

const test4Input = `#################
#i.G..c...e..H.p#
########.########
#j.A..b...f..D.o#
########@########
#k.E..a...g..B.n#
########.########
#l.F..d...h..C.m#
#################`;

console.log(partOneSolution(test4Input));

// assert(partOneSolution(test4Input), 136);

// /**
//  * Test #5
//  */

const test5Input = `########################
#@..............ac.GI.b#
###d#e#f################
###A#B#C################
###g#h#i################
########################`;

// assert(partOneSolution(test5Input), 81);
