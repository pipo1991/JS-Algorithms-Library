// Randomized algorithms

/**
 * Fisher-Yates shuffle.
 * @param {any[]} arr
 * @returns {any[]}
 */
function shuffle(arr) {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const tmp = out[i];
    out[i] = out[j];
    out[j] = tmp;
  }
  return out;
}

/**
 * Reservoir sampling of size k.
 * @param {any[]} stream
 * @param {number} k
 * @returns {any[]}
 */
function reservoirSample(stream, k) {
  const res = [];
  for (let i = 0; i < stream.length; i += 1) {
    if (i < k) res.push(stream[i]);
    else {
      const j = Math.floor(Math.random() * (i + 1));
      if (j < k) res[j] = stream[i];
    }
  }
  return res;
}

module.exports = {
  shuffle,
  reservoirSample,
};
