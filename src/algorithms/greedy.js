// Greedy algorithms

/**
 * Select maximum number of non-overlapping intervals.
 * @param {Array<[number, number]>} intervals
 * @returns {Array<[number, number]>}
 */
function intervalScheduling(intervals) {
  const sorted = intervals.slice().sort((a, b) => a[1] - b[1]);
  const picked = [];
  let lastEnd = -Infinity;
  for (const [start, end] of sorted) {
    if (start >= lastEnd) {
      picked.push([start, end]);
      lastEnd = end;
    }
  }
  return picked;
}

/**
 * Activity selection from start/finish arrays.
 * @param {number[]} starts
 * @param {number[]} finishes
 * @returns {Array<[number, number]>}
 */
function activitySelection(starts, finishes) {
  const acts = starts.map((s, i) => [s, finishes[i]]);
  return intervalScheduling(acts);
}

module.exports = {
  intervalScheduling,
  activitySelection,
};
