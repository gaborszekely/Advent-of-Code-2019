export function assert(result1: any, result2: any): void {
  if (result1 !== result2) {
    throw new Error("Assertions do not match");
  } else {
    console.log("Assertion passed.")
  }
}