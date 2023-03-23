// Require Third-party Dependencies
import kleur from "kleur";
import is from "@slimio/is";


// Require Internal Dependencies
import { maxKeyLength, primeColor } from "./src/utils.js";

// CONSTANTS
const EOL = "\n";

/**
 * @function logArray
 * @param {!Array<any>} arr
 * @param {number} [depth=1]
 * @param {boolean} [disableEndLine=false]
 * @returns {void}
 */
function logArray(arr, depth = 1, disableEndLine = false) {
  const backStart = depth === 2 ? " " : "  ".repeat(depth - 1);
  const startSpace = depth === 1 ? " " : "  ".repeat(depth);
  const lenMax = arr.length - 1;
  const returnLine = arr.length > 10;
  const firstIsObject = arr.length > 0 && is.plainObject(arr[0]);
  let forceNext = false;

  if (arr.length === 0) {
    process.stdout.write(`${kleur.gray("[]")}${disableEndLine ? "" : EOL}`);

    return;
  }

  process.stdout.write(`${kleur.gray("[")}${EOL}${firstIsObject ? "" : startSpace}`);
  for (let id = 0; id < arr.length; id++) {
    const value = arr[id];

    if (is.array(value)) {
      if (id !== 0) {
        process.stdout.write(startSpace);
      }
      logArray(value, depth + 1, true);
      forceNext = true;
      if (id !== lenMax) {
        process.stdout.write(kleur.gray(", "));
        process.stdout.write(EOL);
      }
    }
    else if (is.plainObject(value)) {
      logObject(value, depth, true);
      forceNext = true;
    }
    else {
      // eslint-disable-next-line
            if ((returnLine && id > 0) || forceNext) {
        process.stdout.write(startSpace);
        forceNext = false;
      }

      process.stdout.write(primeColor(value)(is.string(value) ? `'${value}'` : String(value)));
      if (id !== lenMax) {
        process.stdout.write(kleur.gray(", "));
        if (returnLine) {
          process.stdout.write(EOL);
        }
      }
    }
  }
  process.stdout.write(`${EOL}${backStart}${kleur.gray("]")}${disableEndLine ? "" : EOL}`);
}

/**
 * @function logObject
 * @param {!object} obj
 * @param {number} [depth=1]
 * @param {boolean} [disableEndLine=false]
 * @returns {void}
 */
function logObject(obj, depth = 1, disableEndLine = false) {
  const betweenSpace = maxKeyLength(obj, 4);
  const startSpace = depth === 1 ? " " : "  ".repeat(depth);
  const entries = Object.entries(obj);

  if (entries.length === 0) {
    process.stdout.write(`${kleur.gray("{}")}${disableEndLine ? "" : EOL}`);

    return;
  }

  for (let id = 0; id < entries.length; id++) {
    const [key, value] = entries[id];
    if (is.func(value) || is.symbol(value)) {
      continue;
    }

    if (id === 0) {
      process.stdout.write(EOL);
    }
    process.stdout.write(kleur.bold(kleur.white(`${startSpace}${key}: ${" ".repeat(betweenSpace - key.length)}`)));
    if (is.object(value)) {
      (Array.isArray(value) ? logArray : logObject)(value, depth + 1);
      continue;
    }

    process.stdout.write(primeColor(value)(is.string(value) ? `'${value}'` : String(value)));
    if (!disableEndLine) {
      process.stdout.write(EOL);
    }
  }
}

export default function stdoutJSON(obj) {
  if (is.object(obj)) {
    (Array.isArray(obj) ? logArray : logObject)(obj);
    process.stdout.write(EOL);
  }
  else {
    throw new Error(`${obj} should be object or array.`);
  }
}

