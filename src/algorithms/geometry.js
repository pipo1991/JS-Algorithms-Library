// Geometry algorithms

/**
 * Cross product of OA x OB.
 * @param {{ x: number, y: number }} o
 * @param {{ x: number, y: number }} a
 * @param {{ x: number, y: number }} b
 * @returns {number}
 */
function cross(o, a, b) {
  return (a.x - o.x) * (b.y - o.y) - (a.y - o.y) * (b.x - o.x);
}

/**
 * Monotonic chain convex hull.
 * @param {Array<{ x: number, y: number }>} points
 * @returns {Array<{ x: number, y: number }>}
 */
function convexHull(points) {
  if (points.length <= 1) return points.slice();
  const pts = points.slice().sort((p1, p2) => (p1.x === p2.x ? p1.y - p2.y : p1.x - p2.x));
  const lower = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
      lower.pop();
    }
    lower.push(p);
  }
  const upper = [];
  for (let i = pts.length - 1; i >= 0; i -= 1) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
      upper.pop();
    }
    upper.push(p);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

/**
 * Maximum overlap count for intervals.
 * @param {Array<[number, number]>} intervals
 * @returns {{ max: number, point: number | null }}
 */
function lineSweepMaxOverlap(intervals) {
  const events = [];
  for (const [start, end] of intervals) {
    events.push([start, 1]);
    events.push([end, -1]);
  }
  events.sort((a, b) => (a[0] === b[0] ? a[1] - b[1] : a[0] - b[0]));
  let cur = 0;
  let best = 0;
  let point = null;
  for (const [x, delta] of events) {
    cur += delta;
    if (cur > best) {
      best = cur;
      point = x;
    }
  }
  return { max: best, point };
}

module.exports = {
  convexHull,
  lineSweepMaxOverlap,
};
