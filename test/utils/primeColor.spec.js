// Import Node.js Dependencies
import { describe, it } from "node:test";
import assert from "node:assert";
import { styleText } from "node:util";

// Import Internal Dependencies
import * as utils from "../../src/utils.js";

describe("utils/primeColor", () => {
  it("should return gray for objects", () => {
    const colorFunc = utils.primeColor({});
    assert.strictEqual(colorFunc("test"), styleText("gray", "test"));
  });

  it("should return cyan for numbers", () => {
    const colorFunc = utils.primeColor(42);
    assert.strictEqual(colorFunc("test"), styleText("cyan", "test"));
  });

  it("should return yellow for booleans", () => {
    const colorFunc = utils.primeColor(true);
    assert.strictEqual(colorFunc("test"), styleText("yellow", "test"));
  });

  it("should return green for strings", () => {
    const colorFunc = utils.primeColor("hello");
    assert.strictEqual(colorFunc("test"), styleText("green", "test"));
  });

  it("should return white for other types", () => {
    const colorFunc = utils.primeColor(undefined);
    assert.strictEqual(colorFunc("test"), styleText("white", "test"));
  });
});
