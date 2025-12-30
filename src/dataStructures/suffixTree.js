// Suffix tree (naive construction)

/**
 * Suffix tree node.
 */
class SuffixTreeNode {
  /**
   * @returns {void}
   */
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

/**
 * Suffix tree (naive construction).
 */
class SuffixTree {
  /**
   * @param {string} [text]
   */
  constructor(text = "") {
    this.root = new SuffixTreeNode();
    this.text = text;
    if (text) this._build(text);
  }

  /**
   * @param {string} text
   * @returns {void}
   */
  _build(text) {
    for (let i = 0; i < text.length; i += 1) {
      let node = this.root;
      for (let j = i; j < text.length; j += 1) {
        const ch = text[j];
        if (!node.children[ch]) node.children[ch] = new SuffixTreeNode();
        node = node.children[ch];
      }
      node.isEnd = true;
    }
  }

  /**
   * @param {string} pattern
   * @returns {boolean}
   */
  contains(pattern) {
    let node = this.root;
    for (const ch of pattern) {
      if (!node.children[ch]) return false;
      node = node.children[ch];
    }
    return true;
  }
}

module.exports = {
  SuffixTree,
  SuffixTreeNode,
};
