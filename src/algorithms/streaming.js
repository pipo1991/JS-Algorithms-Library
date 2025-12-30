// Streaming algorithms

/**
 * Misra-Gries heavy hitters (k-1 candidates).
 * @param {any[]} stream
 * @param {number} k
 * @returns {any[]}
 */
function misraGries(stream, k) {
  const counts = new Map();
  for (const item of stream) {
    if (counts.has(item)) {
      counts.set(item, counts.get(item) + 1);
    } else if (counts.size < k - 1) {
      counts.set(item, 1);
    } else {
      for (const [key, val] of counts.entries()) {
        if (val === 1) counts.delete(key);
        else counts.set(key, val - 1);
      }
    }
  }
  return Array.from(counts.keys());
}

/**
 * Count-min sketch for approximate frequencies.
 */
class CountMinSketch {
  /**
   * @param {number} width
   * @param {number} depth
   * @param {number[]} [seeds]
   */
  constructor(width, depth, seeds = [17, 31, 47, 97]) {
    this.width = width;
    this.depth = depth;
    this.table = new Array(depth).fill(null).map(() => new Array(width).fill(0));
    this.seeds = seeds.slice(0, depth);
    while (this.seeds.length < depth) this.seeds.push(this.seeds.length * 131 + 7);
  }

  /**
   * @param {any} value
   * @param {number} seed
   * @returns {number}
   */
  _hash(value, seed) {
    const str = String(value);
    let hash = seed;
    for (let i = 0; i < str.length; i += 1) {
      hash = (hash * 33 + str.charCodeAt(i)) >>> 0;
    }
    return hash % this.width;
  }

  /**
   * @param {any} value
   * @param {number} [count]
   * @returns {void}
   */
  add(value, count = 1) {
    for (let i = 0; i < this.depth; i += 1) {
      const idx = this._hash(value, this.seeds[i]);
      this.table[i][idx] += count;
    }
  }

  /**
   * @param {any} value
   * @returns {number}
   */
  estimate(value) {
    let min = Infinity;
    for (let i = 0; i < this.depth; i += 1) {
      const idx = this._hash(value, this.seeds[i]);
      min = Math.min(min, this.table[i][idx]);
    }
    return min === Infinity ? 0 : min;
  }
}

module.exports = {
  misraGries,
  CountMinSketch,
};
