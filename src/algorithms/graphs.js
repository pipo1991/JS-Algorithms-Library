// Graph algorithms

const { UnionFind } = require("../dataStructures/unionFind");

/**
 * Breadth-first traversal.
 * @param {Record<string, string[]>} adjList
 * @param {string} start
 * @returns {string[]}
 */
function bfs(adjList, start) {
  const order = [];
  const queue = [start];
  const seen = new Set([start]);
  for (let i = 0; i < queue.length; i += 1) {
    const node = queue[i];
    order.push(node);
    const neighbors = adjList[node] || [];
    for (const next of neighbors) {
      if (!seen.has(next)) {
        seen.add(next);
        queue.push(next);
      }
    }
  }
  return order;
}

/**
 * Depth-first traversal.
 * @param {Record<string, string[]>} adjList
 * @param {string} start
 * @returns {string[]}
 */
function dfs(adjList, start) {
  const order = [];
  const stack = [start];
  const seen = new Set();
  while (stack.length) {
    const node = stack.pop();
    if (seen.has(node)) continue;
    seen.add(node);
    order.push(node);
    const neighbors = adjList[node] || [];
    for (let i = neighbors.length - 1; i >= 0; i -= 1) {
      const next = neighbors[i];
      if (!seen.has(next)) stack.push(next);
    }
  }
  return order;
}

/**
 * Dijkstra shortest paths on weighted adjacency list.
 * @param {Record<string, Array<[string, number]>>} adjList
 * @param {string} start
 * @returns {Record<string, number>}
 */
function dijkstra(adjList, start) {
  const dist = {};
  const visited = new Set();
  Object.keys(adjList).forEach((k) => {
    dist[k] = Infinity;
  });
  dist[start] = 0;

  while (true) {
    let bestNode = null;
    let bestDist = Infinity;
    for (const node of Object.keys(dist)) {
      if (!visited.has(node) && dist[node] < bestDist) {
        bestDist = dist[node];
        bestNode = node;
      }
    }
    if (bestNode === null) break;
    visited.add(bestNode);
    const edges = adjList[bestNode] || [];
    for (const [to, weight] of edges) {
      const alt = dist[bestNode] + weight;
      if (alt < dist[to]) dist[to] = alt;
    }
  }

  return dist;
}

/**
 * Topological sort; returns null if cycle.
 * @param {Record<string, string[]>} adjList
 * @returns {string[] | null}
 */
function topologicalSort(adjList) {
  const indegree = {};
  Object.keys(adjList).forEach((node) => {
    indegree[node] = indegree[node] || 0;
    for (const next of adjList[node]) {
      indegree[next] = (indegree[next] || 0) + 1;
    }
  });
  const queue = [];
  for (const node of Object.keys(indegree)) {
    if (indegree[node] === 0) queue.push(node);
  }
  const order = [];
  for (let i = 0; i < queue.length; i += 1) {
    const node = queue[i];
    order.push(node);
    const neighbors = adjList[node] || [];
    for (const next of neighbors) {
      indegree[next] -= 1;
      if (indegree[next] === 0) queue.push(next);
    }
  }
  return order.length === Object.keys(indegree).length ? order : null;
}

/**
 * Prim minimum spanning tree for weighted graph.
 * @param {Record<string, Array<[string, number]>>} adjList
 * @param {string} [start]
 * @returns {{ weight: number, edges: Array<[string, string, number]> }}
 */
function primMST(adjList, start) {
  const nodes = Object.keys(adjList);
  if (nodes.length === 0) return { weight: 0, edges: [] };
  const s = start || nodes[0];
  const inMST = new Set();
  const key = {};
  const parent = {};
  nodes.forEach((n) => {
    key[n] = Infinity;
    parent[n] = null;
  });
  key[s] = 0;
  while (inMST.size < nodes.length) {
    let best = null;
    let bestKey = Infinity;
    for (const n of nodes) {
      if (!inMST.has(n) && key[n] < bestKey) {
        bestKey = key[n];
        best = n;
      }
    }
    if (best === null) break;
    inMST.add(best);
    for (const [to, weight] of adjList[best] || []) {
      if (!inMST.has(to) && weight < key[to]) {
        key[to] = weight;
        parent[to] = best;
      }
    }
  }
  let total = 0;
  const edges = [];
  nodes.forEach((n) => {
    if (key[n] !== Infinity) total += key[n];
    if (parent[n] !== null && key[n] !== Infinity) edges.push([parent[n], n, key[n]]);
  });
  return { weight: total, edges };
}

/**
 * Kruskal minimum spanning tree.
 * @param {string[]} nodes
 * @param {Array<[string, string, number]>} edges
 * @returns {{ weight: number, edges: Array<[string, string, number]> }}
 */
function kruskalMST(nodes, edges) {
  const uf = new UnionFind(nodes);
  const sorted = edges.slice().sort((a, b) => a[2] - b[2]);
  const mst = [];
  let total = 0;
  for (const [u, v, w] of sorted) {
    if (uf.find(u) !== uf.find(v)) {
      uf.union(u, v);
      mst.push([u, v, w]);
      total += w;
    }
  }
  return { weight: total, edges: mst };
}

/**
 * Bellman-Ford shortest paths.
 * @param {string[]} nodes
 * @param {Array<[string, string, number]>} edges
 * @param {string} start
 * @returns {{ dist: Record<string, number>, hasNegativeCycle: boolean }}
 */
function bellmanFord(nodes, edges, start) {
  const dist = {};
  nodes.forEach((n) => {
    dist[n] = Infinity;
  });
  dist[start] = 0;
  for (let i = 0; i < nodes.length - 1; i += 1) {
    let updated = false;
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        updated = true;
      }
    }
    if (!updated) break;
  }
  let hasNegativeCycle = false;
  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      hasNegativeCycle = true;
      break;
    }
  }
  return { dist, hasNegativeCycle };
}

/**
 * Floyd-Warshall all-pairs shortest paths.
 * @param {string[]} nodes
 * @param {Array<[string, string, number]>} edges
 * @returns {Record<string, Record<string, number>>}
 */
function floydWarshall(nodes, edges) {
  const dist = {};
  nodes.forEach((i) => {
    dist[i] = {};
    nodes.forEach((j) => {
      dist[i][j] = i === j ? 0 : Infinity;
    });
  });
  edges.forEach(([u, v, w]) => {
    if (w < dist[u][v]) dist[u][v] = w;
  });
  for (const k of nodes) {
    for (const i of nodes) {
      if (dist[i][k] === Infinity) continue;
      for (const j of nodes) {
        const alt = dist[i][k] + dist[k][j];
        if (alt < dist[i][j]) dist[i][j] = alt;
      }
    }
  }
  return dist;
}

/**
 * Strongly connected components (Kosaraju).
 * @param {Record<string, string[]>} adjList
 * @returns {string[][]}
 */
function sccKosaraju(adjList) {
  const visited = new Set();
  const order = [];
  /**
   * @param {string} node
   */
  function dfs1(node) {
    visited.add(node);
    for (const next of adjList[node] || []) {
      if (!visited.has(next)) dfs1(next);
    }
    order.push(node);
  }
  Object.keys(adjList).forEach((node) => {
    if (!visited.has(node)) dfs1(node);
  });
  const rev = {};
  Object.keys(adjList).forEach((u) => {
    if (!rev[u]) rev[u] = [];
    for (const v of adjList[u]) {
      if (!rev[v]) rev[v] = [];
      rev[v].push(u);
    }
  });
  const comps = [];
  visited.clear();
  /**
   * @param {string} node
   * @param {string[]} comp
   */
  function dfs2(node, comp) {
    visited.add(node);
    comp.push(node);
    for (const next of rev[node] || []) {
      if (!visited.has(next)) dfs2(next, comp);
    }
  }
  for (let i = order.length - 1; i >= 0; i -= 1) {
    const node = order[i];
    if (!visited.has(node)) {
      const comp = [];
      dfs2(node, comp);
      comps.push(comp);
    }
  }
  return comps;
}

module.exports = {
  bfs,
  dfs,
  dijkstra,
  topologicalSort,
  primMST,
  kruskalMST,
  bellmanFord,
  floydWarshall,
  sccKosaraju,
};
