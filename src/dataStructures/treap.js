// Treap (randomized BST)

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
 * Treap node.
 */
class TreapNode {
  /**
   * @param {any} key
   * @param {number} [priority]
   */
  constructor(key, priority = Math.random()) {
    this.key = key;
    this.priority = priority;
    this.left = null;
    this.right = null;
  }
}

/**
 * Treap (randomized BST).
 */
class Treap {
  /**
   * @param {(a: any, b: any) => number} [compare]
   */
  constructor(compare = defaultCompare) {
    this.root = null;
    this.compare = compare;
  }

  /**
   * @param {any} key
   * @returns {void}
   */
  insert(key) {
    this.root = this._insert(this.root, new TreapNode(key));
  }

  /**
   * @param {TreapNode | null} root
   * @param {TreapNode} node
   * @returns {TreapNode}
   */
  _insert(root, node) {
    if (!root) return node;
    const cmp = this.compare(node.key, root.key);
    if (cmp < 0) {
      root.left = this._insert(root.left, node);
      if (root.left.priority < root.priority) root = this._rotateRight(root);
    } else if (cmp > 0) {
      root.right = this._insert(root.right, node);
      if (root.right.priority < root.priority) root = this._rotateLeft(root);
    }
    return root;
  }

  /**
   * @param {any} key
   * @returns {TreapNode | null}
   */
  search(key) {
    let node = this.root;
    while (node) {
      const cmp = this.compare(key, node.key);
      if (cmp === 0) return node;
      node = cmp < 0 ? node.left : node.right;
    }
    return null;
  }

  /**
   * @param {TreapNode} x
   * @returns {TreapNode}
   */
  _rotateLeft(x) {
    const y = x.right;
    x.right = y.left;
    y.left = x;
    return y;
  }

  /**
   * @param {TreapNode} y
   * @returns {TreapNode}
   */
  _rotateRight(y) {
    const x = y.left;
    y.left = x.right;
    x.right = y;
    return x;
  }
}

module.exports = {
  Treap,
  TreapNode,
};
