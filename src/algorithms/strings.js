// String algorithms

/**
 * Build LPS table for KMP.
 * @param {string} pattern
 * @returns {number[]}
 */
function buildLps(pattern) {
  const lps = new Array(pattern.length).fill(0);
  let len = 0;
  let i = 1;
  while (i < pattern.length) {
    if (pattern[i] === pattern[len]) {
      len += 1;
      lps[i] = len;
      i += 1;
    } else if (len > 0) {
      len = lps[len - 1];
    } else {
      lps[i] = 0;
      i += 1;
    }
  }
  return lps;
}

/**
 * KMP substring search.
 * @param {string} text
 * @param {string} pattern
 * @returns {number | null}
 */
function kmpSearch(text, pattern) {
  if (pattern.length === 0) return 0;
  const lps = buildLps(pattern);
  let i = 0;
  let j = 0;
  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i += 1;
      j += 1;
      if (j === pattern.length) return i - j;
    } else if (j > 0) {
      j = lps[j - 1];
    } else {
      i += 1;
    }
  }
  return null;
}

/**
 * Check if a string is a palindrome.
 * @param {string} s
 * @returns {boolean}
 */
function isPalindrome(s) {
  let i = 0;
  let j = s.length - 1;
  while (i < j) {
    if (s[i] !== s[j]) return false;
    i += 1;
    j -= 1;
  }
  return true;
}

/**
 * Longest common prefix of strings.
 * @param {string[]} strings
 * @returns {string}
 */
function longestCommonPrefix(strings) {
  if (strings.length === 0) return "";
  let prefix = strings[0];
  for (let i = 1; i < strings.length; i += 1) {
    while (!strings[i].startsWith(prefix)) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}

/**
 * Rabin-Karp substring search.
 * @param {string} text
 * @param {string} pattern
 * @returns {number | null}
 */
function rabinKarpSearch(text, pattern) {
  if (pattern.length === 0) return 0;
  if (pattern.length > text.length) return null;
  const base = 256;
  const mod = 1000000007;
  let patHash = 0;
  let txtHash = 0;
  let pow = 1;
  for (let i = 0; i < pattern.length; i += 1) {
    patHash = (patHash * base + pattern.charCodeAt(i)) % mod;
    txtHash = (txtHash * base + text.charCodeAt(i)) % mod;
    if (i < pattern.length - 1) pow = (pow * base) % mod;
  }
  for (let i = 0; i <= text.length - pattern.length; i += 1) {
    if (patHash === txtHash) {
      let match = true;
      for (let j = 0; j < pattern.length; j += 1) {
        if (text[i + j] !== pattern[j]) {
          match = false;
          break;
        }
      }
      if (match) return i;
    }
    if (i < text.length - pattern.length) {
      const left = text.charCodeAt(i);
      const right = text.charCodeAt(i + pattern.length);
      txtHash = (txtHash - left * pow) % mod;
      if (txtHash < 0) txtHash += mod;
      txtHash = (txtHash * base + right) % mod;
    }
  }
  return null;
}

/**
 * Levenshtein edit distance.
 * @param {string} a
 * @param {string} b
 * @returns {number}
 */
function editDistance(a, b) {
  const n = a.length;
  const m = b.length;
  const dp = new Array(m + 1);
  for (let j = 0; j <= m; j += 1) dp[j] = j;
  for (let i = 1; i <= n; i += 1) {
    let prev = dp[0];
    dp[0] = i;
    for (let j = 1; j <= m; j += 1) {
      const temp = dp[j];
      if (a[i - 1] === b[j - 1]) dp[j] = prev;
      else dp[j] = 1 + Math.min(prev, dp[j], dp[j - 1]);
      prev = temp;
    }
  }
  return dp[m];
}

/**
 * Z-algorithm array for string matching.
 * @param {string} s
 * @returns {number[]}
 */
function zAlgorithm(s) {
  const z = new Array(s.length).fill(0);
  let l = 0;
  let r = 0;
  for (let i = 1; i < s.length; i += 1) {
    if (i <= r) z[i] = Math.min(r - i + 1, z[i - l]);
    while (i + z[i] < s.length && s[z[i]] === s[i + z[i]]) z[i] += 1;
    if (i + z[i] - 1 > r) {
      l = i;
      r = i + z[i] - 1;
    }
  }
  return z;
}

/**
 * Build suffix array.
 * @param {string} s
 * @returns {number[]}
 */
function suffixArray(s) {
  const n = s.length;
  const suffixes = new Array(n);
  for (let i = 0; i < n; i += 1) suffixes[i] = i;
  let rank = new Array(n);
  for (let i = 0; i < n; i += 1) rank[i] = s.charCodeAt(i);
  for (let k = 1; k < n; k *= 2) {
    suffixes.sort((a, b) => {
      if (rank[a] !== rank[b]) return rank[a] - rank[b];
      const ra = a + k < n ? rank[a + k] : -1;
      const rb = b + k < n ? rank[b + k] : -1;
      return ra - rb;
    });
    const tmp = new Array(n);
    tmp[suffixes[0]] = 0;
    for (let i = 1; i < n; i += 1) {
      const a = suffixes[i - 1];
      const b = suffixes[i];
      const prev = [rank[a], a + k < n ? rank[a + k] : -1];
      const next = [rank[b], b + k < n ? rank[b + k] : -1];
      tmp[b] = tmp[a] + (prev[0] !== next[0] || prev[1] !== next[1] ? 1 : 0);
    }
    rank = tmp;
    if (rank[suffixes[n - 1]] === n - 1) break;
  }
  return suffixes;
}

module.exports = {
  kmpSearch,
  isPalindrome,
  longestCommonPrefix,
  rabinKarpSearch,
  editDistance,
  zAlgorithm,
  suffixArray,
};
