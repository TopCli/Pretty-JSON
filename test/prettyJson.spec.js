// Import Node.js Dependencies
import { spawn } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import assert from "node:assert";
import util from "node:util";
import { EOL } from "node:os";

// Import Internal Dependencies
import prettyJSON from "../index.js";

// CONSTANTS
const __dirname = dirname(fileURLToPath(import.meta.url));

async function executeNodeScript(path) {
  const { stdout } = spawn(process.argv[0], [path]);
  let str = "";
  for await (const buf of stdout) {
    str += buf;
  }

  // eslint-disable-next-line no-unused-expressions
  str | 0;

  return util.stripVTControlCharacters(str);
}

describe("prettyJSON", () => {
  it("must be a function", () => {
    assert.strictEqual(typeof prettyJSON, "function");
  });

  it("should generate an error", () => {
    const expectedValue = "hello";
    assert.throws(() => prettyJSON(expectedValue),
      {
        name: "Error",
        message: `${expectedValue} should be object or array.`
      }
    );
  });

  it("should print object", async() => {
    const expectedValue = [
      "",
      " foo:      'bar'",
      " hello:    'world'",
      " arr:      [",
      "    1, 2, 3",
      " ]",
      " emptyArr: []",
      " nested:   ",
      "    foz:            'baz'",
      "    nestedArr:      [",
      "      foo:   'bar'",
      "      hello: 'world'",
      "    ]",
      "    nestedEmptyArr: []",
      "",
      ""
    ];
    const stdout = await executeNodeScript(join(__dirname, "fixtures", "01.js"));
    assert.strictEqual(stdout, expectedValue.join(EOL));
  });
});
