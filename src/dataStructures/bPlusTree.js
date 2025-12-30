// B+ Tree (minimum degree t)

/**
 * B+ Tree node.
 */
class BPlusNode {
  /**
   * @param {number} t
   * @param {boolean} [leaf]
   */
  constructor(t, leaf = true) {
    this.t = t;
    this.leaf = leaf;
    this.keys = [];
    this.children = [];
    this.next = null;
  }
}

/**
 * B+ Tree (minimum degree t).
 */
class BPlusTree {
  /**
   * @param {number} [t]
   */
  constructor(t = 2) {
    this.t = t;
    this.root = new BPlusNode(t, true);
  }

  /**
   * @param {number} key
   * @returns {BPlusNode}
   */
  _findLeaf(key) {
    let node = this.root;
    while (!node.leaf) {
      let i = 0;
      while (i < node.keys.length && key >= node.keys[i]) i += 1;
      node = node.children[i];
    }
    return node;
  }

  /**
   * @param {number} key
   * @returns {boolean}
   */
  search(key) {
    const leaf = this._findLeaf(key);
    return leaf.keys.includes(key);
  }

  /**
   * @param {number} key
   * @returns {void}
   */
  insert(key) {
    const leaf = this._findLeaf(key);
    this._insertIntoLeaf(leaf, key);
    if (leaf.keys.length === 2 * this.t) {
      this._splitLeaf(leaf);
    }
  }

  /**
   * @param {BPlusNode} leaf
   * @param {number} key
   * @returns {void}
   */
  _insertIntoLeaf(leaf, key) {
    leaf.keys.push(key);
    leaf.keys.sort((a, b) => a - b);
  }

  /**
   * @param {BPlusNode} leaf
   * @returns {void}
   */
  _splitLeaf(leaf) {
    const mid = this.t;
    const newLeaf = new BPlusNode(this.t, true);
    newLeaf.keys = leaf.keys.splice(mid);
    newLeaf.next = leaf.next;
    leaf.next = newLeaf;
    const promoted = newLeaf.keys[0];
    this._insertIntoParent(leaf, promoted, newLeaf);
  }

  /**
   * @param {BPlusNode} left
   * @param {number} key
   * @param {BPlusNode} right
   * @returns {void}
   */
  _insertIntoParent(left, key, right) {
    if (this.root === left) {
      const newRoot = new BPlusNode(this.t, false);
      newRoot.keys = [key];
      newRoot.children = [left, right];
      this.root = newRoot;
      return;
    }
    const parent = this._findParent(this.root, left);
    let idx = parent.children.indexOf(left);
    parent.keys.splice(idx, 0, key);
    parent.children.splice(idx + 1, 0, right);
    if (parent.keys.length === 2 * this.t) {
      this._splitInternal(parent);
    }
  }

  /**
   * @param {BPlusNode} node
   * @returns {void}
   */
  _splitInternal(node) {
    const mid = this.t;
    const newNode = new BPlusNode(this.t, false);
    const promoted = node.keys[mid];
    newNode.keys = node.keys.splice(mid + 1);
    node.keys.pop();
    newNode.children = node.children.splice(mid + 1);
    this._insertIntoParent(node, promoted, newNode);
  }

  /**
   * @param {BPlusNode} cur
   * @param {BPlusNode} child
   * @returns {BPlusNode | null}
   */
  _findParent(cur, child) {
    if (cur.leaf) return null;
    for (const c of cur.children) {
      if (c === child) return cur;
      const res = this._findParent(c, child);
      if (res) return res;
    }
    return null;
  }
}

module.exports = {
  BPlusTree,
  BPlusNode,
};
