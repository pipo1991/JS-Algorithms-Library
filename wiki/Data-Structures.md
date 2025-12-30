# Data Structures

Data structures live under `src/dataStructures/`. Signatures and complexities
below reflect the current implementations. Helper methods prefixed with `_` are
omitted from the tables.

Notes:
- `*` marks implementation-specific complexity details (for example, extra
  allocations or JavaScript array behavior).

## Trees (`src/dataStructures/trees.js`)

Usage Notes:
- `BinaryTree.find` performs a BFS and returns the first matching node.
- Nodes are plain objects with `value`, `left`, and `right` fields.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| TreeNode.constructor | `new TreeNode(value: any, left?: TreeNode \| null, right?: TreeNode \| null)` | O(1), O(1) | `new TreeNode(1)` |
| BinaryTree.constructor | `new BinaryTree(root?: TreeNode \| null)` | O(1), O(1) | `new BinaryTree()` |
| BinaryTree.setRoot | `BinaryTree.setRoot(value: any) -> TreeNode` | O(1), O(1) | `tree.setRoot(1)` |
| BinaryTree.insertLeft | `BinaryTree.insertLeft(parent: TreeNode, value: any) -> TreeNode` | O(1), O(1) | `tree.insertLeft(tree.root, 2)` |
| BinaryTree.insertRight | `BinaryTree.insertRight(parent: TreeNode, value: any) -> TreeNode` | O(1), O(1) | `tree.insertRight(tree.root, 3)` |
| BinaryTree.find | `BinaryTree.find(value: any) -> TreeNode \| null` | O(n), O(n) | `tree.find(2)` |

## Heap (`src/dataStructures/heap.js`)

Usage Notes:
- Min-heap ordering is numeric and ascending.
- `pop` and `peek` return `null` when empty.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| MinHeap.constructor | `new MinHeap(values?: number[])` | O(n log n)*, O(n) | `new MinHeap([5,1,3])` |
| MinHeap.size | `MinHeap.size() -> number` | O(1), O(1) | `heap.size()` |
| MinHeap.peek | `MinHeap.peek() -> number \| null` | O(1), O(1) | `heap.peek()` |
| MinHeap.push | `MinHeap.push(value: number) -> void` | O(log n), O(1) | `heap.push(2)` |
| MinHeap.pop | `MinHeap.pop() -> number \| null` | O(log n), O(1) | `heap.pop()` |

## Trie (`src/dataStructures/trie.js`)

Usage Notes:
- Trie operations are case-sensitive.
- `search` returns true only for full words, not prefixes.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| TrieNode.constructor | `new TrieNode()` | O(1), O(1) | `new TrieNode()` |
| Trie.constructor | `new Trie()` | O(1), O(1) | `new Trie()` |
| Trie.insert | `Trie.insert(word: string) -> void` | O(L), O(L) new nodes | `trie.insert("apple")` |
| Trie.search | `Trie.search(word: string) -> boolean` | O(L), O(1) | `trie.search("apple")` |
| Trie.startsWith | `Trie.startsWith(prefix: string) -> boolean` | O(L), O(1) | `trie.startsWith("app")` |

## Union-Find (`src/dataStructures/unionFind.js`)

Usage Notes:
- `find` auto-adds missing items.
- Uses path compression and union by rank.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| UnionFind.constructor | `new UnionFind(items?: any[])` | O(n), O(n) | `new UnionFind(["A","B"])` |
| UnionFind.add | `UnionFind.add(item: any) -> void` | O(1) amortized, O(1) | `uf.add("C")` |
| UnionFind.find | `UnionFind.find(item: any) -> any` | Amortized O(alpha(n)), O(alpha(n)) stack | `uf.find("A")` |
| UnionFind.union | `UnionFind.union(a: any, b: any) -> boolean` | Amortized O(alpha(n)), O(1) | `uf.union("A", "B")` |

## Fenwick Tree (`src/dataStructures/fenwickTree.js`)

Usage Notes:
- Indices are 0-based for `update` and `query`.
- `rangeQuery` is inclusive of both ends.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| FenwickTree.constructor | `new FenwickTree(valuesOrSize: number[] \| number)` | O(n log n)*, O(n) | `new FenwickTree([1,2,3])` |
| FenwickTree.update | `FenwickTree.update(index: number, delta: number) -> void` | O(log n), O(1) | `bit.update(1, 5)` |
| FenwickTree.query | `FenwickTree.query(index: number) -> number` | O(log n), O(1) | `bit.query(2)` |
| FenwickTree.rangeQuery | `FenwickTree.rangeQuery(left: number, right: number) -> number` | O(log n), O(1) | `bit.rangeQuery(1, 3)` |

## Segment Tree (`src/dataStructures/segmentTree.js`)

Usage Notes:
- Queries are inclusive ranges `[left, right]`.
- `defaultValue` should be the identity of `combine`.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| SegmentTree.constructor | `new SegmentTree(values: number[], combine?: (a: number, b: number) => number, defaultValue?: number)` | O(n), O(n) | `new SegmentTree([1,2,3])` |
| SegmentTree.update | `SegmentTree.update(index: number, value: number) -> void` | O(log n), O(1) | `seg.update(1, 5)` |
| SegmentTree.query | `SegmentTree.query(left: number, right: number) -> number` | O(log n), O(1) | `seg.query(0, 2)` |

### Lazy Segment Tree

Usage Notes:
- `rangeAdd` increments values in `[left, right]`.
- `query` returns the combined value for the range.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| LazySegmentTree.constructor | `new LazySegmentTree(values: number[], combine?: (a: number, b: number) => number, defaultValue?: number)` | O(n), O(n) | `new LazySegmentTree([1,2,3])` |
| LazySegmentTree.rangeAdd | `LazySegmentTree.rangeAdd(left: number, right: number, delta: number) -> void` | O(log n), O(1) | `lazy.rangeAdd(0, 1, 2)` |
| LazySegmentTree.query | `LazySegmentTree.query(left: number, right: number) -> number` | O(log n), O(1) | `lazy.query(0, 2)` |

## AVL Tree (`src/dataStructures/avlTree.js`)

Usage Notes:
- Only insertion and search are implemented.
- Provide a comparator for non-numeric keys.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| AVLNode.constructor | `new AVLNode(value: any)` | O(1), O(1) | `new AVLNode(5)` |
| AVLTree.constructor | `new AVLTree(compare?: (a: any, b: any) => number)` | O(1), O(1) | `new AVLTree()` |
| AVLTree.insert | `AVLTree.insert(value: any) -> void` | O(log n), O(log n) | `avl.insert(5)` |
| AVLTree.search | `AVLTree.search(value: any) -> AVLNode \| null` | O(log n), O(1) | `avl.search(5)` |
| AVLTree.inorder | `AVLTree.inorder(visit: (value: any) => void) -> void` | O(n), O(h) | `avl.inorder(v => out.push(v))` |

## Red-Black Tree (`src/dataStructures/redBlackTree.js`)

Usage Notes:
- Only insertion and search are implemented.
- Provide a comparator for non-numeric keys.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| RBNode.constructor | `new RBNode(value: any, color?: boolean)` | O(1), O(1) | `new RBNode(5)` |
| RedBlackTree.constructor | `new RedBlackTree(compare?: (a: any, b: any) => number)` | O(1), O(1) | `new RedBlackTree()` |
| RedBlackTree.insert | `RedBlackTree.insert(value: any) -> void` | O(log n), O(log n) | `rb.insert(5)` |
| RedBlackTree.search | `RedBlackTree.search(value: any) -> RBNode \| null` | O(log n), O(1) | `rb.search(5)` |
| RedBlackTree.inorder | `RedBlackTree.inorder(visit: (value: any) => void) -> void` | O(n), O(h) | `rb.inorder(v => out.push(v))` |

## Stack (`src/dataStructures/stack.js`)

Usage Notes:
- `pop` and `peek` return `null` when empty.
- Stack order is LIFO.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| Stack.constructor | `new Stack(values?: any[])` | O(n), O(n) | `new Stack([1,2])` |
| Stack.push | `Stack.push(value: any) -> void` | O(1), O(1) | `stack.push(3)` |
| Stack.pop | `Stack.pop() -> any \| null` | O(1), O(1) | `stack.pop()` |
| Stack.peek | `Stack.peek() -> any \| null` | O(1), O(1) | `stack.peek()` |
| Stack.size | `Stack.size() -> number` | O(1), O(1) | `stack.size()` |
| Stack.isEmpty | `Stack.isEmpty() -> boolean` | O(1), O(1) | `stack.isEmpty()` |

## Queue (`src/dataStructures/queue.js`)

Usage Notes:
- `dequeue` returns `null` when empty.
- Internal array compaction happens on growth.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| Queue.constructor | `new Queue(values?: any[])` | O(n), O(n) | `new Queue([1,2])` |
| Queue.enqueue | `Queue.enqueue(value: any) -> void` | O(1), O(1) | `queue.enqueue(3)` |
| Queue.dequeue | `Queue.dequeue() -> any \| null` | Amortized O(1), O(1) | `queue.dequeue()` |
| Queue.peek | `Queue.peek() -> any \| null` | O(1), O(1) | `queue.peek()` |
| Queue.size | `Queue.size() -> number` | O(1), O(1) | `queue.size()` |
| Queue.isEmpty | `Queue.isEmpty() -> boolean` | O(1), O(1) | `queue.isEmpty()` |

## Deque (`src/dataStructures/deque.js`)

Usage Notes:
- All operations are O(1) with object-backed storage.
- `popFront` and `popBack` return `null` when empty.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| Deque.constructor | `new Deque()` | O(1), O(1) | `new Deque()` |
| Deque.pushFront | `Deque.pushFront(value: any) -> void` | O(1), O(1) | `deque.pushFront(1)` |
| Deque.pushBack | `Deque.pushBack(value: any) -> void` | O(1), O(1) | `deque.pushBack(2)` |
| Deque.popFront | `Deque.popFront() -> any \| null` | O(1), O(1) | `deque.popFront()` |
| Deque.popBack | `Deque.popBack() -> any \| null` | O(1), O(1) | `deque.popBack()` |
| Deque.peekFront | `Deque.peekFront() -> any \| null` | O(1), O(1) | `deque.peekFront()` |
| Deque.peekBack | `Deque.peekBack() -> any \| null` | O(1), O(1) | `deque.peekBack()` |
| Deque.size | `Deque.size() -> number` | O(1), O(1) | `deque.size()` |
| Deque.isEmpty | `Deque.isEmpty() -> boolean` | O(1), O(1) | `deque.isEmpty()` |

## Priority Queue (`src/dataStructures/priorityQueue.js`)

Usage Notes:
- Lower comparator values indicate higher priority.
- `pop` returns `null` when empty.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| PriorityQueue.constructor | `new PriorityQueue(compare?: (a: any, b: any) => number, values?: any[])` | O(n log n)*, O(n) | `new PriorityQueue()` |
| PriorityQueue.size | `PriorityQueue.size() -> number` | O(1), O(1) | `pq.size()` |
| PriorityQueue.peek | `PriorityQueue.peek() -> any \| null` | O(1), O(1) | `pq.peek()` |
| PriorityQueue.push | `PriorityQueue.push(value: any) -> void` | O(log n), O(1) | `pq.push(2)` |
| PriorityQueue.pop | `PriorityQueue.pop() -> any \| null` | O(log n), O(1) | `pq.pop()` |

## Hash Map (`src/dataStructures/hashMap.js`)

Usage Notes:
- Keys use strict equality (`===`).
- Resizes when load factor exceeds 0.7.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| HashMap.constructor | `new HashMap(capacity?: number)` | O(n) buckets, O(n) | `new HashMap()` |
| HashMap.set | `HashMap.set(key: any, value: any) -> void` | Avg O(1), worst O(n), O(1) | `map.set("a", 1)` |
| HashMap.get | `HashMap.get(key: any) -> any \| null` | Avg O(1), worst O(n), O(1) | `map.get("a")` |
| HashMap.has | `HashMap.has(key: any) -> boolean` | Avg O(1), worst O(n), O(1) | `map.has("a")` |
| HashMap.delete | `HashMap.delete(key: any) -> boolean` | Avg O(1), worst O(n), O(1) | `map.delete("a")` |
| HashMap.size | `HashMap.size() -> number` | O(1), O(1) | `map.size()` |
| HashMap.keys | `HashMap.keys() -> any[]` | O(n), O(n) | `map.keys()` |
| HashMap.values | `HashMap.values() -> any[]` | O(n), O(n) | `map.values()` |
| HashMap.entries | `HashMap.entries() -> any[][]` | O(n), O(n) | `map.entries()` |

## LRU Cache (`src/dataStructures/lruCache.js`)

Usage Notes:
- `get` refreshes recency ordering.
- Eviction removes the least-recently used key.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| LRUCache.constructor | `new LRUCache(capacity: number)` | O(1), O(capacity) | `new LRUCache(2)` |
| LRUCache.get | `LRUCache.get(key: any) -> any \| null` | O(1), O(1) | `cache.get("a")` |
| LRUCache.set | `LRUCache.set(key: any, value: any) -> void` | O(1), O(1) | `cache.set("a", 1)` |
| LRUCache.has | `LRUCache.has(key: any) -> boolean` | O(1), O(1) | `cache.has("a")` |
| LRUCache.delete | `LRUCache.delete(key: any) -> boolean` | O(1), O(1) | `cache.delete("a")` |
| LRUCache.size | `LRUCache.size() -> number` | O(1), O(1) | `cache.size()` |

## Bloom Filter (`src/dataStructures/bloomFilter.js`)

Usage Notes:
- Bloom filters allow false positives but not false negatives.
- `size` is in bits, not bytes.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| BloomFilter.constructor | `new BloomFilter(size: number, hashCount?: number)` | O(size), O(size) | `new BloomFilter(128)` |
| BloomFilter.add | `BloomFilter.add(value: any) -> void` | O(k * L), O(1) | `bf.add("x")` |
| BloomFilter.has | `BloomFilter.has(value: any) -> boolean` | O(k * L), O(1) | `bf.has("x")` |

## Skip List (`src/dataStructures/skipList.js`)

Usage Notes:
- Inserting duplicates returns `false` and does not modify the list.
- Random levels make performance probabilistic.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| SkipNode.constructor | `new SkipNode(value: any, level: number)` | O(level), O(level) | `new SkipNode(5, 3)` |
| SkipList.constructor | `new SkipList(maxLevel?: number, p?: number, compare?: (a: any, b: any) => number)` | O(maxLevel), O(maxLevel) | `new SkipList()` |
| SkipList.search | `SkipList.search(value: any) -> SkipNode \| null` | Avg O(log n), worst O(n), O(1) | `skip.search(5)` |
| SkipList.insert | `SkipList.insert(value: any) -> boolean` | Avg O(log n), worst O(n), O(1) | `skip.insert(5)` |
| SkipList.remove | `SkipList.remove(value: any) -> boolean` | Avg O(log n), worst O(n), O(1) | `skip.remove(5)` |
| SkipList.size | `SkipList.size() -> number` | O(1), O(1) | `skip.size()` |

## Graph (`src/dataStructures/graph.js`)

Usage Notes:
- Graphs are undirected by default; pass `true` for directed.
- `edges()` deduplicates edges for undirected graphs.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| Graph.constructor | `new Graph(directed?: boolean)` | O(1), O(1) | `new Graph()` |
| Graph.addNode | `Graph.addNode(node: string) -> void` | O(1), O(1) | `g.addNode("A")` |
| Graph.addEdge | `Graph.addEdge(from: string, to: string, weight?: number) -> void` | O(1), O(1) | `g.addEdge("A", "B", 2)` |
| Graph.removeEdge | `Graph.removeEdge(from: string, to: string) -> void` | O(deg), O(1) | `g.removeEdge("A", "B")` |
| Graph.neighbors | `Graph.neighbors(node: string) -> Array<[string, number]>` | O(deg), O(deg) | `g.neighbors("A")` |
| Graph.nodes | `Graph.nodes() -> string[]` | O(V), O(V) | `g.nodes()` |
| Graph.edges | `Graph.edges() -> Array<[string, string, number]>` | O(V + E), O(E) | `g.edges()` |

## Rope (`src/dataStructures/rope.js`)

Usage Notes:
- `concat` mutates the current rope by updating its root.
- `index` returns `null` for out-of-range indices.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| RopeNode.constructor | `new RopeNode(value?: string, left?: RopeNode \| null, right?: RopeNode \| null)` | O(1), O(1) | `new RopeNode("hi")` |
| Rope.constructor | `new Rope(text?: string)` | O(1), O(1) | `new Rope("hello")` |
| Rope.concat | `Rope.concat(other: Rope) -> void` | O(1), O(1) | `rope.concat(new Rope("!"))` |
| Rope.index | `Rope.index(i: number) -> string \| null` | O(h), O(h) | `rope.index(3)` |
| Rope.toString | `Rope.toString() -> string` | O(n), O(n) | `rope.toString()` |

## Treap (`src/dataStructures/treap.js`)

Usage Notes:
- Treap priorities are randomized on insert.
- Only insert and search are implemented.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| TreapNode.constructor | `new TreapNode(key: any, priority?: number)` | O(1), O(1) | `new TreapNode(5)` |
| Treap.constructor | `new Treap(compare?: (a: any, b: any) => number)` | O(1), O(1) | `new Treap()` |
| Treap.insert | `Treap.insert(key: any) -> void` | Avg O(log n), worst O(n), O(log n) | `treap.insert(5)` |
| Treap.search | `Treap.search(key: any) -> TreapNode \| null` | Avg O(log n), worst O(n), O(1) | `treap.search(5)` |

## Interval Tree (`src/dataStructures/intervalTree.js`)

Usage Notes:
- Intervals are `[start, end]` and treated as closed ranges.
- Queries return all intervals containing the point.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| IntervalNode.constructor | `new IntervalNode(center: number, intervals?: Array<[number, number]>)` | O(1), O(1) | `new IntervalNode(5)` |
| IntervalTree.constructor | `new IntervalTree(intervals?: Array<[number, number]>)` | O(n log^2 n)*, O(n) | `new IntervalTree([[1,3],[2,5]])` |
| IntervalTree.query | `IntervalTree.query(point: number) -> Array<[number, number]>` | O(n) worst, O(1) extra | `tree.query(2)` |

## B-Tree (`src/dataStructures/bTree.js`)

Usage Notes:
- Keys are numbers; no delete method is implemented.
- Minimum degree `t` controls node capacity.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| BTreeNode.constructor | `new BTreeNode(t: number, leaf?: boolean)` | O(1), O(1) | `new BTreeNode(2)` |
| BTreeNode.search | `BTreeNode.search(key: number) -> BTreeNode \| null` | O(log n), O(1) | `node.search(5)` |
| BTreeNode.splitChild | `BTreeNode.splitChild(i: number, y: BTreeNode) -> void` | O(t), O(1) | `node.splitChild(0, child)` |
| BTreeNode.insertNonFull | `BTreeNode.insertNonFull(key: number) -> void` | O(t log n), O(1) | `node.insertNonFull(5)` |
| BTree.constructor | `new BTree(t?: number)` | O(1), O(1) | `new BTree(2)` |
| BTree.search | `BTree.search(key: number) -> BTreeNode \| null` | O(log n), O(1) | `bt.search(5)` |
| BTree.insert | `BTree.insert(key: number) -> void` | O(t log n), O(log n) | `bt.insert(5)` |

## B+ Tree (`src/dataStructures/bPlusTree.js`)

Usage Notes:
- Keys are numbers; only insert and search are implemented.
- Leaves are linked via `next` for range scans.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| BPlusNode.constructor | `new BPlusNode(t: number, leaf?: boolean)` | O(1), O(1) | `new BPlusNode(2)` |
| BPlusTree.constructor | `new BPlusTree(t?: number)` | O(1), O(1) | `new BPlusTree(2)` |
| BPlusTree.search | `BPlusTree.search(key: number) -> boolean` | O(log n), O(1) | `bpt.search(5)` |
| BPlusTree.insert | `BPlusTree.insert(key: number) -> void` | O(log n + t log t)*, O(log n) | `bpt.insert(5)` |

## Suffix Tree (`src/dataStructures/suffixTree.js`)

Usage Notes:
- Construction is naive and quadratic in input length.
- `contains` checks for substring existence, not suffix-only.

| Method | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| SuffixTreeNode.constructor | `new SuffixTreeNode()` | O(1), O(1) | `new SuffixTreeNode()` |
| SuffixTree.constructor | `new SuffixTree(text?: string)` | O(n^2), O(n^2) | `new SuffixTree("banana")` |
| SuffixTree.contains | `SuffixTree.contains(pattern: string) -> boolean` | O(m), O(1) | `st.contains("ana")` |
