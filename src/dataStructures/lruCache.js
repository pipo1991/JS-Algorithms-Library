// LRU cache

/**
 * LRU cache with fixed capacity.
 */
class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.capacity = capacity;
    this._map = new Map();
  }

  /**
   * @param {any} key
   * @returns {any | null}
   */
  get(key) {
    if (!this._map.has(key)) return null;
    const value = this._map.get(key);
    this._map.delete(key);
    this._map.set(key, value);
    return value;
  }

  /**
   * @param {any} key
   * @param {any} value
   * @returns {void}
   */
  set(key, value) {
    if (this._map.has(key)) this._map.delete(key);
    this._map.set(key, value);
    if (this._map.size > this.capacity) {
      const oldest = this._map.keys().next().value;
      this._map.delete(oldest);
    }
  }

  /**
   * @param {any} key
   * @returns {boolean}
   */
  has(key) {
    return this._map.has(key);
  }

  /**
   * @param {any} key
   * @returns {boolean}
   */
  delete(key) {
    return this._map.delete(key);
  }

  /**
   * @returns {number}
   */
  size() {
    return this._map.size;
  }
}

module.exports = {
  LRUCache,
};
