/**
 * Function, merges two objects and returns result.
 * Key in valuesWithPath - path for value in target object.
 * @param valuesWithPath - Object with path and value - example: { [`${userId}.adress.street`]: 'NewStreet' }.
 * @param target - Object to merge.
 */
export function deleteKey<T, K extends string | number | symbol>(
  target: object,
  key: string
): Omit<T, K> {
  const targetCopy = JSON.parse(JSON.stringify(target));
  const newObject: Record<string, any> = {};

  for (const targetKey of Object.keys(targetCopy)) {
    if (targetKey === key) continue;
    newObject[targetKey] = targetCopy[targetKey];
  }

  return newObject as Omit<T, K>;
}
