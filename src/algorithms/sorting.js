// Sorting algorithms

/**
 * Default comparator for ascending order.
 * @param {any} a
 * @param {any} b
 * @returns {number}
 */
function defaultCompare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/**
 * Quicksort returning a new array.
 * @param {any[]} arr
 * @param {(a: any, b: any) => number} [compare]
 * @returns {any[]}
 */
function quickSort(arr, compare = defaultCompare) {
  if (arr.length <= 1) return arr.slice();
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = [];
  const right = [];
  const equal = [];
  for (let i = 0; i < arr.length; i += 1) {
    const c = compare(arr[i], pivot);
    if (c < 0) left.push(arr[i]);
    else if (c > 0) right.push(arr[i]);
    else equal.push(arr[i]);
  }
  return quickSort(left, compare).concat(equal, quickSort(right, compare));
}

/**
 * Merge sort returning a new array.
 * @param {any[]} arr
 * @param {(a: any, b: any) => number} [compare]
 * @returns {any[]}
 */
function mergeSort(arr, compare = defaultCompare) {
  if (arr.length <= 1) return arr.slice();
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), compare);
  const right = mergeSort(arr.slice(mid), compare);
  const out = [];
  let i = 0;
  let j = 0;
  while (i < left.length || j < right.length) {
    if (j >= right.length || (i < left.length && compare(left[i], right[j]) <= 0)) {
      out.push(left[i]);
      i += 1;
    } else {
      out.push(right[j]);
      j += 1;
    }
  }
  return out;
}

module.exports = {
  quickSort,
  mergeSort,
};
