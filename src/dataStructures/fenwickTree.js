// Fenwick tree (binary indexed tree)

/**
 * Fenwick tree (binary indexed tree).
 */
class FenwickTree {
  /**
   * @param {number[] | number} valuesOrSize
   */
  constructor(valuesOrSize) {
    if (Array.isArray(valuesOrSize)) {
      this.n = valuesOrSize.length;
      this.bit = new Array(this.n + 1).fill(0);
      for (let i = 0; i < valuesOrSize.length; i += 1) {
        this.update(i, valuesOrSize[i]);
      }
    } else {
      this.n = valuesOrSize;
      this.bit = new Array(this.n + 1).fill(0);
    }
  }

  /**
   * Add delta at index.
   * @param {number} index
   * @param {number} delta
   * @returns {void}
   */
  update(index, delta) {
    for (let i = index + 1; i <= this.n; i += i & -i) {
      this.bit[i] += delta;
    }
  }

  /**
   * Prefix sum up to index (inclusive).
   * @param {number} index
   * @returns {number}
   */
  query(index) {
    let sum = 0;
    for (let i = index + 1; i > 0; i -= i & -i) {
      sum += this.bit[i];
    }
    return sum;
  }

  /**
   * Range sum query [left, right].
   * @param {number} left
   * @param {number} right
   * @returns {number}
   */
  rangeQuery(left, right) {
    if (right < left) return 0;
    return this.query(right) - (left > 0 ? this.query(left - 1) : 0);
  }
}

module.exports = {
  FenwickTree,
};
