// Bloom filter

/**
 * Bloom filter.
 */
class BloomFilter {
  /**
   * @param {number} size
   * @param {number} [hashCount]
   */
  constructor(size, hashCount = 3) {
    this.size = size;
    this.hashCount = hashCount;
    this.bits = new Uint8Array(Math.ceil(size / 8));
  }

  /**
   * @param {any} value
   * @returns {number[]}
   */
  _hashes(value) {
    const str = String(value);
    let h1 = 5381;
    let h2 = 0;
    for (let i = 0; i < str.length; i += 1) {
      const c = str.charCodeAt(i);
      h1 = ((h1 << 5) + h1) + c;
      h1 >>>= 0;
      h2 = (h2 * 31 + c) >>> 0;
    }
    const out = [];
    for (let i = 0; i < this.hashCount; i += 1) {
      const idx = (h1 + i * h2 + i * i) % this.size;
      out.push(idx);
    }
    return out;
  }

  /**
   * @param {number} i
   * @returns {void}
   */
  _setBit(i) {
    const byte = Math.floor(i / 8);
    const bit = i % 8;
    this.bits[byte] |= (1 << bit);
  }

  /**
   * @param {number} i
   * @returns {boolean}
   */
  _getBit(i) {
    const byte = Math.floor(i / 8);
    const bit = i % 8;
    return (this.bits[byte] & (1 << bit)) !== 0;
  }

  /**
   * @param {any} value
   * @returns {void}
   */
  add(value) {
    const idxs = this._hashes(value);
    for (const idx of idxs) this._setBit(idx);
  }

  /**
   * @param {any} value
   * @returns {boolean}
   */
  has(value) {
    const idxs = this._hashes(value);
    for (const idx of idxs) {
      if (!this._getBit(idx)) return false;
    }
    return true;
  }
}

module.exports = {
  BloomFilter,
};
