// export const findSubsets = (nums: any): any[][] => {
//   const result = [[]];
//   for (let i = 0; i < nums.length; i++) {
//     const len = result.length;
//     for (let j = 0; j < len; j++) {
//       result.push([...result[j], nums[i]]);
//     }
//   }
//   return result;
// };

// export const findSubsetsSet = (nums: any): Set<any>[] => {
//   const result = [[]];
//   const resultSet = [];
//   for (let i = 0; i < nums.length; i++) {
//     const len = result.length;
//     for (let j = 0; j < len; j++) {
//       const iteration = [...result[j], nums[i]];
//       result.push(iteration);
//       resultSet.push(new Set(iteration));
//     }
//   }

//   return resultSet;
// };

export const findSubsets = (vals: string[]): string[] => {
  const result = [""];
  for (let i = 0; i < vals.length; i++) {
    const len = result.length;
    for (let j = 0; j < len; j++) {
      result.push(result[j] + vals[i]);
    }
  }
  return result;
};

// 33,554,432

// console.log(
//   findSubsets([
//     "F",
//     "A",
//     "J",
//     "V",
//     "T",
//     "I",
//     "X",
//     "P",
//     "R",
//     "Z",
//     "O",
//     "B",
//     "Y",
//     "L",
//     "G",
//     "H",
//     "W",
//     "D",
//     "M",
//     "K",
//     "U",
//     "N",
//     "S",
//     "Q",
//     "E"
//   ]).length
// );
