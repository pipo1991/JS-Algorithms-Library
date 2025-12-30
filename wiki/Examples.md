# Examples

## Arrays

```js
const lib = require("./src");
const idx = lib.algorithms.arrays.twoSum([2, 7, 11, 15], 9);
```

## Sorting

```js
const lib = require("./src");
const sorted = lib.algorithms.sorting.mergeSort([3, 1, 2]);
```

## Graphs

```js
const lib = require("./src");
const order = lib.algorithms.graphs.bfs(
  { A: ["B", "C"], B: ["D"], C: [], D: [] },
  "A"
);
```

## Trees

```js
const lib = require("./src");
const { BinaryTree, TreeNode } = lib.dataStructures.trees;
const tree = new BinaryTree(new TreeNode(1));
tree.insertLeft(tree.root, 2);
tree.insertRight(tree.root, 3);

const values = [];
lib.algorithms.trees.inorder(tree.root, (v) => values.push(v));
```

## Heap

```js
const lib = require("./src");
const { MinHeap } = lib.dataStructures.heap;
const heap = new MinHeap([5, 1, 3]);
const min = heap.pop();
```
