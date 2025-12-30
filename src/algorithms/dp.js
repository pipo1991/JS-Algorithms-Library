// Dynamic programming algorithms

/**
 * Fibonacci number (0-indexed).
 * @param {number} n
 * @returns {number | null}
 */
function fib(n) {
  if (n < 0) return null;
  if (n <= 1) return n;
  let a = 0;
  let b = 1;
  for (let i = 2; i <= n; i += 1) {
    const c = a + b;
    a = b;
    b = c;
  }
  return b;
}

/**
 * Minimum coins to make amount.
 * @param {number[]} coins
 * @param {number} amount
 * @returns {number | null}
 */
function coinChangeMinCoins(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;
  for (const coin of coins) {
    for (let v = coin; v <= amount; v += 1) {
      dp[v] = Math.min(dp[v], dp[v - coin] + 1);
    }
  }
  return dp[amount] === Infinity ? null : dp[amount];
}

/**
 * Length of longest increasing subsequence.
 * @param {number[]} arr
 * @returns {number}
 */
function longestIncreasingSubsequence(arr) {
  if (arr.length === 0) return 0;
  const tails = [];
  for (const x of arr) {
    let lo = 0;
    let hi = tails.length;
    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (tails[mid] < x) lo = mid + 1;
      else hi = mid;
    }
    tails[lo] = x;
  }
  return tails.length;
}

/**
 * 0/1 knapsack maximum value.
 * @param {number[]} values
 * @param {number[]} weights
 * @param {number} capacity
 * @returns {number}
 */
function knapsack01(values, weights, capacity) {
  const n = values.length;
  const dp = new Array(capacity + 1).fill(0);
  for (let i = 0; i < n; i += 1) {
    for (let w = capacity; w >= weights[i]; w -= 1) {
      dp[w] = Math.max(dp[w], dp[w - weights[i]] + values[i]);
    }
  }
  return dp[capacity];
}

/**
 * Length of longest common subsequence.
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
function lcs(a, b) {
  const n = a.length;
  const m = b.length;
  const dp = new Array(m + 1).fill(0);
  for (let i = 1; i <= n; i += 1) {
    let prev = 0;
    for (let j = 1; j <= m; j += 1) {
      const temp = dp[j];
      if (a[i - 1] === b[j - 1]) dp[j] = prev + 1;
      else dp[j] = Math.max(dp[j], dp[j - 1]);
      prev = temp;
    }
  }
  return dp[m];
}

module.exports = {
  fib,
  coinChangeMinCoins,
  longestIncreasingSubsequence,
  knapsack01,
  lcs,
};
