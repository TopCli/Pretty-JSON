// Import Node.js Dependencies
import { before, describe, it } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import * as utils from "../../src/utils.js";

describe("utils/shouldObjectReturnLine", () => {
  before(() => {
    process.stdout.columns = 80;
  });

  it("should return false for empty objects", () => {
    assert.strictEqual(utils.shouldObjectReturnLine({}), false);
  });

  it("should return true if object contains object", () => {
    const obj = { key: { nestedKey: "value" } };
    assert.strictEqual(utils.shouldObjectReturnLine(obj), true);
  });

  it("should return true if object contains array", () => {
    const obj = { key: [1, 2, 3] };
    assert.strictEqual(utils.shouldObjectReturnLine(obj), true);
  });

  it("should return false if object contains one key", () => {
    const obj = {
      key1: "boo".repeat(500)
    };

    assert.strictEqual(utils.shouldObjectReturnLine(obj), false);
  });

  it("should return true if displayed key-values exceed terminal width", () => {
    const obj = {
      key1: "boo".repeat(30),
      key2: "boo".repeat(30)
    };

    assert.strictEqual(utils.shouldObjectReturnLine(obj), true);
  });

  it("should return false if all key-values fit within terminal width", () => {
    const obj = {
      key1: "value1",
      key2: "value2"
    };

    assert.strictEqual(utils.shouldObjectReturnLine(obj), false);
  });
});
