// Priority queue (binary heap with comparator)

/**
 * Default comparator for ascending order.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function defaultCompare(a, b) {
  return a - b;
}

/**
 * Priority queue backed by a binary heap.
 */
class PriorityQueue {
  /**
   * @param {(a: any, b: any) => number} [compare]
   * @param {any[]} [values]
   */
  constructor(compare = defaultCompare, values = []) {
    this._data = [];
    this._compare = compare;
    for (const v of values) this.push(v);
  }

  /**
   * @returns {number}
   */
  size() {
    return this._data.length;
  }

  /**
   * @returns {any | null}
   */
  peek() {
    return this._data.length === 0 ? null : this._data[0];
  }

  /**
   * @param {any} value
   * @returns {void}
   */
  push(value) {
    this._data.push(value);
    this._siftUp(this._data.length - 1);
  }

  /**
   * @returns {any | null}
   */
  pop() {
    if (this._data.length === 0) return null;
    const top = this._data[0];
    const last = this._data.pop();
    if (this._data.length > 0) {
      this._data[0] = last;
      this._siftDown(0);
    }
    return top;
  }

  /**
   * @param {number} idx
   * @returns {void}
   */
  _siftUp(idx) {
    let i = idx;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this._compare(this._data[p], this._data[i]) <= 0) break;
      const tmp = this._data[p];
      this._data[p] = this._data[i];
      this._data[i] = tmp;
      i = p;
    }
  }

  /**
   * @param {number} idx
   * @returns {void}
   */
  _siftDown(idx) {
    let i = idx;
    const n = this._data.length;
    while (true) {
      const left = i * 2 + 1;
      const right = left + 1;
      let best = i;
      if (left < n && this._compare(this._data[left], this._data[best]) < 0) best = left;
      if (right < n && this._compare(this._data[right], this._data[best]) < 0) best = right;
      if (best === i) break;
      const tmp = this._data[i];
      this._data[i] = this._data[best];
      this._data[best] = tmp;
      i = best;
    }
  }
}

module.exports = {
  PriorityQueue,
};
