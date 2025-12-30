# brew install gh

A small JavaScript library of algorithms and data structures, organized by domain.

Project wiki: [wiki/Home.md](wiki/Home.md)

## Install

```bash
npm install
```

## Usage

```js
const lib = require("./src");

// Arrays
const idx = lib.algorithms.arrays.twoSum([2, 7, 11, 15], 9);

// Sorting
const sorted = lib.algorithms.sorting.mergeSort([3, 1, 2]);

// Searching
const pos = lib.algorithms.searching.binarySearch([1, 3, 5, 7], 5);

// Graphs
const order = lib.algorithms.graphs.bfs({ A: ["B", "C"], B: ["D"], C: [], D: [] }, "A");

// Strings
const i = lib.algorithms.strings.kmpSearch("ababc", "abc");

// Math
const g = lib.algorithms.math.gcd(24, 36);

// DP
const lis = lib.algorithms.dp.longestIncreasingSubsequence([3, 1, 2, 5, 4]);

// Trees (data structures)
const { BinaryTree, TreeNode } = lib.dataStructures.trees;
const tree = new BinaryTree(new TreeNode(1));
const left = tree.insertLeft(tree.root, 2);
const right = tree.insertRight(tree.root, 3);

// Trees (algorithms)
const values = [];
lib.algorithms.trees.inorder(tree.root, (v) => values.push(v));

// Heap (data structures)
const { MinHeap } = lib.dataStructures.heap;
const heap = new MinHeap([5, 1, 3]);
const min = heap.pop();

// Heap (algorithms)
const hs = lib.algorithms.heap.heapSort([4, 2, 7, 1]);
```

## Structure

```
src/
  algorithms/
    arrays.js
    sorting.js
    searching.js
    graphs.js
    strings.js
    math.js
    dp.js
    trees.js
    heap.js
    geometry.js
    random.js
    bit.js
    greedy.js
    parsing.js
    backtracking.js
    streaming.js
    numeric.js
  dataStructures/
    trees.js
    heap.js
    trie.js
    unionFind.js
    fenwickTree.js
    segmentTree.js
    avlTree.js
    redBlackTree.js
    stack.js
    queue.js
    deque.js
    priorityQueue.js
    hashMap.js
    lruCache.js
    bloomFilter.js
    skipList.js
    graph.js
    rope.js
    treap.js
    intervalTree.js
    bTree.js
    bPlusTree.js
    suffixTree.js
  index.js
```

## API Overview

Algorithms:
- arrays: `twoSum`, `prefixSums`, `maxSubarraySum`, `rotateArray`, `slidingWindowMax`, `quickselect`
- sorting: `quickSort`, `mergeSort`
- searching: `binarySearch`, `lowerBound`, `upperBound`
- graphs: `bfs`, `dfs`, `dijkstra`, `topologicalSort`, `primMST`, `kruskalMST`, `bellmanFord`, `floydWarshall`, `sccKosaraju`
- strings: `kmpSearch`, `isPalindrome`, `longestCommonPrefix`, `rabinKarpSearch`, `editDistance`, `zAlgorithm`, `suffixArray`
- math: `gcd`, `lcm`, `modPow`, `sieve`
- dp: `fib`, `coinChangeMinCoins`, `longestIncreasingSubsequence`, `knapsack01`, `lcs`
- trees: `inorder`, `preorder`, `postorder`, `levelOrder`, `height`, `isBST`, `lowestCommonAncestor`, `treeDiameter`
- heap: `heapSort`
- geometry: `convexHull`, `lineSweepMaxOverlap`
- random: `shuffle`, `reservoirSample`
- bit: `popcount32`, `iterateSubsets`, `setBit`, `clearBit`, `toggleBit`, `testBit`
- greedy: `intervalScheduling`, `activitySelection`
- parsing: `tokenize`, `shuntingYard`, `evaluateExpression`
- backtracking: `permutations`, `subsets`, `nQueens`
- streaming: `misraGries`, `CountMinSketch`
- numeric: `fft`, `ifft`, `multiplyMatrices`

Data structures:
- trees: `TreeNode`, `BinaryTree`
- heap: `MinHeap`
- trie: `Trie`, `TrieNode`
- union-find: `UnionFind`
- fenwick-tree: `FenwickTree`
- segment-tree: `SegmentTree`, `LazySegmentTree`
- avl-tree: `AVLTree`, `AVLNode`
- red-black-tree: `RedBlackTree`, `RBNode`
- stack: `Stack`
- queue: `Queue`
- deque: `Deque`
- priority-queue: `PriorityQueue`
- hash-map: `HashMap`
- lru-cache: `LRUCache`
- bloom-filter: `BloomFilter`
- skip-list: `SkipList`, `SkipNode`
- graph: `Graph`
- rope: `Rope`, `RopeNode`
- treap: `Treap`, `TreapNode`
- interval-tree: `IntervalTree`, `IntervalNode`
- b-tree: `BTree`, `BTreeNode`
- b-plus-tree: `BPlusTree`, `BPlusNode`
- suffix-tree: `SuffixTree`, `SuffixTreeNode`

## Notes

- Algorithms are pure and return new results without mutating inputs (unless otherwise implied).
- Search-style algorithms return `null` when no result is found (e.g., `binarySearch`, `kmpSearch`).
- Invalid inputs return `null` instead of throwing (e.g., `evaluateExpression`, `fft`).
- Unreachable DP states return `null` (e.g., `coinChangeMinCoins`).
- Tree algorithms accept a `TreeNode` (e.g., `tree.root`).
