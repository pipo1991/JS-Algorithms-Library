// Numeric algorithms

/**
 * Cooley-Tukey FFT (length power of two).
 * @param {Array<{ re: number, im: number }>} a
 * @returns {Array<{ re: number, im: number }> | null}
 */
function fft(a) {
  const n = a.length;
  if (n === 0) return [];
  if ((n & (n - 1)) !== 0) return null;
  if (n === 1) return [{ re: a[0].re, im: a[0].im }];
  const even = [];
  const odd = [];
  for (let i = 0; i < n; i += 1) {
    (i % 2 === 0 ? even : odd).push(a[i]);
  }
  const Fe = fft(even);
  const Fo = fft(odd);
  if (!Fe || !Fo) return null;
  const out = new Array(n);
  for (let k = 0; k < n / 2; k += 1) {
    const angle = -2 * Math.PI * k / n;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    const tRe = cos * Fo[k].re - sin * Fo[k].im;
    const tIm = sin * Fo[k].re + cos * Fo[k].im;
    out[k] = { re: Fe[k].re + tRe, im: Fe[k].im + tIm };
    out[k + n / 2] = { re: Fe[k].re - tRe, im: Fe[k].im - tIm };
  }
  return out;
}

/**
 * Inverse FFT.
 * @param {Array<{ re: number, im: number }>} a
 * @returns {Array<{ re: number, im: number }> | null}
 */
function ifft(a) {
  const n = a.length;
  if (n === 0) return [];
  const conj = a.map((z) => ({ re: z.re, im: -z.im }));
  const transformed = fft(conj);
  if (!transformed) return null;
  return transformed.map((z) => ({ re: z.re / n, im: -z.im / n }));
}

/**
 * Matrix multiplication.
 * @param {number[][]} A
 * @param {number[][]} B
 * @returns {number[][]}
 */
function multiplyMatrices(A, B) {
  const n = A.length;
  const m = B[0].length;
  const p = B.length;
  const C = new Array(n).fill(null).map(() => new Array(m).fill(0));
  for (let i = 0; i < n; i += 1) {
    for (let k = 0; k < p; k += 1) {
      const aik = A[i][k];
      for (let j = 0; j < m; j += 1) {
        C[i][j] += aik * B[k][j];
      }
    }
  }
  return C;
}

module.exports = {
  fft,
  ifft,
  multiplyMatrices,
};
