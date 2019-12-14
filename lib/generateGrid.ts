export const generateGrid = <T>(i: number, j: number, defaultVal: T): T[][] => {
  return Array.from({ length: i }, () =>
    Array.from({ length: j }, () => defaultVal)
  );
};
