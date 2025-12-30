// Trie (prefix tree)

/**
 * Trie node.
 */
class TrieNode {
  /**
   * @returns {void}
   */
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

/**
 * Trie (prefix tree).
 */
class Trie {
  /**
   * @returns {void}
   */
  constructor() {
    this.root = new TrieNode();
  }

  /**
   * @param {string} word
   * @returns {void}
   */
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children[ch]) node.children[ch] = new TrieNode();
      node = node.children[ch];
    }
    node.isEnd = true;
  }

  /**
   * @param {string} word
   * @returns {boolean}
   */
  search(word) {
    const node = this._walk(word);
    return node !== null && node.isEnd;
  }

  /**
   * @param {string} prefix
   * @returns {boolean}
   */
  startsWith(prefix) {
    return this._walk(prefix) !== null;
  }

  /**
   * @param {string} str
   * @returns {TrieNode | null}
   */
  _walk(str) {
    let node = this.root;
    for (const ch of str) {
      if (!node.children[ch]) return null;
      node = node.children[ch];
    }
    return node;
  }
}

module.exports = {
  Trie,
  TrieNode,
};
