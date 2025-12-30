// Disjoint set union (union-find)

/**
 * Disjoint set union (union-find).
 */
class UnionFind {
  /**
   * @param {any[]} [items]
   */
  constructor(items = []) {
    this.parent = new Map();
    this.rank = new Map();
    for (const item of items) {
      this.parent.set(item, item);
      this.rank.set(item, 0);
    }
  }

  /**
   * @param {any} item
   * @returns {void}
   */
  add(item) {
    if (!this.parent.has(item)) {
      this.parent.set(item, item);
      this.rank.set(item, 0);
    }
  }

  /**
   * @param {any} item
   * @returns {any}
   */
  find(item) {
    if (!this.parent.has(item)) this.add(item);
    const p = this.parent.get(item);
    if (p !== item) {
      const root = this.find(p);
      this.parent.set(item, root);
    }
    return this.parent.get(item);
  }

  /**
   * @param {any} a
   * @param {any} b
   * @returns {boolean}
   */
  union(a, b) {
    const ra = this.find(a);
    const rb = this.find(b);
    if (ra === rb) return false;
    const rankA = this.rank.get(ra);
    const rankB = this.rank.get(rb);
    if (rankA < rankB) {
      this.parent.set(ra, rb);
    } else if (rankA > rankB) {
      this.parent.set(rb, ra);
    } else {
      this.parent.set(rb, ra);
      this.rank.set(ra, rankA + 1);
    }
    return true;
  }
}

module.exports = {
  UnionFind,
};
