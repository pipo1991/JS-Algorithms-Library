# Notes and Conventions

- Algorithms are pure and return new results without mutating inputs unless
  otherwise implied by the name or usage.
- Search-style algorithms return `null` when no result is found (for example,
  `binarySearch`, `kmpSearch`).
- Invalid inputs return `null` instead of throwing (for example,
  `evaluateExpression`, `fft`).
- Unreachable DP states return `null` (for example, `coinChangeMinCoins`).
- Tree algorithms accept a `TreeNode` (for example, `tree.root`).
