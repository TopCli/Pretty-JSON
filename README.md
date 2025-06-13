# pretty-json
![version](https://img.shields.io/badge/dynamic/json.svg?style=for-the-badge&url=https://raw.githubusercontent.com/TopCli/Pretty-JSON/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/TopCli/Pretty-JSON/commit-activity)
[![mit](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://github.com/TopCli/Pretty-JSON/blob/master/LICENSE)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/TopCli/Pretty-JSON/badge?style=for-the-badge)](https://api.securityscorecards.dev/projects/github.com/TopCli/Pretty-JSON)
![build](https://img.shields.io/github/actions/workflow/status/TopCli/Pretty-JSON/node.js.yml?style=for-the-badge)

Pretty-print JSON to the terminal with syntax highlighting and structure-aware formatting.

## Requirements
- [Node.js](https://nodejs.org/en/) v20 or higher

## Getting Started

This package is available in the Node Package Repository and can be easily installed with [npm](https://docs.npmjs.com/getting-started/what-is-npm) or [yarn](https://yarnpkg.com).

```bash
$ npm i @topcli/pretty-json
# or
$ yarn add @topcli/pretty-json
```

## Usage example
```js
import prettyJSON from "@topcli/pretty-json";

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

Prints a JSON-compatible object or array to the terminal with syntax highlighting and structured indentation.

- Supports plain objects, arrays, and nested structures.
- Skips functions and symbols.
- Color-codes data types (strings, numbers, booleans, etc.).
- Outputs readable, formatted JSON — ideal for CLI inspection.

## License
MIT
