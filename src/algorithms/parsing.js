// Parsing algorithms

/**
 * Tokenize a math expression.
 * @param {string} expr
 * @returns {string[] | null}
 */
function tokenize(expr) {
  const tokens = [];
  let i = 0;
  while (i < expr.length) {
    const ch = expr[i];
    if (ch === " " || ch === "\t" || ch === "\n") {
      i += 1;
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      let j = i;
      while (j < expr.length && /[0-9.]/.test(expr[j])) j += 1;
      tokens.push(expr.slice(i, j));
      i = j;
      continue;
    }
    if ("+-*/()".includes(ch)) {
      tokens.push(ch);
      i += 1;
      continue;
    }
    return null;
  }
  return tokens;
}

/**
 * Convert tokens to RPN using shunting-yard.
 * @param {string[] | null} tokens
 * @returns {string[] | null}
 */
function shuntingYard(tokens) {
  if (!tokens) return null;
  const output = [];
  const ops = [];
  const prec = { "+": 1, "-": 1, "*": 2, "/": 2 };
  const leftAssoc = { "+": true, "-": true, "*": true, "/": true };
  for (const t of tokens) {
    if (!Number.isNaN(Number(t))) {
      output.push(t);
    } else if (t in prec) {
      while (ops.length) {
        const top = ops[ops.length - 1];
        if (top in prec &&
          ((leftAssoc[t] && prec[t] <= prec[top]) || (!leftAssoc[t] && prec[t] < prec[top]))) {
          output.push(ops.pop());
        } else break;
      }
      ops.push(t);
    } else if (t === "(") {
      ops.push(t);
    } else if (t === ")") {
      while (ops.length && ops[ops.length - 1] !== "(") {
        output.push(ops.pop());
      }
      if (ops.length === 0) return null;
      ops.pop();
    }
  }
  while (ops.length) {
    const op = ops.pop();
    if (op === "(" || op === ")") return null;
    output.push(op);
  }
  return output;
}

/**
 * Evaluate RPN tokens.
 * @param {string[] | null} tokens
 * @returns {number | null}
 */
function evalRpn(tokens) {
  if (!tokens) return null;
  const stack = [];
  for (const t of tokens) {
    if (!Number.isNaN(Number(t))) {
      stack.push(Number(t));
    } else {
      const b = stack.pop();
      const a = stack.pop();
      if (a === undefined || b === undefined) return null;
      if (t === "+") stack.push(a + b);
      else if (t === "-") stack.push(a - b);
      else if (t === "*") stack.push(a * b);
      else if (t === "/") stack.push(a / b);
      else return null;
    }
  }
  if (stack.length !== 1) return null;
  return stack[0] ?? null;
}

/**
 * Evaluate a math expression string.
 * @param {string} expr
 * @returns {number | null}
 */
function evaluateExpression(expr) {
  const tokens = tokenize(expr);
  const rpn = shuntingYard(tokens);
  return evalRpn(rpn);
}

module.exports = {
  tokenize,
  shuntingYard,
  evaluateExpression,
};
