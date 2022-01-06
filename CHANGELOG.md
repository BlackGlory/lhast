# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.4.4](https://github.com/BlackGlory/lhast/compare/v0.4.3...v0.4.4) (2022-01-06)


### Features

* add addHelpers, removeHelpers, withHelpers, withHelpersInPlace ([c2945cd](https://github.com/BlackGlory/lhast/commit/c2945cdfefc66f51c230531782b2dae929e3e80a))

### [0.4.3](https://github.com/BlackGlory/lhast/compare/v0.4.2...v0.4.3) (2022-01-06)

### [0.4.2](https://github.com/BlackGlory/lhast/compare/v0.4.1...v0.4.2) (2022-01-05)

### [0.4.1](https://github.com/BlackGlory/lhast/compare/v0.4.0...v0.4.1) (2021-12-31)


### Features

* add reverse ([5a41aab](https://github.com/BlackGlory/lhast/commit/5a41aabf6e6477229fa85aae2d77f572086402d8))

## [0.4.0](https://github.com/BlackGlory/lhast/compare/v0.3.5...v0.4.0) (2021-12-31)


### ⚠ BREAKING CHANGES

* `map`, `flatMap` now use shallow copy.
Rename `addHelpers` to `addHelpersInPlace`.
Rename `removeHelpers` to `removeHelpersInPlace`.

* replace deep copy with shallow copy ([91bc941](https://github.com/BlackGlory/lhast/commit/91bc941f2862d3c76571dc883972b78945cfc8e3))

### [0.3.5](https://github.com/BlackGlory/lhast/compare/v0.3.4...v0.3.5) (2021-12-30)


### Bug Fixes

* import ([890d859](https://github.com/BlackGlory/lhast/commit/890d8591010f7d74110398ae10610bfd0193dc3a))

### [0.3.4](https://github.com/BlackGlory/lhast/compare/v0.3.3...v0.3.4) (2021-12-29)


### Features

* trim text ([1a24d92](https://github.com/BlackGlory/lhast/commit/1a24d9261d7b000d6ffddfeffb9ad4248f686c25))

### [0.3.3](https://github.com/BlackGlory/lhast/compare/v0.3.2...v0.3.3) (2021-12-29)


### Features

* improve getTextContentForSearch ([bf96335](https://github.com/BlackGlory/lhast/commit/bf96335be21bb8e3fda2a0c5d9ff7e94dd47dacf))

### [0.3.2](https://github.com/BlackGlory/lhast/compare/v0.3.1...v0.3.2) (2021-12-29)


### Features

* improve getTextContentForSearch ([4d9663a](https://github.com/BlackGlory/lhast/commit/4d9663a8a06499ae86d6201f5c6d5a2782c6527f))

### [0.3.1](https://github.com/BlackGlory/lhast/compare/v0.3.0...v0.3.1) (2021-12-28)


### Features

* add utils ([699516b](https://github.com/BlackGlory/lhast/commit/699516bb57474155d5cb13c06ab767f139644b45))

## [0.3.0](https://github.com/BlackGlory/lhast/compare/v0.2.1...v0.3.0) (2021-12-18)


### ⚠ BREAKING CHANGES

* - Rename `AST` to `LHAST`
- Rename `AST_COMPACT` to `LHASTCompact`
- Rename `validateAST` to `validateLHAST`
- Rename `validateASTCompact` to `validateLHASTCompact`
- Rename `isAST` to `isLHAST`
- Rename `isASTCompact` to `isLHASTCompact`
- Rename `astSchema` to `LHASTSchema`
- Rename `astCompactSchema` to `LHASTCompactSchema`

* rename ([0a501ee](https://github.com/BlackGlory/lhast/commit/0a501ee1834df628fea1638451393d6b39b7d707))

### [0.2.1](https://github.com/BlackGlory/lhast/compare/v0.2.0...v0.2.1) (2021-12-17)


### Features

* add validate, is, schema ([8c69cab](https://github.com/BlackGlory/lhast/commit/8c69cabaafd0c7eada7e05e39b7dd9f3ee406770))

## [0.2.0](https://github.com/BlackGlory/lhast/compare/v0.1.1...v0.2.0) (2021-12-16)


### ⚠ BREAKING CHANGES

* - `wrap` => `addHelpers`
- `unwrap` => `removeHelpers`

* rename wrap to addHelpers, unwrap to removeHelpers ([7e2c9fe](https://github.com/BlackGlory/lhast/commit/7e2c9fea185ebb96e8a45f63ec308cec21b2201c))

### [0.1.1](https://github.com/BlackGlory/lhast/compare/v0.1.0...v0.1.1) (2021-12-15)


### Bug Fixes

* **build:** paths ([d2be79b](https://github.com/BlackGlory/lhast/commit/d2be79b597c5d140def68abb27f9f1859910673c))

## 0.1.0 (2021-12-15)


### Features

* init ([7376dae](https://github.com/BlackGlory/lhast/commit/7376dae7706381e87414027e8de96743038c03d5))
