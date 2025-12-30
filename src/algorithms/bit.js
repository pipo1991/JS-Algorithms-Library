// Bit manipulation helpers

/**
 * Count set bits in 32-bit integer.
 * @param {number} n
 * @returns {number}
 */
function popcount32(n) {
  let x = n >>> 0;
  let count = 0;
  while (x !== 0) {
    x &= x - 1;
    count += 1;
  }
  return count;
}

/**
 * Enumerate all submasks of mask.
 * @param {number} mask
 * @returns {number[]}
 */
function iterateSubsets(mask) {
  const out = [];
  let sub = mask >>> 0;
  while (true) {
    out.push(sub);
    if (sub === 0) break;
    sub = (sub - 1) & mask;
  }
  return out;
}

/**
 * Set bit i.
 * @param {number} n
 * @param {number} i
 * @returns {number}
 */
function setBit(n, i) {
  return n | (1 << i);
}

/**
 * Clear bit i.
 * @param {number} n
 * @param {number} i
 * @returns {number}
 */
function clearBit(n, i) {
  return n & ~(1 << i);
}

/**
 * Toggle bit i.
 * @param {number} n
 * @param {number} i
 * @returns {number}
 */
function toggleBit(n, i) {
  return n ^ (1 << i);
}

/**
 * Test bit i.
 * @param {number} n
 * @param {number} i
 * @returns {boolean}
 */
function testBit(n, i) {
  return ((n >> i) & 1) === 1;
}

module.exports = {
  popcount32,
  iterateSubsets,
  setBit,
  clearBit,
  toggleBit,
  testBit,
};
