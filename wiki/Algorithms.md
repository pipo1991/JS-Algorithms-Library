# Algorithms

Algorithms are grouped by domain under `src/algorithms/`. Signatures and
complexities below are based on the current implementations.

Notes:
- `*` marks implementation-specific complexity details (for example, extra
  allocations or JavaScript array behavior).

## Arrays (`src/algorithms/arrays.js`)

Usage Notes:
- `twoSum` returns `null` when no pair is found.
- `rotateArray` supports negative `k` values and returns a new array.
- `slidingWindowMax` returns `[]` when `k <= 0`.
- `quickselect` returns `null` for out-of-range `k`.

| Function | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| twoSum | `twoSum(nums: number[], target: number) -> number[] \| null` | O(n), O(n) | `twoSum([2,7,11,15], 9)` |
| prefixSums | `prefixSums(arr: number[]) -> number[]` | O(n), O(n) | `prefixSums([1,2,3])` |
| maxSubarraySum | `maxSubarraySum(arr: number[]) -> number` | O(n), O(1) | `maxSubarraySum([-2,1,-3,4])` |
| rotateArray | `rotateArray(arr: any[], k: number) -> any[]` | O(n), O(n) | `rotateArray([1,2,3], 1)` |
| slidingWindowMax | `slidingWindowMax(arr: number[], k: number) -> number[]` | O(n^2)*, O(n) | `slidingWindowMax([1,3,-1,-3,5], 3)` |
| quickselect | `quickselect(arr: number[], k: number) -> number \| null` | Avg O(n), worst O(n^2), O(n)* | `quickselect([7,2,5,3], 2)` |

## Sorting (`src/algorithms/sorting.js`)

Usage Notes:
- Both functions return new arrays and do not mutate inputs.
- Provide a comparator for custom ordering; default is ascending.

| Function | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| quickSort | `quickSort(arr: any[], compare?: (a: any, b: any) => number) -> any[]` | Avg O(n log n), worst O(n^2), O(n)* | `quickSort([3,1,2])` |
| mergeSort | `mergeSort(arr: any[], compare?: (a: any, b: any) => number) -> any[]` | O(n log n), O(n) | `mergeSort([3,1,2])` |

## Searching (`src/algorithms/searching.js`)

Usage Notes:
- Input arrays must be sorted with the same comparator used in search.
- `binarySearch` returns `null` when the target is not found.

| Function | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| binarySearch | `binarySearch(arr: any[], target: any, compare?: (a: any, b: any) => number) -> number \| null` | O(log n), O(1) | `binarySearch([1,3,5], 5)` |
| lowerBound | `lowerBound(arr: any[], target: any, compare?: (a: any, b: any) => number) -> number` | O(log n), O(1) | `lowerBound([1,2,2,3], 2)` |
| upperBound | `upperBound(arr: any[], target: any, compare?: (a: any, b: any) => number) -> number` | O(log n), O(1) | `upperBound([1,2,2,3], 2)` |

## Graphs (`src/algorithms/graphs.js`)

Usage Notes:
- Adjacency lists use string node ids; missing nodes are treated as having no edges.
- `dijkstra` and `primMST` assume non-negative edge weights.
- `topologicalSort` returns `null` when a cycle is detected.

| Function | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| bfs | `bfs(adjList: Record<string, string[]>, start: string) -> string[]` | O(V + E), O(V) | `bfs({A:["B"],B:[]}, "A")` |
| dfs | `dfs(adjList: Record<string, string[]>, start: string) -> string[]` | O(V + E), O(V) | `dfs({A:["B"],B:[]}, "A")` |
| dijkstra | `dijkstra(adjList: Record<string, Array<[string, number]>>, start: string) -> Record<string, number>` | O(V^2 + E), O(V) | `dijkstra({A:[["B",2]],B:[]}, "A")` |
| topologicalSort | `topologicalSort(adjList: Record<string, string[]>) -> string[] \| null` | O(V + E), O(V) | `topologicalSort({A:["B"],B:[]})` |
| primMST | `primMST(adjList: Record<string, Array<[string, number]>>, start?: string) -> { weight: number, edges: Array<[string, string, number]> }` | O(V^2 + E), O(V) | `primMST({A:[["B",1]],B:[["A",1]]})` |
| kruskalMST | `kruskalMST(nodes: string[], edges: Array<[string, string, number]>) -> { weight: number, edges: Array<[string, string, number]> }` | O(E log E), O(V + E) | `kruskalMST(["A","B"], [["A","B",1]])` |
| bellmanFord | `bellmanFord(nodes: string[], edges: Array<[string, string, number]>, start: string) -> { dist: Record<string, number>, hasNegativeCycle: boolean }` | O(V * E), O(V) | `bellmanFord(["A","B"], [["A","B",2]], "A")` |
| floydWarshall | `floydWarshall(nodes: string[], edges: Array<[string, string, number]>) -> Record<string, Record<string, number>>` | O(V^3), O(V^2) | `floydWarshall(["A","B"], [["A","B",2]])` |
| sccKosaraju | `sccKosaraju(adjList: Record<string, string[]>) -> string[][]` | O(V + E), O(V + E) | `sccKosaraju({A:["B"],B:["A"]})` |

## Strings (`src/algorithms/strings.js`)

Usage Notes:
- `kmpSearch` and `rabinKarpSearch` return `0` for empty patterns.
- `rabinKarpSearch` returns `null` if the pattern is longer than the text.

| Function | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| kmpSearch | `kmpSearch(text: string, pattern: string) -> number \| null` | O(n + m), O(m) | `kmpSearch("ababc", "abc")` |
| isPalindrome | `isPalindrome(s: string) -> boolean` | O(n), O(1) | `isPalindrome("racecar")` |
| longestCommonPrefix | `longestCommonPrefix(strings: string[]) -> string` | Worst O(N * L^2), O(1) extra | `longestCommonPrefix(["ab","abc"])` |
| rabinKarpSearch | `rabinKarpSearch(text: string, pattern: string) -> number \| null` | Avg O(n + m), worst O(n * m), O(1) | `rabinKarpSearch("hello", "ell")` |
| editDistance | `editDistance(a: string, b: string) -> number` | O(n * m), O(m) | `editDistance("kitten", "sitting")` |
| zAlgorithm | `zAlgorithm(s: string) -> number[]` | O(n), O(n) | `zAlgorithm("aaab")` |
| suffixArray | `suffixArray(s: string) -> number[]` | O(n log^2 n), O(n) | `suffixArray("banana")` |

## Math (`src/algorithms/math.js`)

Usage Notes:
- `modPow` assumes a non-zero modulus.
- `sieve` returns all primes up to and including `n`.

| Function | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| gcd | `gcd(a: number, b: number) -> number` | O(log min(a, b)), O(1) | `gcd(24, 36)` |
| lcm | `lcm(a: number, b: number) -> number` | O(log min(a, b)), O(1) | `lcm(6, 8)` |
| modPow | `modPow(base: number, exp: number, mod: number) -> number` | O(log exp), O(1) | `modPow(2, 10, 1000)` |
| sieve | `sieve(n: number) -> number[]` | O(n log log n), O(n) | `sieve(10)` |

## Dynamic Programming (`src/algorithms/dp.js`)

Usage Notes:
- `fib` returns `null` for negative inputs.
- `coinChangeMinCoins` returns `null` when no solution exists.

| Function | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| fib | `fib(n: number) -> number \| null` | O(n), O(1) | `fib(10)` |
| coinChangeMinCoins | `coinChangeMinCoins(coins: number[], amount: number) -> number \| null` | O(coins * amount), O(amount) | `coinChangeMinCoins([1,3,4], 6)` |
| longestIncreasingSubsequence | `longestIncreasingSubsequence(arr: number[]) -> number` | O(n log n), O(n) | `longestIncreasingSubsequence([3,1,2,5,4])` |
| knapsack01 | `knapsack01(values: number[], weights: number[], capacity: number) -> number` | O(n * capacity), O(capacity) | `knapsack01([6,10,12], [1,2,3], 5)` |
| lcs | `lcs(a: string, b: string) -> number` | O(n * m), O(m) | `lcs("abcde", "ace")` |

## Trees (`src/algorithms/trees.js`)

Usage Notes:
- Traversals expect a `TreeNode`-like structure with `value`, `left`, and `right`.
- `treeDiameter` reports edge count, not node count.

| Function | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| inorder | `inorder(node: { value: any, left: any, right: any } \| null, visit: (value: any) => void) -> void` | O(n), O(h) | `inorder(tree.root, v => out.push(v))` |
| preorder | `preorder(node: { value: any, left: any, right: any } \| null, visit: (value: any) => void) -> void` | O(n), O(h) | `preorder(tree.root, v => out.push(v))` |
| postorder | `postorder(node: { value: any, left: any, right: any } \| null, visit: (value: any) => void) -> void` | O(n), O(h) | `postorder(tree.root, v => out.push(v))` |
| levelOrder | `levelOrder(node: { value: any, left: any, right: any } \| null, visit: (value: any) => void) -> void` | O(n), O(n) | `levelOrder(tree.root, v => out.push(v))` |
| height | `height(node: { value: any, left: any, right: any } \| null) -> number` | O(n), O(h) | `height(tree.root)` |
| isBST | `isBST(node: { value: number, left: any, right: any } \| null, min?: number, max?: number) -> boolean` | O(n), O(h) | `isBST(tree.root)` |
| lowestCommonAncestor | `lowestCommonAncestor(root: { value: any, left: any, right: any } \| null, p: any, q: any) -> any` | O(n), O(h) | `lowestCommonAncestor(tree.root, a, b)` |
| treeDiameter | `treeDiameter(root: { value: any, left: any, right: any } \| null) -> number` | O(n), O(h) | `treeDiameter(tree.root)` |

## Heap (`src/algorithms/heap.js`)

Usage Notes:
- `heapSort` uses `MinHeap` and returns a new sorted array.
- Input arrays are assumed to contain numbers.

| Function | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| heapSort | `heapSort(arr: number[]) -> number[]` | O(n log n), O(n) | `heapSort([4,1,3])` |

## Geometry (`src/algorithms/geometry.js`)

Usage Notes:
- `convexHull` returns a new array and leaves inputs unmodified.
- `lineSweepMaxOverlap` treats intervals as closed ranges.

| Function | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| convexHull | `convexHull(points: Array<{ x: number, y: number }>) -> Array<{ x: number, y: number }>` | O(n log n), O(n) | `convexHull([{x:0,y:0},{x:1,y:1},{x:0,y:1}])` |
| lineSweepMaxOverlap | `lineSweepMaxOverlap(intervals: Array<[number, number]>) -> { max: number, point: number \| null }` | O(n log n), O(n) | `lineSweepMaxOverlap([[1,3],[2,5],[4,6]])` |

## Random (`src/algorithms/random.js`)

Usage Notes:
- Algorithms are randomized and non-deterministic across runs.
- `reservoirSample` expects `k >= 0`; for `k = 0`, it returns `[]`.

| Function | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| shuffle | `shuffle(arr: any[]) -> any[]` | O(n), O(n) | `shuffle([1,2,3])` |
| reservoirSample | `reservoirSample(stream: any[], k: number) -> any[]` | O(n), O(k) | `reservoirSample([1,2,3,4], 2)` |

## Bit (`src/algorithms/bit.js`)

Usage Notes:
- Operations assume 32-bit integer behavior.
- `iterateSubsets` returns all submasks including `0`.

| Function | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| popcount32 | `popcount32(n: number) -> number` | O(1), O(1) | `popcount32(13)` |
| iterateSubsets | `iterateSubsets(mask: number) -> number[]` | O(2^b), O(2^b) | `iterateSubsets(5)` |
| setBit | `setBit(n: number, i: number) -> number` | O(1), O(1) | `setBit(1, 2)` |
| clearBit | `clearBit(n: number, i: number) -> number` | O(1), O(1) | `clearBit(7, 1)` |
| toggleBit | `toggleBit(n: number, i: number) -> number` | O(1), O(1) | `toggleBit(4, 0)` |
| testBit | `testBit(n: number, i: number) -> boolean` | O(1), O(1) | `testBit(4, 2)` |

## Greedy (`src/algorithms/greedy.js`)

Usage Notes:
- Intervals are `[start, end]` with `end >= start`.
- `activitySelection` delegates to `intervalScheduling`.

| Function | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| intervalScheduling | `intervalScheduling(intervals: Array<[number, number]>) -> Array<[number, number]>` | O(n log n), O(n) | `intervalScheduling([[1,3],[2,4],[3,5]])` |
| activitySelection | `activitySelection(starts: number[], finishes: number[]) -> Array<[number, number]>` | O(n log n), O(n) | `activitySelection([1,3,0], [2,4,6])` |

## Parsing (`src/algorithms/parsing.js`)

Usage Notes:
- Invalid tokens or mismatched parentheses return `null`.
- Division uses JavaScript `/` and returns floating-point values.

| Function | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| tokenize | `tokenize(expr: string) -> string[] \| null` | O(n), O(n) | `tokenize("1+2*3")` |
| shuntingYard | `shuntingYard(tokens: string[] \| null) -> string[] \| null` | O(n), O(n) | `shuntingYard(tokenize("1+2"))` |
| evaluateExpression | `evaluateExpression(expr: string) -> number \| null` | O(n), O(n) | `evaluateExpression("(1+2)*3")` |

## Backtracking (`src/algorithms/backtracking.js`)

Usage Notes:
- Output grows exponentially; use small inputs.
- `nQueens` returns boards as arrays of strings.

| Function | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| permutations | `permutations(arr: any[]) -> any[][]` | O(n! * n), O(n) plus output | `permutations([1,2])` |
| subsets | `subsets(arr: any[]) -> any[][]` | O(2^n * n), O(n) plus output | `subsets([1,2])` |
| nQueens | `nQueens(n: number) -> string[][]` | O(n!), O(n^2) plus output | `nQueens(4)` |

## Streaming (`src/algorithms/streaming.js`)

Usage Notes:
- `misraGries` expects `k >= 2` to be meaningful.
- `CountMinSketch` is approximate and may over-estimate counts.

| Function | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| misraGries | `misraGries(stream: any[], k: number) -> any[]` | O(n * k), O(k) | `misraGries(["a","b","a","c"], 2)` |
| CountMinSketch | `new CountMinSketch(width: number, depth: number, seeds?: number[])` | O(width * depth), O(width * depth) | `new CountMinSketch(10, 3)` |
| CountMinSketch.add | `CountMinSketch.add(value: any, count?: number) -> void` | O(depth), O(1) | `cms.add("apple")` |
| CountMinSketch.estimate | `CountMinSketch.estimate(value: any) -> number` | O(depth), O(1) | `cms.estimate("apple")` |

## Numeric (`src/algorithms/numeric.js`)

Usage Notes:
- `fft` expects input length to be a power of two and returns `null` otherwise.
- `multiplyMatrices` expects compatible dimensions `A[n][p]` and `B[p][m]`.

| Function | Signature | Complexity (time, space) | Example |
| --- | --- | --- | --- |
| fft | `fft(a: Array<{ re: number, im: number }>) -> Array<{ re: number, im: number }> \| null` | O(n log n), O(n) | `fft([{re:1,im:0},{re:0,im:0}])` |
| ifft | `ifft(a: Array<{ re: number, im: number }>) -> Array<{ re: number, im: number }> \| null` | O(n log n), O(n) | `ifft([{re:1,im:0},{re:0,im:0}])` |
| multiplyMatrices | `multiplyMatrices(A: number[][], B: number[][]) -> number[][]` | O(n * m * p), O(n * m) | `multiplyMatrices([[1,2]], [[3],[4]])` |
