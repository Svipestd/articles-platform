function isObject(item: any) {
  return item && typeof item === 'object' && !Array.isArray(item) && !(item instanceof Date);
}

function makeObjectFromPathKey(path: string, value: any) {
  const pathArr = path.split('.').reverse();
  let result = {};

  for (let i = 0; i < pathArr.length; i++) {
    result = { [pathArr[i]]: i === 0 ? value : result };
  }

  return result;
}

function mergeObjects(target: any, sources: any) {
  if (!sources.length) return target;

  sources.forEach((source: any) => {
    if (isObject(target) && isObject(source)) {
      for (const key in source) {
        if (isObject(source[key])) {
          if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
            continue;
          }

          if (!target[key] || !isObject(target[key])) {
            target[key] = {};
          }

          mergeObjects(target[key], [source[key]]);
        } else {
          target[key] = source[key];
        }
      }
    }
  });

  return target;
}

/**
 * Функция для слияния двух объектов.
 * Ключ поля объект для слияния - путь для значения в итоговом объекте.
 * @param object - Объект для слияния.
 * @param target - Таргет объект.
 */
function deepChangeAndCopyObject(object: Record<string, any>, target: object) {
  const objArr = [];

  for (const [path, value] of Object.entries(object)) {
    objArr.push(makeObjectFromPathKey(path, value));
  }

  return { ...mergeObjects(target, objArr) };
}

/**
 * Function, merges two objects and returns result.
 * Key in valuesWithPath - path for value in target object.
 * @param valuesWithPath - Object with path and value - example: { [`${userId}.adress.street`]: 'NewStreet' }.
 * @param target - Object to merge.
 */
export function editObject<T>(target: object, valuesWithPath: Record<string, any>): T {
  const targetCopy = JSON.parse(JSON.stringify(target));

  return deepChangeAndCopyObject(valuesWithPath, targetCopy);
}
