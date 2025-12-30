// Backtracking algorithms

/**
 * All permutations of an array.
 * @param {any[]} arr
 * @returns {any[][]}
 */
function permutations(arr) {
  const out = [];
  const used = new Array(arr.length).fill(false);
  const path = [];
  /**
   * @returns {void}
   */
  function dfs() {
    if (path.length === arr.length) {
      out.push(path.slice());
      return;
    }
    for (let i = 0; i < arr.length; i += 1) {
      if (used[i]) continue;
      used[i] = true;
      path.push(arr[i]);
      dfs();
      path.pop();
      used[i] = false;
    }
  }
  dfs();
  return out;
}

/**
 * All subsets of an array.
 * @param {any[]} arr
 * @returns {any[][]}
 */
function subsets(arr) {
  const out = [];
  const path = [];
  /**
   * @param {number} i
   * @returns {void}
   */
  function dfs(i) {
    if (i === arr.length) {
      out.push(path.slice());
      return;
    }
    dfs(i + 1);
    path.push(arr[i]);
    dfs(i + 1);
    path.pop();
  }
  dfs(0);
  return out;
}

/**
 * All solutions to the n-queens problem.
 * @param {number} n
 * @returns {string[][]}
 */
function nQueens(n) {
  const out = [];
  const cols = new Set();
  const diag1 = new Set();
  const diag2 = new Set();
  const board = new Array(n).fill(null).map(() => new Array(n).fill("."));
  /**
   * @param {number} r
   * @returns {void}
   */
  function dfs(r) {
    if (r === n) {
      out.push(board.map((row) => row.join("")));
      return;
    }
    for (let c = 0; c < n; c += 1) {
      const d1 = r - c;
      const d2 = r + c;
      if (cols.has(c) || diag1.has(d1) || diag2.has(d2)) continue;
      cols.add(c);
      diag1.add(d1);
      diag2.add(d2);
      board[r][c] = "Q";
      dfs(r + 1);
      board[r][c] = ".";
      cols.delete(c);
      diag1.delete(d1);
      diag2.delete(d2);
    }
  }
  dfs(0);
  return out;
}

module.exports = {
  permutations,
  subsets,
  nQueens,
};
