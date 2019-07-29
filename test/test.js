// Require Third-party Dependencies
const avaTest = require("ava");
const is = require("@slimio/is");

// Require Internal Dependencies
const prettyJSON = require("../");

avaTest("prettyJSON must be a function", (assert) => {
    assert.true(is.func(prettyJSON));
});

avaTest("prettyJSON of non-object must return undefined", (assert) => {
    assert.is(prettyJSON("hello"), undefined);
});
