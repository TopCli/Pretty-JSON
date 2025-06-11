// Import Node.js Dependencies
import { before, describe, it } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import * as utils from "../../src/utils.js";

describe("utils/shouldArrayReturnLine", () => {
  before(() => {
    process.stdout.columns = 80;
  });

  it("should return true for array longer than max length", () => {
    const arr = Array.from({ length: 15 }, (_, i) => i);
    assert.strictEqual(utils.shouldArrayReturnLine(arr), true);
  });

  it("should return true if array contains object", () => {
    const arr = [{ key: "value" }];
    assert.strictEqual(utils.shouldArrayReturnLine(arr), true);
  });

  it("should return true if array contains array", () => {
    const arr = [[1, 2]];
    assert.strictEqual(utils.shouldArrayReturnLine(arr), true);
  });

  it("should return false for empty array", () => {
    const arr = [];
    assert.strictEqual(utils.shouldArrayReturnLine(arr), false);
  });

  it("should return true if array items exceed terminal width", () => {
    const arr = Array.from({ length: 5 }, (_, i) => `item${i}`.repeat(10));
    assert.strictEqual(utils.shouldArrayReturnLine(arr), true);
  });

  it("should return false if all items fit within terminal width", () => {
    const arr = ["item1", "item2"];
    assert.strictEqual(utils.shouldArrayReturnLine(arr), false);
  });
});
