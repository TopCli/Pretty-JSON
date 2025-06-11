// Import Node.js Dependencies
import { describe, it } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import * as utils from "../../src/utils.js";

describe("utils/isPlayObject", () => {
  it("should return true for plain objects", () => {
    const obj = { key: "value" };
    assert.strictEqual(utils.isPlainObject(obj), true);
  });

  it("should return false for arrays", () => {
    const arr = [1, 2, 3];
    assert.strictEqual(utils.isPlainObject(arr), false);
  });

  it("should return false for null", () => {
    assert.strictEqual(utils.isPlainObject(null), false);
  });

  it("should return false for functions", () => {
    function foo() {
      return void 0;
    }
    assert.strictEqual(utils.isPlainObject(foo), false);
  });

  it("should return false for Date objects", () => {
    const date = new Date();
    assert.strictEqual(utils.isPlainObject(date), false);
  });

  it("should return false for RegExp objects", () => {
    const regex = /test/;
    assert.strictEqual(utils.isPlainObject(regex), false);
  });

  it("should return true for instances of custom classes", () => {
    class CustomClass {}
    const instance = new CustomClass();
    assert.strictEqual(utils.isPlainObject(instance), true);
  });

  it("should return false for Map objects", () => {
    const map = new Map();
    assert.strictEqual(utils.isPlainObject(map), false);
  });

  it("should return false for Set objects", () => {
    const set = new Set();
    assert.strictEqual(utils.isPlainObject(set), false);
  });

  it("should return false for Symbol objects", () => {
    const symbol = Symbol("test");
    assert.strictEqual(utils.isPlainObject(symbol), false);
  });

  it("should return false for BigInt objects", () => {
    const bigInt = BigInt(123);
    assert.strictEqual(utils.isPlainObject(bigInt), false);
  });

  it("should return false for undefined", () => {
    assert.strictEqual(utils.isPlainObject(undefined), false);
  });

  it("should return true for objects with null prototype", () => {
    const obj = Object.create(null);
    assert.strictEqual(utils.isPlainObject(obj), true);
  });
});
