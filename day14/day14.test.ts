import { assert } from "../lib";
import { partOneSolution } from "./day14";

const test1Input = `10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL`;

const test2Input = `9 ORE => 2 A
8 ORE => 3 B
7 ORE => 5 C
3 A, 4 B => 1 AB
5 B, 7 C => 1 BC
4 C, 1 A => 1 CA
2 AB, 3 BC, 4 CA => 1 FUEL`;

const test3Input = `157 ORE => 5 Banana
165 ORE => 6 Dough
165 ORE => 2 Grapefruit
179 ORE => 7 Porkchops
177 ORE => 5 Honey
12 Honey, 1 Grapefruit, 8 Porkchops => 9 Quart
7 Dough, 7 Porkchops => 2 Jolly
3 Dough, 7 Banana, 5 Honey, 10 Porkchops => 8 Cheese
44 Jolly, 5 Cheese, 1 Quart, 29 Banana, 9 Grapefruit, 48 Honey => 1 FUEL`;

const test4Input = `139 ORE => 4 Apple
144 ORE => 7 Banana
145 ORE => 6 Cake
176 ORE => 6 Cream
2 Cheese, 7 Corn, 2 Chips, 11 Cake => 1 Sandwhich
17 Apple, 3 Banana => 8 Cheese
22 Cream, 37 Cake => 5 Corn
5 Cake, 7 Doritos, 2 Corn, 2 Cheese, 19 Chips => 3 Taco
5 Cream, 7 Cake, 9 Cheese, 37 Chips => 6 Steak
1 Apple => 8 Chips
1 Cream, 6 Cake => 4 Doritos
53 Sandwhich, 6 Cake, 46 Cream, 81 Taco, 68 Chips, 25 Steak => 1 FUEL`;
/*
1 Fuel:
  25 STEAK  (Need 1 Steak):
     - 20 Cream
     - 28 Cake
     - 36 Cheese
     - 148 Chips

  68 Chips (need 1 chip)
     - 8 Apple
  
  81 Taco (good)
     - 
*/

// const test4Input = `139 ORE => 4 NVRVD
// 144 ORE => 7 JNWZP
// 145 ORE => 6 MNCFX
// 176 ORE => 6 VJHF
// 2 VPVL, 7 FWMGM, 2 CXFTF, 11 MNCFX => 1 STKFG
// 17 NVRVD, 3 JNWZP => 8 VPVL
// 22 VJHF, 37 MNCFX => 5 FWMGM
// 5 MNCFX, 7 RFSQX, 2 FWMGM, 2 VPVL, 19 CXFTF => 3 HVMC
// 5 VJHF, 7 MNCFX, 9 VPVL, 37 CXFTF => 6 GNMV
// 1 NVRVD => 8 CXFTF
// 1 VJHF, 6 MNCFX => 4 RFSQX
// 53 STKFG, 6 MNCFX, 46 VJHF, 81 HVMC, 68 CXFTF, 25 GNMV => 1 FUEL`;

const test5Input = `171 ORE => 8 CNZTR
7 ZLQW, 3 BMBT, 9 XCVML, 26 XMNCP, 1 WPTQ, 2 MZWV, 1 RJRHP => 4 PLWSL
114 ORE => 4 BHXH
14 VRPVC => 6 BMBT
6 BHXH, 18 KTJDG, 12 WPTQ, 7 PLWSL, 31 FHTLT, 37 ZDVW => 1 FUEL
6 WPTQ, 2 BMBT, 8 ZLQW, 18 KTJDG, 1 XMNCP, 6 MZWV, 1 RJRHP => 6 FHTLT
15 XDBXC, 2 LTCX, 1 VRPVC => 6 ZLQW
13 WPTQ, 10 LTCX, 3 RJRHP, 14 XMNCP, 2 MZWV, 1 ZLQW => 1 ZDVW
5 BMBT => 4 WPTQ
189 ORE => 9 KTJDG
1 MZWV, 17 XDBXC, 3 XCVML => 2 XMNCP
12 VRPVC, 27 CNZTR => 2 XDBXC
15 KTJDG, 12 BHXH => 5 XCVML
3 BHXH, 2 VRPVC => 7 MZWV
121 ORE => 7 VRPVC
7 XCVML => 6 RJRHP
5 BHXH, 4 VRPVC => 5 LTCX`;

assert(partOneSolution(test1Input), 31);
assert(partOneSolution(test2Input), 165);
assert(partOneSolution(test3Input), 13312);
console.log(partOneSolution(test4Input));
console.log(partOneSolution(test5Input));
// assert(partOneSolution(test4Input), 180697);
// assert(partOneSolution(test5Input), 2210736);
