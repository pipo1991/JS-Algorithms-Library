// Graph data structure with adjacency helpers

/**
 * Graph with adjacency list.
 */
class Graph {
  /**
   * @param {boolean} [directed]
   */
  constructor(directed = false) {
    this.directed = directed;
    this.adj = {};
  }

  /**
   * @param {string} node
   * @returns {void}
   */
  addNode(node) {
    if (!this.adj[node]) this.adj[node] = [];
  }

  /**
   * @param {string} from
   * @param {string} to
   * @param {number} [weight]
   * @returns {void}
   */
  addEdge(from, to, weight = 1) {
    this.addNode(from);
    this.addNode(to);
    this.adj[from].push([to, weight]);
    if (!this.directed) this.adj[to].push([from, weight]);
  }

  /**
   * @param {string} from
   * @param {string} to
   * @returns {void}
   */
  removeEdge(from, to) {
    if (this.adj[from]) this.adj[from] = this.adj[from].filter(([v]) => v !== to);
    if (!this.directed && this.adj[to]) this.adj[to] = this.adj[to].filter(([v]) => v !== from);
  }

  /**
   * @param {string} node
   * @returns {Array<[string, number]>}
   */
  neighbors(node) {
    return this.adj[node] ? this.adj[node].slice() : [];
  }

  /**
   * @returns {string[]}
   */
  nodes() {
    return Object.keys(this.adj);
  }

  /**
   * @returns {Array<[string, string, number]>}
   */
  edges() {
    const out = [];
    const seen = new Set();
    for (const u of Object.keys(this.adj)) {
      for (const [v, w] of this.adj[u]) {
        if (this.directed) {
          out.push([u, v, w]);
        } else {
          const key = u < v ? `${u}|${v}` : `${v}|${u}`;
          if (!seen.has(key)) {
            seen.add(key);
            out.push([u, v, w]);
          }
        }
      }
    }
    return out;
  }
}

module.exports = {
  Graph,
};
