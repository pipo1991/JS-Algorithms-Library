// B-Tree (minimum degree t)

/**
 * B-Tree node.
 */
class BTreeNode {
  /**
   * @param {number} t
   * @param {boolean} [leaf]
   */
  constructor(t, leaf = true) {
    this.t = t;
    this.leaf = leaf;
    this.keys = [];
    this.children = [];
  }

  /**
   * @param {number} key
   * @returns {BTreeNode | null}
   */
  search(key) {
    let i = 0;
    while (i < this.keys.length && key > this.keys[i]) i += 1;
    if (i < this.keys.length && this.keys[i] === key) return this;
    if (this.leaf) return null;
    return this.children[i].search(key);
  }

  /**
   * @param {number} i
   * @param {BTreeNode} y
   * @returns {void}
   */
  splitChild(i, y) {
    const z = new BTreeNode(this.t, y.leaf);
    z.keys = y.keys.splice(this.t);
    const mid = y.keys.pop();
    if (!y.leaf) z.children = y.children.splice(this.t);
    this.children.splice(i + 1, 0, z);
    this.keys.splice(i, 0, mid);
  }

  /**
   * @param {number} key
   * @returns {void}
   */
  insertNonFull(key) {
    let i = this.keys.length - 1;
    if (this.leaf) {
      this.keys.push(key);
      while (i >= 0 && this.keys[i] > key) {
        this.keys[i + 1] = this.keys[i];
        i -= 1;
      }
      this.keys[i + 1] = key;
    } else {
      while (i >= 0 && key < this.keys[i]) i -= 1;
      i += 1;
      if (this.children[i].keys.length === 2 * this.t - 1) {
        this.splitChild(i, this.children[i]);
        if (key > this.keys[i]) i += 1;
      }
      this.children[i].insertNonFull(key);
    }
  }
}

/**
 * B-Tree (minimum degree t).
 */
class BTree {
  /**
   * @param {number} [t]
   */
  constructor(t = 2) {
    this.t = t;
    this.root = new BTreeNode(t, true);
  }

  /**
   * @param {number} key
   * @returns {BTreeNode | null}
   */
  search(key) {
    return this.root.search(key);
  }

  /**
   * @param {number} key
   * @returns {void}
   */
  insert(key) {
    const r = this.root;
    if (r.keys.length === 2 * this.t - 1) {
      const s = new BTreeNode(this.t, false);
      s.children[0] = r;
      s.splitChild(0, r);
      let i = 0;
      if (s.keys[0] < key) i += 1;
      s.children[i].insertNonFull(key);
      this.root = s;
    } else {
      r.insertNonFull(key);
    }
  }
}

module.exports = {
  BTree,
  BTreeNode,
};
