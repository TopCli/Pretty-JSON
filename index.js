// Import Node.js Dependencies
import { EOL } from "node:os";
import { styleText } from "node:util";

// Import Internal Dependencies
import * as utils from "./src/utils.js";

function logArray(arr, options = {}) {
  const {
    depth = 1,
    disableEndLine = false
  } = options;

  const backStart = depth === 2 ? " " : "  ".repeat(depth - 1);
  const startSpace = depth === 1 ? " " : "  ".repeat(depth);
  const lenMax = arr.length - 1;
  const returnLine = utils.shouldArrayReturnLine(arr, { depth });
  const firstIsObject = arr.length > 0 && utils.isPlainObject(arr[0]);
  let forceNext = false;

  if (arr.length === 0) {
    process.stdout.write(`${styleText("gray", "[]")}${disableEndLine ? "" : EOL}`);

    return;
  }

  if (depth === 1) {
    process.stdout.write(EOL);
  }

  const shouldReturn = utils.isPlainObject(arr[0]) === false;
  process.stdout.write(`${styleText("gray", "[")}${shouldReturn ? EOL : ""}${firstIsObject ? "" : startSpace}`);
  for (let id = 0; id < arr.length; id++) {
    const value = arr[id];

    if (Array.isArray(value)) {
      if (id !== 0) {
        process.stdout.write(startSpace);
      }
      logArray(value, { depth: depth + 1, disableEndLine: true });
      forceNext = true;
      if (id !== lenMax) {
        process.stdout.write(styleText("gray", ", "));
        process.stdout.write(EOL);
      }
    }
    else if (utils.isPlainObject(value)) {
      logObject(value, {
        depth,
        disableEndLine: utils.shouldObjectReturnLine(value, { depth }),
        inArray: true
      });
      forceNext = true;
    }
    else {
      if ((returnLine && id > 0) || forceNext) {
        process.stdout.write(startSpace);
        forceNext = false;
      }

      const isString = typeof value === "string";
      process.stdout.write(utils.primeColor(value)(isString ? `'${value}'` : String(value)));
      if (id !== lenMax) {
        process.stdout.write(styleText("gray", ", "));
        if (returnLine) {
          process.stdout.write(EOL);
        }
      }
    }
  }
  process.stdout.write(`${EOL}${backStart}${styleText("gray", "]")}${disableEndLine ? "" : EOL}`);
}

function logObject(obj, options = {}) {
  const {
    depth = 1,
    disableEndLine = false,
    inArray = false
  } = options;
  const betweenSpace = utils.maxKeyLength(obj, 4);
  const startSpace = depth === 1 ? " " : "  ".repeat(depth);
  const entries = Object.entries(obj);

  if (entries.length === 0) {
    process.stdout.write(`${styleText("gray", "{}")}${disableEndLine ? "" : EOL}`);

    return;
  }

  for (let id = 0; id < entries.length; id++) {
    const [key, value] = entries[id];
    if (["function", "symbol"].includes(typeof value)) {
      continue;
    }

    if (id === 0) {
      process.stdout.write(EOL);
    }
    process.stdout.write(styleText(["bold", "white"], `${startSpace}${key}: ${" ".repeat(betweenSpace - key.length)}`));
    if (utils.isPlainObject(value)) {
      logObject(value, { depth: depth + 1 });
      continue;
    }
    if (Array.isArray(value)) {
      logArray(value, { depth: depth + 1 });
      continue;
    }

    process.stdout.write(utils.primeColor(value)(typeof value === "string" ? `'${value}'` : String(value)));
    if (!disableEndLine && !(inArray && id === entries.length - 1)) {
      process.stdout.write(EOL);
    }
  }
}

export default function stdoutJSON(obj) {
  if (utils.isPlainObject(obj)) {
    logObject(obj);
  }
  else if (Array.isArray(obj)) {
    logArray(obj);
  }
  else {
    throw new Error(`${obj} should be object or array.`);
  }

  process.stdout.write(EOL);
}

