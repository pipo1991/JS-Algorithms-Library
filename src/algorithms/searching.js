// Searching algorithms

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
 * Binary search in a sorted array.
 * @param {any[]} arr
 * @param {any} target
 * @param {(a: any, b: any) => number} [compare]
 * @returns {number | null}
 */
function binarySearch(arr, target, compare = defaultCompare) {
  let lo = 0;
  let hi = arr.length - 1;
  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2);
    const c = compare(arr[mid], target);
    if (c === 0) return mid;
    if (c < 0) lo = mid + 1;
    else hi = mid - 1;
  }
  return null;
}

/**
 * First index where target could be inserted.
 * @param {any[]} arr
 * @param {any} target
 * @param {(a: any, b: any) => number} [compare]
 * @returns {number}
 */
function lowerBound(arr, target, compare = defaultCompare) {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (compare(arr[mid], target) < 0) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

/**
 * First index after the last occurrence of target.
 * @param {any[]} arr
 * @param {any} target
 * @param {(a: any, b: any) => number} [compare]
 * @returns {number}
 */
function upperBound(arr, target, compare = defaultCompare) {
  let lo = 0;
  let hi = arr.length;
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2);
    if (compare(arr[mid], target) <= 0) lo = mid + 1;
    else hi = mid;
  }
  return lo;
}

module.exports = {
  binarySearch,
  lowerBound,
  upperBound,
};
