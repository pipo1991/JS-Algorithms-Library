// Binary min-heap data structure

/**
 * Binary min-heap.
 */
class MinHeap {
  /**
   * @param {number[]} [values]
   */
  constructor(values = []) {
    this._data = [];
    for (const v of values) this.push(v);
  }

  /**
   * @returns {number}
   */
  size() {
    return this._data.length;
  }

  /**
   * @returns {number | null}
   */
  peek() {
    return this._data.length === 0 ? null : this._data[0];
  }

  /**
   * @param {number} value
   * @returns {void}
   */
  push(value) {
    this._data.push(value);
    this._siftUp(this._data.length - 1);
  }

  /**
   * @returns {number | null}
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
      if (this._data[p] <= this._data[i]) break;
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
      let smallest = i;
      if (left < n && this._data[left] < this._data[smallest]) smallest = left;
      if (right < n && this._data[right] < this._data[smallest]) smallest = right;
      if (smallest === i) break;
      const tmp = this._data[i];
      this._data[i] = this._data[smallest];
      this._data[smallest] = tmp;
      i = smallest;
    }
  }
}

module.exports = {
  MinHeap,
};
