// Array algorithms

/**
 * Find indices of two numbers that sum to target.
 * @param {number[]} nums
 * @param {number} target
 * @returns {number[] | null}
 */
function twoSum(nums, target) {
  const seen = new Map();
  for (let i = 0; i < nums.length; i += 1) {
    const want = target - nums[i];
    if (seen.has(want)) return [seen.get(want), i];
    seen.set(nums[i], i);
  }
  return null;
}

/**
 * Build prefix sums with leading 0.
 * @param {number[]} arr
 * @returns {number[]}
 */
function prefixSums(arr) {
  const out = new Array(arr.length + 1);
  out[0] = 0;
  for (let i = 0; i < arr.length; i += 1) {
    out[i + 1] = out[i] + arr[i];
  }
  return out;
}

/**
 * Kadane's algorithm for max subarray sum.
 * @param {number[]} arr
 * @returns {number}
 */
function maxSubarraySum(arr) {
  let best = -Infinity;
  let cur = 0;
  for (let i = 0; i < arr.length; i += 1) {
    cur = Math.max(arr[i], cur + arr[i]);
    best = Math.max(best, cur);
  }
  return best;
}

/**
 * Return a rotated copy of the array.
 * @param {any[]} arr
 * @param {number} k
 * @returns {any[]}
 */
function rotateArray(arr, k) {
  if (arr.length === 0) return [];
  const n = arr.length;
  const shift = ((k % n) + n) % n;
  const out = new Array(n);
  for (let i = 0; i < n; i += 1) {
    out[(i + shift) % n] = arr[i];
  }
  return out;
}

/**
 * Sliding window maximums.
 * @param {number[]} arr
 * @param {number} k
 * @returns {number[]}
 */
function slidingWindowMax(arr, k) {
  if (k <= 0) return [];
  const out = [];
  const deque = [];
  for (let i = 0; i < arr.length; i += 1) {
    while (deque.length && deque[0] <= i - k) deque.shift();
    while (deque.length && arr[deque[deque.length - 1]] <= arr[i]) deque.pop();
    deque.push(i);
    if (i >= k - 1) out.push(arr[deque[0]]);
  }
  return out;
}

/**
 * Select the k-th smallest element (0-based).
 * @param {number[]} arr
 * @param {number} k
 * @returns {number | null}
 */
function quickselect(arr, k) {
  if (k < 0 || k >= arr.length) return null;
  const nums = arr.slice();
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const pivot = nums[Math.floor((left + right) / 2)];
    let i = left;
    let j = right;
    while (i <= j) {
      while (nums[i] < pivot) i += 1;
      while (nums[j] > pivot) j -= 1;
      if (i <= j) {
        const tmp = nums[i];
        nums[i] = nums[j];
        nums[j] = tmp;
        i += 1;
        j -= 1;
      }
    }
    if (k <= j) right = j;
    else if (k >= i) left = i;
    else return nums[k];
  }
  return null;
}

module.exports = {
  twoSum,
  prefixSums,
  maxSubarraySum,
  rotateArray,
  slidingWindowMax,
  quickselect,
};
