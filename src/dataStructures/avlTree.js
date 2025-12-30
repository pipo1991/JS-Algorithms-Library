// AVL tree

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
 * AVL tree node.
 */
class AVLNode {
  /**
   * @param {any} value
   */
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

/**
 * AVL tree.
 */
class AVLTree {
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
  }

  /**
   * @param {AVLNode | null} node
   * @param {any} value
   * @returns {AVLNode}
   */
  _insert(node, value) {
    if (node === null) return new AVLNode(value);
    const cmp = this.compare(value, node.value);
    if (cmp < 0) node.left = this._insert(node.left, value);
    else if (cmp > 0) node.right = this._insert(node.right, value);
    else return node;
    node.height = 1 + Math.max(this._height(node.left), this._height(node.right));
    return this._balance(node);
  }

  /**
   * @param {any} value
   * @returns {AVLNode | null}
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
     * @param {AVLNode | null} node
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
   * @param {AVLNode | null} node
   * @returns {number}
   */
  _height(node) {
    return node ? node.height : 0;
  }

  /**
   * @param {AVLNode} node
   * @returns {AVLNode}
   */
  _balance(node) {
    const balance = this._height(node.left) - this._height(node.right);
    if (balance > 1) {
      if (this._height(node.left.left) < this._height(node.left.right)) {
        node.left = this._rotateLeft(node.left);
      }
      return this._rotateRight(node);
    }
    if (balance < -1) {
      if (this._height(node.right.right) < this._height(node.right.left)) {
        node.right = this._rotateRight(node.right);
      }
      return this._rotateLeft(node);
    }
    return node;
  }

  /**
   * @param {AVLNode} z
   * @returns {AVLNode}
   */
  _rotateLeft(z) {
    const y = z.right;
    const t2 = y.left;
    y.left = z;
    z.right = t2;
    z.height = 1 + Math.max(this._height(z.left), this._height(z.right));
    y.height = 1 + Math.max(this._height(y.left), this._height(y.right));
    return y;
  }

  /**
   * @param {AVLNode} z
   * @returns {AVLNode}
   */
  _rotateRight(z) {
    const y = z.left;
    const t3 = y.right;
    y.right = z;
    z.left = t3;
    z.height = 1 + Math.max(this._height(z.left), this._height(z.right));
    y.height = 1 + Math.max(this._height(y.left), this._height(y.right));
    return y;
  }
}

module.exports = {
  AVLTree,
  AVLNode,
};
