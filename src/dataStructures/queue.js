// Queue (FIFO)

/**
 * Queue (FIFO).
 */
class Queue {
  /**
   * @param {any[]} [values]
   */
  constructor(values = []) {
    this._data = values.slice();
    this._head = 0;
  }

  /**
   * @param {any} value
   * @returns {void}
   */
  enqueue(value) {
    this._data.push(value);
  }

  /**
   * @returns {any | null}
   */
  dequeue() {
    if (this.size() === 0) return null;
    const value = this._data[this._head];
    this._head += 1;
    if (this._head > 64 && this._head * 2 > this._data.length) {
      this._data = this._data.slice(this._head);
      this._head = 0;
    }
    return value;
  }

  /**
   * @returns {any | null}
   */
  peek() {
    return this.size() === 0 ? null : this._data[this._head];
  }

  /**
   * @returns {number}
   */
  size() {
    return this._data.length - this._head;
  }

  /**
   * @returns {boolean}
   */
  isEmpty() {
    return this.size() === 0;
  }
}

module.exports = {
  Queue,
};
