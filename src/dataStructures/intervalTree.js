// Interval tree (centered interval tree)

/**
 * Interval tree node.
 */
class IntervalNode {
  /**
   * @param {number} center
   * @param {Array<[number, number]>} [intervals]
   */
  constructor(center, intervals = []) {
    this.center = center;
    this.intervals = intervals;
    this.left = null;
    this.right = null;
  }
}

/**
 * Interval tree for stabbing queries.
 */
class IntervalTree {
  /**
   * @param {Array<[number, number]>} [intervals]
   */
  constructor(intervals = []) {
    this.root = this._build(intervals);
  }

  /**
   * @param {Array<[number, number]>} intervals
   * @returns {IntervalNode | null}
   */
  _build(intervals) {
    if (intervals.length === 0) return null;
    const points = intervals.map(([s, e]) => (s + e) / 2).sort((a, b) => a - b);
    const center = points[Math.floor(points.length / 2)];
    const left = [];
    const right = [];
    const overlap = [];
    for (const it of intervals) {
      if (it[1] < center) left.push(it);
      else if (it[0] > center) right.push(it);
      else overlap.push(it);
    }
    const node = new IntervalNode(center, overlap);
    node.left = this._build(left);
    node.right = this._build(right);
    return node;
  }

  /**
   * @param {number} point
   * @returns {Array<[number, number]>}
   */
  query(point) {
    const res = [];
    /**
     * @param {IntervalNode | null} node
     * @returns {void}
     */
    function dfs(node) {
      if (!node) return;
      for (const [s, e] of node.intervals) {
        if (s <= point && point <= e) res.push([s, e]);
      }
      if (point < node.center) dfs(node.left);
      else if (point > node.center) dfs(node.right);
      else {
        dfs(node.left);
        dfs(node.right);
      }
    }
    dfs(this.root);
    return res;
  }
}

module.exports = {
  IntervalTree,
  IntervalNode,
};
