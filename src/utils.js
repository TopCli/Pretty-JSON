// Require Third-party Dependencies
import kleur from "kleur";

/**
 * @namespace Utils
 */

/**
 * @function maxKeyLength
 * @description get the key with the biggest length (or return the default length if there is none)
 * @memberof Utils#
 * @param {*} obj
 * @param {number} [defaultLength=4]
 * @returns {number}
 */
function maxKeyLength(obj, defaultLength = 4) {
  return Object.keys(obj).reduce((prev, curr) => (curr.length > prev ? curr.length : prev), defaultLength);
}

/**
 * @function primeColor
 * @memberof Utils#
 * @param {string | boolean | number | symbol | bigint | null | undefined} primitive a primitive value
 * @returns {Kleur.color}
 */
function primeColor(primitive) {
  switch (typeof primitive) {
    case "object": return kleur.gray;
    case "number": return kleur.cyan;
    case "boolean": return kleur.yellow;
    case "string": return kleur.green;
    default: return kleur.white;
  }
}

export { maxKeyLength, primeColor };
