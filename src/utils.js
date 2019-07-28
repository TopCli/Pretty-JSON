"use strict";

// Require Third-party Dependencies
const { green, white, cyan, yellow, gray } = require("kleur");

/**
 * @function maxKeyLength
 * @description get the key with the biggest length (or return the default length if there is none)
 * @param {*} obj
 * @param {number} [defaultLength=4]
 * @returns {number}
 */
function maxKeyLength(obj, defaultLength = 4) {
    // eslint-disable-next-line
    return Object.keys(obj).reduce((prev, curr) => {
        return curr.length > prev ? curr.length : prev;
    }, defaultLength);
}

/**
 * @function primeColor
 * @param {string | boolean | number | symbol | bigint | null | undefined} primitive a primitive value
 * @returns {Kleur.color}
 */
function primeColor(primitive) {
    switch (typeof primitive) {
        case "object": return gray;
        case "number": return cyan;
        case "boolean": return yellow;
        case "string": return green;
        default: return white;
    }
}

module.exports = { maxKeyLength, primeColor };
