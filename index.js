"use strict";

// Require Node.js Dependencies
const { EOL } = require("os");

// Require Third-party Dependencies
const { green, white, cyan, yellow, gray, bold } = require("kleur");

function primeColor(primitive) {
    switch (typeof primitive) {
        case "object": return gray;
        case "number": return cyan;
        case "boolean": return yellow;
        case "string": return green;
        default: return white;
    }
}

function logArray(arr, depth = 1) {
    const backStart = depth === 2 ? " " : "  ".repeat(depth - 1);
    const startSpace = depth === 1 ? " " : "  ".repeat(depth);
    const lenMax = arr.length - 1;
    const returnLine = arr.length > 10;

    process.stdout.write(`${gray("[")}${EOL}${startSpace}`);
    for (let id = 0; id < arr.length; id++) {
        const value = arr[id];
        const tValue = typeof value;
        if (tValue === "object" && value !== null) {
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

        const color = primeColor(value);
        process.stdout.write(color(tValue === "string" ? `'${value}'` : String(value)));
        if (id !== lenMax) {
            process.stdout.write(gray(", "));
            if (returnLine) {
                process.stdout.write(EOL);
            }
        }
    }
    process.stdout.write(`${EOL}${backStart}${gray("]")}`);
}

function logObject(obj, depth = 1) {
    // eslint-disable-next-line
    const betweenSpace = Object.keys(obj).reduce((prev, curr) => {
        return curr.length > prev ? curr.length : prev;
    }, 4);

    const entries = Object.entries(obj);
    for (let id = 0; id < entries.length; id++) {
        const [key, value] = entries[id];
        const tValue = typeof value;
        if (tValue === "function" || tValue === "symbol") {
            continue;
        }
        const startSpace = depth === 1 ? " " : "  ".repeat(depth);

        process.stdout.write(bold(white(`${startSpace}${key}: ${" ".repeat(betweenSpace - key.length)}`)));
        if (tValue === "object" && value !== null) {
            if (Array.isArray(value)) {
                logArray(value, depth + 1);
            }
            else {
                process.stdout.write(EOL);
                logObject(value, depth + 1);
            }
            continue;
        }
        else {
            const color = primeColor(value);
            process.stdout.write(color(tValue === "string" ? `'${value}'` : String(value)));
        }
        if (id !== entries.length - 1) {
            process.stdout.write(EOL);
        }
    }
}

module.exports = function stdoutJSON(obj) {
    if (typeof obj !== "object" || obj === null) {
        return void 0;
    }

    if (Array.isArray(obj)) {
        logArray(obj);
    }
    else {
        logObject(obj);
    }
    process.stdout.write(EOL);

    return void 0;
};
