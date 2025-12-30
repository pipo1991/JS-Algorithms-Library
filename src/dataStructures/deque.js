// Deque (double-ended queue)

/**
 * Deque (double-ended queue).
 */
class Deque {
  /**
   * @returns {void}
   */
  constructor() {
    this._data = {};
    this._head = 0;
    this._tail = 0;
  }

  /**
   * @param {any} value
   * @returns {void}
   */
  pushFront(value) {
    this._head -= 1;
    this._data[this._head] = value;
  }

  /**
   * @param {any} value
   * @returns {void}
   */
  pushBack(value) {
    this._data[this._tail] = value;
    this._tail += 1;
  }

  /**
   * @returns {any | null}
   */
  popFront() {
    if (this.size() === 0) return null;
    const value = this._data[this._head];
    delete this._data[this._head];
    this._head += 1;
    return value;
  }

  /**
   * @returns {any | null}
   */
  popBack() {
    if (this.size() === 0) return null;
    this._tail -= 1;
    const value = this._data[this._tail];
    delete this._data[this._tail];
    return value;
  }

  /**
   * @returns {any | null}
   */
  peekFront() {
    return this.size() === 0 ? null : this._data[this._head];
  }

  /**
   * @returns {any | null}
   */
  peekBack() {
    return this.size() === 0 ? null : this._data[this._tail - 1];
  }

  /**
   * @returns {number}
   */
  size() {
    return this._tail - this._head;
  }

  /**
   * @returns {boolean}
   */
  isEmpty() {
    return this.size() === 0;
  }
}

module.exports = {
  Deque,
};
