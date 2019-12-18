import { parseFile } from "../lib/fileParser";

const input = parseFile(__dirname);

interface ChemicalsNeeded {
  [chemical: string]: number;
}

const quantityKey = Symbol();

const reactions = input
  .trim()
  .split("\n")
  .reduce((map, line) => {
    const [ingredientList, result] = line.split(" => ");
    const [quantity, chemical] = result.split(" ");
    map[chemical] = ingredientList.split(", ").reduce(
      (ingredientMap, combo) => {
        const [qty, chem] = combo.split(" ");
        ingredientMap[chem] = +qty;
        return ingredientMap;
      },
      { [quantityKey]: +quantity }
    );
    return map;
  }, {});

function getNeededOre(fuel) {
  let neededChemicals: ChemicalsNeeded = { FUEL: fuel };
  const reserves = {};
  while (
    Object.keys(neededChemicals).length !== 1 ||
    !("ORE" in neededChemicals)
  ) {
    const newNeededList: ChemicalsNeeded = {};

    for (const [chemical, quantity] of Object.entries(neededChemicals)) {
      if (chemical === "ORE") {
        newNeededList.ORE = (newNeededList.ORE || 0) + quantity;
        continue;
      }

      const reaction = reactions[chemical];
      const reactionQuantity = reaction[quantityKey];

      const reactionCount = Math.ceil(
        (quantity - (reserves[chemical] || 0)) / reactionQuantity
      );

      for (const [ingredient, amount] of Object.entries(reaction)) {
        newNeededList[ingredient] =
          (newNeededList[ingredient] || 0) + reactionCount * (amount as number);
      }

      reserves[chemical] =
        (reserves[chemical] || 0) +
        reactionCount * reactionQuantity -
        (quantity as number);
    }
    neededChemicals = newNeededList;
  }
  return neededChemicals.ORE;
}

const orePer1Fuel = getNeededOre(1);

console.log("Part 1:", orePer1Fuel);
