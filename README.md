<h1 align="center">Unstorage Migrator</h1>

<p align="center">Migrate between unstorage backends</p>

<p align="center">
	<!-- prettier-ignore-start -->
	<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
	<a href="#contributors" target="_blank"><img alt="👪 All Contributors: 1" src="https://img.shields.io/badge/%F0%9F%91%AA_all_contributors-1-21bb42.svg" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
	<!-- prettier-ignore-end -->
	<a href="https://github.com/nperez0111/unstorage-migrator/blob/main/.github/CODE_OF_CONDUCT.md" target="_blank"><img alt="🤝 Code of Conduct: Kept" src="https://img.shields.io/badge/%F0%9F%A4%9D_code_of_conduct-kept-21bb42" /></a>
	<a href="https://codecov.io/gh/nperez0111/unstorage-migrator" target="_blank"><img alt="🧪 Coverage" src="https://img.shields.io/codecov/c/github/nperez0111/unstorage-migrator?label=%F0%9F%A7%AA%20coverage" /></a>
	<a href="https://github.com/nperez0111/unstorage-migrator/blob/main/LICENSE.md" target="_blank"><img alt="📝 License: MIT" src="https://img.shields.io/badge/%F0%9F%93%9D_license-MIT-21bb42.svg"></a>
	<a href="http://npmjs.com/package/unstorage-migrator"><img alt="📦 npm version" src="https://img.shields.io/npm/v/unstorage-migrator?color=21bb42&label=%F0%9F%93%A6%20npm" /></a>
	<img alt="💪 TypeScript: Strict" src="https://img.shields.io/badge/%F0%9F%92%AA_typescript-strict-21bb42.svg" />
</p>

## Usage

```shell
npm i unstorage-migrator
```

```ts
// Not yet published to npm, so you'll need to clone the repo and run `npm i` in the root directory
import { migrate } from "unstorage-migrator";

for await (const migrated of migrate({ storage, from, to })) {
	console.log(
		`Migrated ${migrated.index}/${migrated.total}: ${migrated.fromKey} -> ${migrated.toKey}`,
	);
}
```

## Development

See [`.github/CONTRIBUTING.md`](./.github/CONTRIBUTING.md), then [`.github/DEVELOPMENT.md`](./.github/DEVELOPMENT.md).
Thanks! 💖

<!-- You can remove this notice if you don't want it 🙂 no worries! -->

> 💝 This package was templated with [`create-typescript-app`](https://github.com/JoshuaKGoldberg/create-typescript-app) using the [`create` engine](https://create.bingo).
