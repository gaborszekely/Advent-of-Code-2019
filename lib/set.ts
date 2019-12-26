export const cloneSet = <T>(set: Set<T>): Set<T> => {
  return new Set<T>(Array.from(set));
};
