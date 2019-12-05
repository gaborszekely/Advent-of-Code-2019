

function partOneSolution(start, end) {
  let solutions = 0;
  for(let i = start; i <= end; i++) {
    if(meetsReq(i)) {
      solutions++;
    }
  }
  return solutions;
}

function meetsReq(num) {
  const strI = num.toString();

  // check sort
  if(strI.split("").sort().join("") !== strI) return false;

  // check repeat
  let repeat = false;
  for(let i = 1; i < strI.length; i++) {
    if(strI[i] === strI[i - 1]) {
      repeat = true;
      break;
    }
  }
  if(!repeat) return false;
  return true;
}


const res = partOneSolution(240920, 789857);
console.log(res)