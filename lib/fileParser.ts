const fs = require("fs");

export function parseFile(
  rootDir: string,
  inputFileName = "input.txt"
): string {
  return fs.readFileSync(`${rootDir}/${inputFileName}`).toString();
}
