// Skip list

/**
 * Default comparator for ascending order.
 * @param {any} a
 * @param {any} b
 * @returns {number}
 */
function defaultCompare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

/**
 * Skip list node.
 */
class SkipNode {
  /**
   * @param {any} value
   * @param {number} level
   */
  constructor(value, level) {
    this.value = value;
    this.next = new Array(level).fill(null);
  }
}

/**
 * Skip list.
 */
class SkipList {
  /**
   * @param {number} [maxLevel]
   * @param {number} [p]
   * @param {(a: any, b: any) => number} [compare]
   */
  constructor(maxLevel = 16, p = 0.5, compare = defaultCompare) {
    this.maxLevel = maxLevel;
    this.p = p;
    this.compare = compare;
    this.head = new SkipNode(null, maxLevel);
    this.level = 1;
    this._size = 0;
  }

  /**
   * @returns {number}
   */
  _randomLevel() {
    let lvl = 1;
    while (Math.random() < this.p && lvl < this.maxLevel) lvl += 1;
    return lvl;
  }

  /**
   * @param {any} value
   * @returns {SkipNode | null}
   */
  search(value) {
    let node = this.head;
    for (let i = this.level - 1; i >= 0; i -= 1) {
      while (node.next[i] && this.compare(node.next[i].value, value) < 0) {
        node = node.next[i];
      }
    }
    node = node.next[0];
    return node !== null && node.value === value ? node : null;
  }

  /**
   * @param {any} value
   * @returns {boolean}
   */
  insert(value) {
    const update = new Array(this.maxLevel);
    let node = this.head;
    for (let i = this.level - 1; i >= 0; i -= 1) {
      while (node.next[i] && this.compare(node.next[i].value, value) < 0) {
        node = node.next[i];
      }
      update[i] = node;
    }
    node = node.next[0];
    if (node && node.value === value) return false;
    const lvl = this._randomLevel();
    if (lvl > this.level) {
      for (let i = this.level; i < lvl; i += 1) update[i] = this.head;
      this.level = lvl;
    }
    const newNode = new SkipNode(value, lvl);
    for (let i = 0; i < lvl; i += 1) {
      newNode.next[i] = update[i].next[i];
      update[i].next[i] = newNode;
    }
    this._size += 1;
    return true;
  }

  /**
   * @param {any} value
   * @returns {boolean}
   */
  remove(value) {
    const update = new Array(this.maxLevel);
    let node = this.head;
    for (let i = this.level - 1; i >= 0; i -= 1) {
      while (node.next[i] && this.compare(node.next[i].value, value) < 0) {
        node = node.next[i];
      }
      update[i] = node;
    }
    node = node.next[0];
    if (!node || node.value !== value) return false;
    for (let i = 0; i < this.level; i += 1) {
      if (update[i].next[i] !== node) break;
      update[i].next[i] = node.next[i];
    }
    while (this.level > 1 && this.head.next[this.level - 1] === null) {
      this.level -= 1;
    }
    this._size -= 1;
    return true;
  }

  /**
   * @returns {number}
   */
  size() {
    return this._size;
  }
}

module.exports = {
  SkipList,
  SkipNode,
};
