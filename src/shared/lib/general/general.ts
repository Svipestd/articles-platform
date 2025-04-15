export function createMapFromArray<T>(array: T[], key: keyof T): Record<string, T> {
  const map: Record<string, T> = {};

  for (const item of array) {
    //@ts-ignore
    map[item[key]] = { ...item } as T;
  }

  return map;
}
