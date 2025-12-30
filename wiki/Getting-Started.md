# Getting Started

## Install

```bash
npm install
```

## Usage

```js
const lib = require("./src");

const idx = lib.algorithms.arrays.twoSum([2, 7, 11, 15], 9);
const sorted = lib.algorithms.sorting.mergeSort([3, 1, 2]);
const pos = lib.algorithms.searching.binarySearch([1, 3, 5, 7], 5);
```

## Import Map

- Algorithms are exported at `lib.algorithms.<domain>`.
- Data structures are exported at `lib.dataStructures.<domain>`.

Example:

```js
const { MinHeap } = lib.dataStructures.heap;
const heap = new MinHeap([5, 1, 3]);
```
