# pretty-json
![version](https://img.shields.io/badge/dynamic/json.svg?style=for-the-badge&url=https://raw.githubusercontent.com/TopCli/Pretty-JSON/master/package.json&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=for-the-badge)](https://github.com/TopCli/Pretty-JSON/commit-activity)
[![mit](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://github.com/TopCli/Pretty-JSON/blob/master/LICENSE)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/TopCli/Pretty-JSON/badge?style=for-the-badge)](https://api.securityscorecards.dev/projects/github.com/TopCli/Pretty-JSON)
![build](https://img.shields.io/github/actions/workflow/status/TopCli/Pretty-JSON/node.js.yml?style=for-the-badge)

Stdout JSON in your terminal with colors. This package has been created to stdout clean and beautiful JSON in the  SlimIO CLI.

## Requirements
- [Node.js](https://nodejs.org/en/) v16 or higher

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
Stdout a given JSON Object (Plain Object, Objects Prototype of Object or Array).

## Dependencies

|Name|Refactoring|Security Risk|Usage|
|---|---|---|---|
|[@slimio/is](https://github.com/SlimIO/is)|Minor|Low|Type checker|
|[kleur](https://github.com/lukeed/kleur)|Minor|Low|TTY color|

## License
MIT
