// Left-leaning red-black tree

const RED = true;
const BLACK = false;

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
 * Red-black tree node.
 */
class RBNode {
  /**
   * @param {any} value
   * @param {boolean} [color]
   */
  constructor(value, color = RED) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.color = color;
  }
}

/**
 * Left-leaning red-black tree.
 */
class RedBlackTree {
  /**
   * @param {(a: any, b: any) => number} [compare]
   */
  constructor(compare = defaultCompare) {
    this.root = null;
    this.compare = compare;
  }

  /**
   * @param {any} value
   * @returns {void}
   */
  insert(value) {
    this.root = this._insert(this.root, value);
    this.root.color = BLACK;
  }

  /**
   * @param {any} value
   * @returns {RBNode | null}
   */
  search(value) {
    let node = this.root;
    while (node !== null) {
      const cmp = this.compare(value, node.value);
      if (cmp === 0) return node;
      node = cmp < 0 ? node.left : node.right;
    }
    return null;
  }

  /**
   * @param {(value: any) => void} visit
   * @returns {void}
   */
  inorder(visit) {
    /**
     * @param {RBNode | null} node
     * @returns {void}
     */
    function walk(node) {
      if (node === null) return;
      walk(node.left);
      visit(node.value);
      walk(node.right);
    }
    walk(this.root);
  }

  /**
   * @param {RBNode | null} node
   * @returns {boolean}
   */
  _isRed(node) {
    return node !== null && node.color === RED;
  }

  /**
   * @param {RBNode} h
   * @returns {RBNode}
   */
  _rotateLeft(h) {
    const x = h.right;
    h.right = x.left;
    x.left = h;
    x.color = h.color;
    h.color = RED;
    return x;
  }

  /**
   * @param {RBNode} h
   * @returns {RBNode}
   */
  _rotateRight(h) {
    const x = h.left;
    h.left = x.right;
    x.right = h;
    x.color = h.color;
    h.color = RED;
    return x;
  }

  /**
   * @param {RBNode} h
   * @returns {void}
   */
  _flipColors(h) {
    h.color = RED;
    if (h.left) h.left.color = BLACK;
    if (h.right) h.right.color = BLACK;
  }

  /**
   * @param {RBNode | null} h
   * @param {any} value
   * @returns {RBNode}
   */
  _insert(h, value) {
    if (h === null) return new RBNode(value);
    const cmp = this.compare(value, h.value);
    if (cmp < 0) h.left = this._insert(h.left, value);
    else if (cmp > 0) h.right = this._insert(h.right, value);
    else return h;

    if (this._isRed(h.right) && !this._isRed(h.left)) h = this._rotateLeft(h);
    if (this._isRed(h.left) && this._isRed(h.left.left)) h = this._rotateRight(h);
    if (this._isRed(h.left) && this._isRed(h.right)) this._flipColors(h);
    return h;
  }
}

module.exports = {
  RedBlackTree,
  RBNode,
};
