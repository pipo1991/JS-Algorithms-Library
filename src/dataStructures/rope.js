// Rope (binary tree for large strings)

/**
 * Rope node.
 */
class RopeNode {
  /**
   * @param {string} [value]
   * @param {RopeNode | null} [left]
   * @param {RopeNode | null} [right]
   */
  constructor(value = "", left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
    this.weight = left ? left.length() : value.length;
  }

  /**
   * @returns {number}
   */
  length() {
    const leftLen = this.left ? this.left.length() : 0;
    const rightLen = this.right ? this.right.length() : 0;
    return leftLen + rightLen + this.value.length;
  }
}

/**
 * Rope for efficient string operations.
 */
class Rope {
  /**
   * @param {string} [text]
   */
  constructor(text = "") {
    this.root = new RopeNode(text);
  }

  /**
   * @param {Rope} other
   * @returns {void}
   */
  concat(other) {
    const newRoot = new RopeNode("", this.root, other.root);
    this.root = newRoot;
  }

  /**
   * @param {number} i
   * @returns {string | null}
   */
  index(i) {
    /**
     * @param {RopeNode | null} node
     * @param {number} idx
     * @returns {string | null}
     */
    function walk(node, idx) {
      if (!node) return null;
      const leftLen = node.left ? node.left.length() : 0;
      if (idx < leftLen) return walk(node.left, idx);
      if (idx < leftLen + node.value.length) return node.value[idx - leftLen];
      return walk(node.right, idx - leftLen - node.value.length);
    }
    return walk(this.root, i);
  }

  /**
   * @returns {string}
   */
  toString() {
    const parts = [];
    /**
     * @param {RopeNode | null} node
     * @returns {void}
     */
    function dfs(node) {
      if (!node) return;
      dfs(node.left);
      if (node.value) parts.push(node.value);
      dfs(node.right);
    }
    dfs(this.root);
    return parts.join("");
  }
}

module.exports = {
  Rope,
  RopeNode,
};
