# pretty-json
![version](https://img.shields.io/badge/dynamic/json.svg?url=https://raw.githubusercontent.com/SlimIO/Pretty-JSON/master/package.json?token=AOgWw3vrgQuu-U4fz1c7yYZyc7XJPNtrks5catjdwA%3D%3D&query=$.version&label=Version)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://github.com/SlimIO/Pretty-JSON/commit-activity)
![MIT](https://img.shields.io/github/license/mashape/apistatus.svg)
![dep](https://img.shields.io/david/SlimIO/Pretty-JSON)
![size](https://img.shields.io/bundlephobia/min/@slimio/pretty-json)
[![Known Vulnerabilities](https://snyk.io//test/github/SlimIO/Pretty-JSON/badge.svg?targetFile=package.json)](https://snyk.io//test/github/SlimIO/Pretty-JSON?targetFile=package.json)
[![Build Status](https://travis-ci.com/SlimIO/Pretty-JSON.svg?branch=master)](https://travis-ci.com/SlimIO/Pretty-JSON)
[![Greenkeeper badge](https://badges.greenkeeper.io/SlimIO/Pretty-JSON.svg)](https://greenkeeper.io/)

Stdout JSON in your terminal with colors. This package has been created to stdout clean and beautiful JSON in the SlimIO CLI.

## Requirements
- [Node.js](https://nodejs.org/en/) v10 or higher

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
|[@slimio/is](https://github.com/SlimIO/is)|Minor|Low|Type checker|
|[kleur](https://github.com/lukeed/kleur)|Minor|Low|TTY color|

## License
MIT
