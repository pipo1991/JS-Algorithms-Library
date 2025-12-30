// Segment tree

/**
 * Segment tree with point updates and range queries.
 */
class SegmentTree {
  /**
   * @param {number[]} values
   * @param {(a: number, b: number) => number} [combine]
   * @param {number} [defaultValue]
   */
  constructor(values, combine = (a, b) => a + b, defaultValue = 0) {
    this.n = values.length;
    this.combine = combine;
    this.defaultValue = defaultValue;
    this.tree = new Array(this.n * 4).fill(defaultValue);
    if (this.n > 0) this._build(1, 0, this.n - 1, values);
  }

  /**
   * @param {number} node
   * @param {number} l
   * @param {number} r
   * @param {number[]} values
   * @returns {void}
   */
  _build(node, l, r, values) {
    if (l === r) {
      this.tree[node] = values[l];
      return;
    }
    const mid = Math.floor((l + r) / 2);
    this._build(node * 2, l, mid, values);
    this._build(node * 2 + 1, mid + 1, r, values);
    this.tree[node] = this.combine(this.tree[node * 2], this.tree[node * 2 + 1]);
  }

  /**
   * @param {number} index
   * @param {number} value
   * @returns {void}
   */
  update(index, value) {
    this._update(1, 0, this.n - 1, index, value);
  }

  /**
   * @param {number} node
   * @param {number} l
   * @param {number} r
   * @param {number} index
   * @param {number} value
   * @returns {void}
   */
  _update(node, l, r, index, value) {
    if (l === r) {
      this.tree[node] = value;
      return;
    }
    const mid = Math.floor((l + r) / 2);
    if (index <= mid) this._update(node * 2, l, mid, index, value);
    else this._update(node * 2 + 1, mid + 1, r, index, value);
    this.tree[node] = this.combine(this.tree[node * 2], this.tree[node * 2 + 1]);
  }

  /**
   * @param {number} left
   * @param {number} right
   * @returns {number}
   */
  query(left, right) {
    if (left > right) return this.defaultValue;
    return this._query(1, 0, this.n - 1, left, right);
  }

  /**
   * @param {number} node
   * @param {number} l
   * @param {number} r
   * @param {number} left
   * @param {number} right
   * @returns {number}
   */
  _query(node, l, r, left, right) {
    if (left <= l && r <= right) return this.tree[node];
    const mid = Math.floor((l + r) / 2);
    let res = this.defaultValue;
    if (left <= mid) res = this.combine(res, this._query(node * 2, l, mid, left, right));
    if (right > mid) res = this.combine(res, this._query(node * 2 + 1, mid + 1, r, left, right));
    return res;
  }
}

/**
 * Segment tree with lazy range add updates.
 */
class LazySegmentTree {
  /**
   * @param {number[]} values
   * @param {(a: number, b: number) => number} [combine]
   * @param {number} [defaultValue]
   */
  constructor(values, combine = (a, b) => a + b, defaultValue = 0) {
    this.n = values.length;
    this.combine = combine;
    this.defaultValue = defaultValue;
    this.tree = new Array(this.n * 4).fill(defaultValue);
    this.lazy = new Array(this.n * 4).fill(0);
    if (this.n > 0) this._build(1, 0, this.n - 1, values);
  }

  /**
   * @param {number} node
   * @param {number} l
   * @param {number} r
   * @param {number[]} values
   * @returns {void}
   */
  _build(node, l, r, values) {
    if (l === r) {
      this.tree[node] = values[l];
      return;
    }
    const mid = Math.floor((l + r) / 2);
    this._build(node * 2, l, mid, values);
    this._build(node * 2 + 1, mid + 1, r, values);
    this.tree[node] = this.combine(this.tree[node * 2], this.tree[node * 2 + 1]);
  }

  /**
   * @param {number} node
   * @param {number} l
   * @param {number} r
   * @returns {void}
   */
  _push(node, l, r) {
    if (this.lazy[node] === 0) return;
    const val = this.lazy[node];
    if (l !== r) {
      this.lazy[node * 2] += val;
      this.lazy[node * 2 + 1] += val;
    }
    this.tree[node] += (r - l + 1) * val;
    this.lazy[node] = 0;
  }

  /**
   * @param {number} left
   * @param {number} right
   * @param {number} delta
   * @returns {void}
   */
  rangeAdd(left, right, delta) {
    this._rangeAdd(1, 0, this.n - 1, left, right, delta);
  }

  /**
   * @param {number} node
   * @param {number} l
   * @param {number} r
   * @param {number} left
   * @param {number} right
   * @param {number} delta
   * @returns {void}
   */
  _rangeAdd(node, l, r, left, right, delta) {
    this._push(node, l, r);
    if (right < l || r < left) return;
    if (left <= l && r <= right) {
      this.lazy[node] += delta;
      this._push(node, l, r);
      return;
    }
    const mid = Math.floor((l + r) / 2);
    this._rangeAdd(node * 2, l, mid, left, right, delta);
    this._rangeAdd(node * 2 + 1, mid + 1, r, left, right, delta);
    this.tree[node] = this.combine(this.tree[node * 2], this.tree[node * 2 + 1]);
  }

  /**
   * @param {number} left
   * @param {number} right
   * @returns {number}
   */
  query(left, right) {
    return this._query(1, 0, this.n - 1, left, right);
  }

  /**
   * @param {number} node
   * @param {number} l
   * @param {number} r
   * @param {number} left
   * @param {number} right
   * @returns {number}
   */
  _query(node, l, r, left, right) {
    this._push(node, l, r);
    if (right < l || r < left) return this.defaultValue;
    if (left <= l && r <= right) return this.tree[node];
    const mid = Math.floor((l + r) / 2);
    const a = this._query(node * 2, l, mid, left, right);
    const b = this._query(node * 2 + 1, mid + 1, r, left, right);
    return this.combine(a, b);
  }
}

module.exports = {
  SegmentTree,
  LazySegmentTree,
};
