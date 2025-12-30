// Tree data structures

/**
 * Binary tree node.
 */
class TreeNode {
  /**
   * @param {any} value
   * @param {TreeNode | null} [left]
   * @param {TreeNode | null} [right]
   */
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

/**
 * Binary tree container.
 */
class BinaryTree {
  /**
   * @param {TreeNode | null} [root]
   */
  constructor(root = null) {
    this.root = root;
  }

  /**
   * @param {any} value
   * @returns {TreeNode}
   */
  setRoot(value) {
    this.root = new TreeNode(value);
    return this.root;
  }

  /**
   * @param {TreeNode} parent
   * @param {any} value
   * @returns {TreeNode}
   */
  insertLeft(parent, value) {
    const node = new TreeNode(value);
    parent.left = node;
    return node;
  }

  /**
   * @param {TreeNode} parent
   * @param {any} value
   * @returns {TreeNode}
   */
  insertRight(parent, value) {
    const node = new TreeNode(value);
    parent.right = node;
    return node;
  }

  /**
   * BFS search by value.
   * @param {any} value
   * @returns {TreeNode | null}
   */
  find(value) {
    if (this.root === null) return null;
    const queue = [this.root];
    for (let i = 0; i < queue.length; i += 1) {
      const node = queue[i];
      if (node.value === value) return node;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    return null;
  }
}

module.exports = {
  TreeNode,
  BinaryTree,
};
