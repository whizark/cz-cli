# cz-cli

[![npm][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]

[commitizen][] CLI and the adapters as local dependencies.

The commitizen adapter that is used when you commit your changes is determined
based on the following steps.

1.  If `.cz-config.js` exists in your package root directory,
    [cz-customizable][] is used.

2.  Otherwise [cz-conventional-changelog][] is used.

`.cz-config.js` has been [deprecated][] and removed since official
`cz-customizable@5.0.0`. However, this package supports it in order not to
require `config.cz-customizable.config` in `package.json`.

## Installation

Install `@whizark/cz-cli` as a local dependency.

```sh
npm install @whizark/cz-cli --save-dev
```

## Usage

Add `scripts.commit` to your `package.json`.

```json
{
    "scripts": {
        "commit": "git cz"
    }
}
```

When you want to commit your changes, all you need to do is type the following
command.

```sh
npm run commit
```

As a shortcut, you might type the following command with [npm-quick-run][].

```sh
nr commit
```

Or you can run `git` command with [npm-run][].

```sh
npm-run git cz
```

In this case, you need not add `scripts.commit` into your `package.json`.

[commitizen]: https://github.com/commitizen/cz-cli
[cz-conventional-changelog]: https://github.com/commitizen/cz-conventional-changelog
[cz-customizable]: https://github.com/leonardoanalista/cz-customizable
[npm-quick-run]: https://github.com/bahmutov/npm-quick-run
[npm-run]: https://github.com/timoxley/npm-run
[deprecated]: https://github.com/leonardoanalista/cz-customizable/commit/7ab2559725b3fb83cabaabff32a2be46425f01e8#diff-04c6e90faac2675aa89e2176d2eec7d8L44

[npm-image]: https://img.shields.io/npm/v/@whizark/cz-cli.svg
[npm-url]: https://www.npmjs.com/@whizark/cz-cli

[travis-image]: https://travis-ci.org/whizark/cz-cli.svg?branch=master
[travis-url]: https://travis-ci.org/whizark/cz-cli
