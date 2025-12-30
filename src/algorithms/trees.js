// Tree algorithms

/**
 * Inorder traversal.
 * @param {{ value: any, left: any, right: any } | null} node
 * @param {(value: any) => void} visit
 * @returns {void}
 */
function inorder(node, visit) {
  if (node === null) return;
  inorder(node.left, visit);
  visit(node.value);
  inorder(node.right, visit);
}

/**
 * Preorder traversal.
 * @param {{ value: any, left: any, right: any } | null} node
 * @param {(value: any) => void} visit
 * @returns {void}
 */
function preorder(node, visit) {
  if (node === null) return;
  visit(node.value);
  preorder(node.left, visit);
  preorder(node.right, visit);
}

/**
 * Postorder traversal.
 * @param {{ value: any, left: any, right: any } | null} node
 * @param {(value: any) => void} visit
 * @returns {void}
 */
function postorder(node, visit) {
  if (node === null) return;
  postorder(node.left, visit);
  postorder(node.right, visit);
  visit(node.value);
}

/**
 * Level-order traversal.
 * @param {{ value: any, left: any, right: any } | null} node
 * @param {(value: any) => void} visit
 * @returns {void}
 */
function levelOrder(node, visit) {
  if (node === null) return;
  const queue = [node];
  for (let i = 0; i < queue.length; i += 1) {
    const current = queue[i];
    visit(current.value);
    if (current.left) queue.push(current.left);
    if (current.right) queue.push(current.right);
  }
}

/**
 * Height of a binary tree.
 * @param {{ value: any, left: any, right: any } | null} node
 * @returns {number}
 */
function height(node) {
  if (node === null) return 0;
  return 1 + Math.max(height(node.left), height(node.right));
}

/**
 * Validate binary search tree property.
 * @param {{ value: number, left: any, right: any } | null} node
 * @param {number} [min]
 * @param {number} [max]
 * @returns {boolean}
 */
function isBST(node, min = -Infinity, max = Infinity) {
  if (node === null) return true;
  if (node.value <= min || node.value >= max) return false;
  return isBST(node.left, min, node.value) && isBST(node.right, node.value, max);
}

/**
 * Lowest common ancestor in a binary tree.
 * @param {{ value: any, left: any, right: any } | null} root
 * @param {any} p
 * @param {any} q
 * @returns {any}
 */
function lowestCommonAncestor(root, p, q) {
  if (root === null || root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left || right;
}

/**
 * Tree diameter in edges.
 * @param {{ value: any, left: any, right: any } | null} root
 * @returns {number}
 */
function treeDiameter(root) {
  let best = 0;
  /**
   * @param {{ left: any, right: any } | null} node
   * @returns {number}
   */
  function depth(node) {
    if (node === null) return -1;
    const left = depth(node.left);
    const right = depth(node.right);
    best = Math.max(best, left + right + 2);
    return Math.max(left, right) + 1;
  }
  depth(root);
  return best;
}

module.exports = {
  inorder,
  preorder,
  postorder,
  levelOrder,
  height,
  isBST,
  lowestCommonAncestor,
  treeDiameter,
};
