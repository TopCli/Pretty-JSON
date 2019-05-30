# pretty-json
![version](https://img.shields.io/badge/version-1.0.0-blue.svg)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/is/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)

Stdout JSON in your terminal with colors. This package has been created to stdout clean and beautiful JSON in the SlimIO CLI.

## Requirements
- Node.js v10 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @slimio/pretty-json
# or
$ yarn add @slimio/pretty-json
```

## Usage example
```js
const prettyJSON = require("@slimio/pretty-json");

prettyJSON({
    foo: "bar",
    hello: "world!",
    arr: [1, 2, 3]
});
```

It will produce the following stdout:

![stdout](https://i.imgur.com/R3fUoQH.png)

## API

### prettyJSON(obj: object): void
Stdout a given JSON Object (Plain Object, Objects Prototype of Object or Array).

## Dependencies

|Name|Refactoring|Security Risk|Usage|
|---|---|---|---|
|[kleur](https://github.com/lukeed/kleur#readme)|Minor|Low|CLI color|

## License
MIT
