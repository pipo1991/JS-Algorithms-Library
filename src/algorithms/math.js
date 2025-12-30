// Math algorithms

/**
 * Greatest common divisor.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function gcd(a, b) {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

/**
 * Least common multiple.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function lcm(a, b) {
  if (a === 0 || b === 0) return 0;
  return Math.abs(a / gcd(a, b) * b);
}

/**
 * Modular exponentiation.
 * @param {number} base
 * @param {number} exp
 * @param {number} mod
 * @returns {number}
 */
function modPow(base, exp, mod) {
  let result = 1 % mod;
  let b = ((base % mod) + mod) % mod;
  let e = exp;
  while (e > 0) {
    if (e & 1) result = (result * b) % mod;
    b = (b * b) % mod;
    e >>= 1;
  }
  return result;
}

/**
 * Sieve of Eratosthenes up to n.
 * @param {number} n
 * @returns {number[]}
 */
function sieve(n) {
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;
  for (let p = 2; p * p <= n; p += 1) {
    if (!isPrime[p]) continue;
    for (let k = p * p; k <= n; k += p) isPrime[k] = false;
  }
  const primes = [];
  for (let i = 2; i <= n; i += 1) {
    if (isPrime[i]) primes.push(i);
  }
  return primes;
}

module.exports = {
  gcd,
  lcm,
  modPow,
  sieve,
};
