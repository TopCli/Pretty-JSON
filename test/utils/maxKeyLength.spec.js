// Import Node.js Dependencies
import { describe, it } from "node:test";
import assert from "node:assert";

// Import Internal Dependencies
import * as utils from "../../src/utils.js";

describe("utils/maxKeyLength", () => {
  it("should return the maximum key length for a given object", () => {
    const obj = {
      short: "value",
      longerKey: "another value"
    };
    const maxLength = utils.maxKeyLength(obj);
    assert.strictEqual(maxLength, "longerKey".length);
  });

  it("should return default for an empty object", () => {
    const maxLength = utils.maxKeyLength({}, 10);
    assert.strictEqual(maxLength, 10);
  });
});
