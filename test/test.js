// Require Node.js Dependencies
import { spawn } from "node:child_process";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, it } from "node:test";
import { strictEqual, throws } from "node:assert";

// Require Third-party Dependencies
import is from "@slimio/is";

// Require Internal Dependencies
import prettyJSON  from "../index.js";

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

  return str;
}

describe("getLocalLang/setLocalLang", () => {
  it("prettyJSON must be a function", () => {
    strictEqual(is.func(prettyJSON), true);
  });

  it("prettyJSON : should generate an error", () => {
    const expectedValue = "hello";
    throws(() => {
      prettyJSON(expectedValue),
      {
        name: "Error",
        message: `Payload -> ${expectedValue} should be object or array`
      }
    })
  });

  it("prettyJSON stdout must be the same", async() => {
    const expectedValue = [
      "",
      " foo:   'bar'",
      " hello: 'world'",
      " arr:   [",
      "    1, 2, 3",
      " ]",
      "",
      "",
    ]
    const stdout = await executeNodeScript(join(__dirname, "fixtures", "01.js"));
    strictEqual(stdout, expectedValue.join('\n'));
  });
});
