// Import Internal Dependencies
import prettyJSON from "../../index.js";

prettyJSON({
  foo: "bar",
  hello: "world",
  arr: [1, 2, 3],
  emptyArr: [],
  nested: {
    foz: "baz",
    nestedArr: [
      {
        foo: "bar",
        hello: "world"
      }
    ],
    nestedEmptyArr: []
  }
});
