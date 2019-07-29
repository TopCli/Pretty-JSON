// Require Node.js Dependencies
const { spawn } = require("child_process");
const { join } = require("path");

// Require Third-party Dependencies
const is = require("@slimio/is");

// Require Internal Dependencies
const prettyJSON = require("../");

async function executeNodeScript(path) {
    const { stdout } = spawn(process.argv[0], [path]);
    let str = "";
    for await (const buf of stdout) {
        str += buf;
    }

    str | 0;
    return str;
}

test("prettyJSON must be a function", () => {
    expect(is.func(prettyJSON)).toStrictEqual(true);
});

test("prettyJSON of non-object must return undefined", () => {
    expect(prettyJSON("hello")).toStrictEqual(undefined);
});

test("prettyJSON stdout must be the same", async() => {
    const stdout = await executeNodeScript(join(__dirname, "fixtures", "01.js"));
    expect(stdout).toMatchSnapshot();
});
