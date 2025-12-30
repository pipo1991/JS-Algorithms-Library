// Heap algorithms

const { MinHeap } = require("../dataStructures/heap");

/**
 * Heap sort using MinHeap.
 * @param {number[]} arr
 * @returns {number[]}
 */
function heapSort(arr) {
  const heap = new MinHeap(arr);
  const out = [];
  while (heap.size() > 0) out.push(heap.pop());
  return out;
}

module.exports = {
  heapSort,
};
