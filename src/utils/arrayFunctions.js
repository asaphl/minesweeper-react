export function mergeUnique(arr1, arr2) {
  let arraysSet = new Set(arr1.concat(arr2));
  return Array.from(arraysSet);
}

export function findAllIndexes(arr, val) {
  var indexes = [], i = -1;
  while ((i = arr.indexOf(val, i+1)) !== -1){
      indexes.push(i);
  }
  return indexes;
}

export function excludeExceptions(arr, exceptions) {
  return arr.filter(member => !exceptions.includes(member));
}

export function populateArrayWithIndexes(arrayLength) {
  const arr = new Array(arrayLength).fill().map((member, index) => index);
  return arr;
}