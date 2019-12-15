import { parseFile } from "../lib/fileParser";

const input = parseFile(__dirname);

export function partOneSolution(nanoFactory: string): number {
  const nanoFactoryMap = parseNanoFactory(nanoFactory);
  const fuelInfo = nanoFactoryMap[Chemicals.FUEL];
  const baseIngredientsNeeded = getBaseIngredientsNeeded(
    fuelInfo,
    nanoFactoryMap
  );
  return calculateMinimumOre(baseIngredientsNeeded, nanoFactoryMap);
}

// export function partOneSolution(nanoFactory: string): number {
//   const nanoFactoryMap = parseNanoFactory(nanoFactory);
//   const fuelInfo = nanoFactoryMap[Chemicals.FUEL];

//   let leftoverIngredients = {};
//   const ingredients = findBaseIngredients(
//     fuelInfo,
//     nanoFactoryMap,
//     leftoverIngredients
//   );
//   console.log(leftoverIngredients);

//   for (let key in ingredients) {
//     ingredients[key] -= leftoverIngredients[key] || 0;
//   }

//   return calculateMinimumOre(ingredients, nanoFactoryMap);
// }

export function partTwoSolution() {}

/**
 * Helper methods
 */

const test2Input = `9 ORE => 2 A
8 ORE => 3 B
7 ORE => 5 C
3 A, 4 B => 1 AB
5 B, 7 C => 1 BC
4 C, 1 A => 1 CA
2 AB, 3 BC, 4 CA => 1 FUEL`;

function findBaseIngredients(
  targetChemical: ChemicalInfo,
  nanoFactoryMap: NanoFactory,
  leftoverIngredients: IngredientAmounts
) {
  if (targetChemical.isBaseIngredient) {
    return {
      [targetChemical.name]: 1
    };
  }

  let result = {};

  for (let ingredient in targetChemical.ingredients) {
    // Initialize leftover amount to zero
    if (leftoverIngredients[ingredient] == null) {
      leftoverIngredients[ingredient] = 0;
    }

    // Amount of ingredient needed for target chemical
    const amountNeeded = targetChemical.ingredients[ingredient];
    const ingredientInfo = nanoFactoryMap[ingredient];

    const multiplierNeeded = Math.ceil(
      amountNeeded /
        (ingredientInfo.isBaseIngredient ? 1 : ingredientInfo.quantity)
    );

    const multiplierNeeded2 = Math.ceil(amountNeeded / ingredientInfo.quantity);

    const leftover = multiplierNeeded2 * ingredientInfo.quantity - amountNeeded;

    leftoverIngredients[ingredient] =
      (leftoverIngredients[ingredient] || 0) + leftover;

    const baseIngredientsNeeded = findBaseIngredients(
      ingredientInfo,
      nanoFactoryMap,
      leftoverIngredients
    );

    // Multiply by total of current chemicals needed
    for (let key in baseIngredientsNeeded) {
      baseIngredientsNeeded[key] =
        baseIngredientsNeeded[key] * multiplierNeeded;
    }

    result = mergeValues(result, baseIngredientsNeeded);
  }
  return result;
}

function getBaseIngredientsNeeded(
  targetChemical: ChemicalInfo,
  nanoFactoryMap: NanoFactory
) {
  if (targetChemical.isBaseIngredient) {
    return {
      [targetChemical.name]: 1
    };
  }

  let result = {};

  // Not a base ingredient
  for (let ingredient in targetChemical.ingredients) {
    const ingredientInfo = nanoFactoryMap[ingredient];
    // Amount Needed
    const ingredientQuantity = targetChemical.ingredients[ingredient];

    const multiplierNeeded = Math.ceil(
      ingredientQuantity /
        (ingredientInfo.isBaseIngredient ? 1 : ingredientInfo.quantity)
    );

    const baseIngredientsNeeded = getBaseIngredientsNeeded(
      ingredientInfo,
      nanoFactoryMap
    );

    // Multiply by total of current chemicals needed
    for (let key in baseIngredientsNeeded) {
      baseIngredientsNeeded[key] =
        baseIngredientsNeeded[key] * multiplierNeeded;
    }

    result = mergeValues(result, baseIngredientsNeeded);
  }

  return result;
}

function calculateMinimumOre(
  baseIngredients: IngredientAmounts,
  nanoFactoryMap: NanoFactory
): number {
  let totalOre = 0;

  for (let ingredient in baseIngredients) {
    let totalBase = 0;
    const quantityNeeded = baseIngredients[ingredient];
    const ingredientInfo = nanoFactoryMap[ingredient];

    while (totalBase < quantityNeeded) {
      totalBase += ingredientInfo.quantity;
      totalOre += ingredientInfo.ingredients[Chemicals.ORE];
    }
  }

  return totalOre;
}

function mergeValues(obj1: Object, obj2: Object): Object {
  const result = { ...obj1 };
  for (let key in obj2) {
    result[key] = obj2[key] + (result[key] || 0);
  }
  return result;
}

function parseNanoFactory(nanoFactory: string): NanoFactory {
  let rows: any[] = nanoFactory
    .split("\n")
    .map(row => row.split(" => "))
    .map(([ingredients, outcome]) => {
      const [quantity, outcomeChemical] = outcome.split(" ");
      return [
        {
          chemical: outcomeChemical,
          quantity: Number(quantity)
        },
        ingredients.split(", ").map(
          (ingredient): IngredientAmounts => {
            const [quantity, chemical] = ingredient.split(" ");
            return { [chemical]: Number(quantity) };
          }
        )
      ];
    });

  const factoryMap: NanoFactory = rows.reduce((acc, [outcome, ingredients]) => {
    acc[outcome.chemical] = {
      name: outcome.chemical,
      quantity: outcome.quantity,
      ingredients: ingredients.reduce(
        (obj: IngredientAmounts, ingredient: IngredientAmounts) => ({
          ...obj,
          ...ingredient
        })
      ),
      isBaseIngredient: ingredients.every((ingredient: IngredientAmounts) => {
        const keys = Object.keys(ingredient);
        return keys.length === 1 && keys[0] === Chemicals.ORE;
      })
    };
    return acc;
  }, {});

  // for (let ingredient in factoryMap) {
  //   const depth = findDepth(factoryMap[ingredient], factoryMap);
  //   factoryMap[ingredient].offset = depth;
  // }

  return factoryMap;
}

/**
 * Interfaces
 */

interface NanoFactory {
  [chemical: string]: ChemicalInfo;
}

interface ChemicalInfo {
  name: string;
  quantity: number;
  ingredients: IngredientAmounts;
  offset: number;
  isBaseIngredient: boolean;
}

interface IngredientAmounts {
  [ingredient: string]: number;
}

enum Chemicals {
  ORE = "ORE",
  FUEL = "FUEL"
}

/*
Example:
{
  FUEL: [
    {
      quantity: 1,
      ingredients: {
        A: 7,
        B: 1
      }
    }
  ]
}
*/

const test1Input = `10 ORE => 10 A
1 ORE => 1 B
7 A, 1 B => 1 C
7 A, 1 C => 1 D
7 A, 1 D => 1 E
7 A, 1 E => 1 FUEL`;

const test3Input = `157 ORE => 5 NZVS
165 ORE => 6 DCFZ
179 ORE => 7 PSHF
177 ORE => 5 HKGWZ
165 ORE => 2 GPVTF
12 HKGWZ, 1 GPVTF, 8 PSHF => 9 QDVJ
7 DCFZ, 7 PSHF => 2 XJWVT
3 DCFZ, 7 NZVS, 5 HKGWZ, 10 PSHF => 8 KHKGT
44 XJWVT, 5 KHKGT, 1 QDVJ, 29 NZVS, 9 GPVTF, 48 HKGWZ => 1 FUEL`;

var res = partOneSolution(test1Input);
console.log(res);
