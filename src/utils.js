// Import Node.js Dependencies
import { styleText } from "node:util";

// CONSTANTS
const kMaxInlineArrayLength = 10;

export function maxKeyLength(obj, defaultLength = 4) {
  return Object.keys(obj).reduce((prev, curr) => (curr.length > prev ? curr.length : prev), defaultLength);
}

export function primeColor(primitive) {
  switch (typeof primitive) {
    case "object":
      return (...args) => styleText("gray", ...args);
    case "number":
      return (...args) => styleText("cyan", ...args);
    case "boolean":
      return (...args) => styleText("yellow", ...args);
    case "string":
      return (...args) => styleText("green", ...args);
    default:
      return (...args) => styleText("white", ...args);
  }
}

export function isPlainObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

export function shouldObjectReturnLine(obj, options = {}) {
  const {
    depth = 1
  } = options;

  if (Object.values(obj).some((item) => Array.isArray(item) || isPlainObject(item))) {
    return true;
  }

  if (Object.keys(obj).length < 2) {
    return false;
  }

  const indentationSpace = "  ".repeat(depth * 2);
  const objectLength = Object.entries(obj).reduce((acc, [key, value]) => {
    const isFnOrSymbol = typeof value === "function" || typeof value === "symbol";
    if (isFnOrSymbol) {
      return acc;
    }

    if (typeof value === "string") {
      // + 2 for quotes
      return acc + key.length + value.length + 2;
    }

    return acc + key.length + String(value).length;
  }, indentationSpace.length);

  const totalLength = indentationSpace.length + objectLength;

  if (totalLength > process.stdout.columns) {
    return true;
  }

  return false;
}

export function shouldArrayReturnLine(array, options = {}) {
  const {
    depth = 1
  } = options;

  if (array.length > kMaxInlineArrayLength) {
    return true;
  }

  if (array.some((item) => Array.isArray(item) || isPlainObject(item))) {
    return true;
  }

  const indentationSpace = "  ".repeat(depth * 2);
  const arrayLength = array.reduce((acc, item) => {
    const isFnOrSymbol = typeof item === "function" || typeof item === "symbol";
    if (isFnOrSymbol) {
      return acc;
    }

    if (typeof item === "string") {
      // + 2 for quotes
      return acc + item.length + 2;
    }

    return acc + String(item).length;
  }, 0);
  const totalLength = indentationSpace.length + arrayLength;

  if (totalLength > process.stdout.columns) {
    return true;
  }

  return false;
}
