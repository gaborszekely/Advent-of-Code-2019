export function permutateRange(start: number, end: number): number[][] {
  const range = generateArray(1 + end - start).map((_, i) => start + i);
  return permutate<number>(range);
}

export function permutate<T>(ary: T[]): T[][] {
  if (!ary || !Array.isArray(ary)) {
    throw new Error("Invalid input.");
  }

  if (!ary.length) {
    return [];
  }

  if (ary.length === 1) {
    return [ary];
  }

  const result = [];

  for (let i = 0; i < ary.length; i++) {
    const current = ary[i];
    const remaining = [...ary.slice(0, i), ...ary.slice(i + 1)];
    const perms = permutate(remaining);

    for (let j = 0; j < perms.length; j++) {
      result.push([current, ...perms[j]]);
    }
  }

  return result;
}

function generateArray<T>(size: number): T[] {
  const result: T[] = [];
  for (let i = 0; i < size; i++) {
    result.push(null)
  }
  return result;
}