"use strict";

// Require Node.js Dependencies
const { EOL } = require("os");

// Require Third-party Dependencies
const { white, gray, bold } = require("kleur");
const is = require("@slimio/is");

// Require Internal Dependencies
const { maxKeyLength, primeColor } = require("./src/utils");

/**
 * @function logArray
 * @param {!Array<any>} arr
 * @param {number} [depth=1]
 * @returns {void}
 */
function logArray(arr, depth = 1) {
    const backStart = depth === 2 ? " " : "  ".repeat(depth - 1);
    const startSpace = depth === 1 ? " " : "  ".repeat(depth);
    const lenMax = arr.length - 1;
    const returnLine = arr.length > 10;

    process.stdout.write(`${gray("[")}${EOL}${startSpace}`);
    for (let id = 0; id < arr.length; id++) {
        const value = arr[id];
        if (is.object(value)) {
            if (Array.isArray(value)) {
                if (id !== 0) {
                    process.stdout.write(startSpace);
                }
                logArray(value, depth + 1);
                if (id !== lenMax) {
                    process.stdout.write(gray(", "));
                    process.stdout.write(EOL);
                }
            }
            else {
                logObject(value, depth);
                if (id !== lenMax) {
                    process.stdout.write(EOL);
                }
            }
            continue;
        }

        if (returnLine && id !== 0) {
            process.stdout.write(startSpace);
        }

        process.stdout.write(primeColor(value)(is.string(value) ? `'${value}'` : String(value)));
        if (id !== lenMax) {
            process.stdout.write(gray(", "));
            if (returnLine) {
                process.stdout.write(EOL);
            }
        }
    }
    process.stdout.write(`${EOL}${backStart}${gray("]")}`);
}

/**
 * @function logObject
 * @param {!object} obj
 * @param {number} [depth=1]
 * @returns {void}
 */
function logObject(obj, depth = 1) {
    const betweenSpace = maxKeyLength(obj, 4);
    const startSpace = depth === 1 ? " " : "  ".repeat(depth);
    const entries = Object.entries(obj);

    for (let id = 0; id < entries.length; id++) {
        const [key, value] = entries[id];
        if (is.func(value) || is.symbol(value)) {
            continue;
        }

        process.stdout.write(bold(white(`${startSpace}${key}: ${" ".repeat(betweenSpace - key.length)}`)));
        if (is.object(value)) {
            (Array.isArray(value) ? logArray : logObject)(value, depth + 1);
            continue;
        }

        process.stdout.write(primeColor(value)(is.string(value) ? `'${value}'` : String(value)));
        if (id !== entries.length - 1) {
            process.stdout.write(EOL);
        }
    }
}

module.exports = function stdoutJSON(obj) {
    if (is.object(obj)) {
        (Array.isArray(obj) ? logArray : logObject)(obj);
        process.stdout.write(EOL);
    }
};
