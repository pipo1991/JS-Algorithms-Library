// Hash map with chaining

/**
 * Hash map with chaining.
 */
class HashMap {
  /**
   * @param {number} [capacity]
   */
  constructor(capacity = 53) {
    this._buckets = new Array(capacity).fill(null).map(() => []);
    this._size = 0;
  }

  /**
   * @param {any} key
   * @returns {number}
   */
  _hash(key) {
    const str = `${typeof key}:${String(key)}`;
    let hash = 5381;
    for (let i = 0; i < str.length; i += 1) {
      hash = ((hash << 5) + hash) + str.charCodeAt(i);
      hash >>>= 0;
    }
    return hash % this._buckets.length;
  }

  /**
   * @param {number} newCapacity
   * @returns {void}
   */
  _resize(newCapacity) {
    const old = this._buckets;
    this._buckets = new Array(newCapacity).fill(null).map(() => []);
    this._size = 0;
    for (const bucket of old) {
      for (const [k, v] of bucket) {
        this.set(k, v);
      }
    }
  }

  /**
   * @param {any} key
   * @param {any} value
   * @returns {void}
   */
  set(key, value) {
    const idx = this._hash(key);
    const bucket = this._buckets[idx];
    for (let i = 0; i < bucket.length; i += 1) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return;
      }
    }
    bucket.push([key, value]);
    this._size += 1;
    if (this._size / this._buckets.length > 0.7) this._resize(this._buckets.length * 2 + 1);
  }

  /**
   * @param {any} key
   * @returns {any | null}
   */
  get(key) {
    const idx = this._hash(key);
    const bucket = this._buckets[idx];
    for (let i = 0; i < bucket.length; i += 1) {
      if (bucket[i][0] === key) return bucket[i][1];
    }
    return null;
  }

  /**
   * @param {any} key
   * @returns {boolean}
   */
  has(key) {
    const idx = this._hash(key);
    const bucket = this._buckets[idx];
    for (let i = 0; i < bucket.length; i += 1) {
      if (bucket[i][0] === key) return true;
    }
    return false;
  }

  /**
   * @param {any} key
   * @returns {boolean}
   */
  delete(key) {
    const idx = this._hash(key);
    const bucket = this._buckets[idx];
    for (let i = 0; i < bucket.length; i += 1) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this._size -= 1;
        return true;
      }
    }
    return false;
  }

  /**
   * @returns {number}
   */
  size() {
    return this._size;
  }

  /**
   * @returns {any[]}
   */
  keys() {
    const out = [];
    for (const bucket of this._buckets) {
      for (const [k] of bucket) out.push(k);
    }
    return out;
  }

  /**
   * @returns {any[]}
   */
  values() {
    const out = [];
    for (const bucket of this._buckets) {
      for (const [, v] of bucket) out.push(v);
    }
    return out;
  }

  /**
   * @returns {any[][]}
   */
  entries() {
    const out = [];
    for (const bucket of this._buckets) {
      for (const entry of bucket) out.push(entry.slice());
    }
    return out;
  }
}

module.exports = {
  HashMap,
};
