// Stack

/**
 * Stack (LIFO).
 */
class Stack {
  /**
   * @param {any[]} [values]
   */
  constructor(values = []) {
    this._data = values.slice();
  }

  /**
   * @param {any} value
   * @returns {void}
   */
  push(value) {
    this._data.push(value);
  }

  /**
   * @returns {any | null}
   */
  pop() {
    return this._data.length === 0 ? null : this._data.pop();
  }

  /**
   * @returns {any | null}
   */
  peek() {
    return this._data.length === 0 ? null : this._data[this._data.length - 1];
  }

  /**
   * @returns {number}
   */
  size() {
    return this._data.length;
  }

  /**
   * @returns {boolean}
   */
  isEmpty() {
    return this._data.length === 0;
  }
}

module.exports = {
  Stack,
};
