# Pipeline Game

#### Technologies: TypeScript, React 19, Vite, SCSS

A remake of two BBC Micro classics, [Pipeline](<https://en.wikipedia.org/wiki/Pipeline_(video_game)>)
and [Repton](<https://en.wikipedia.org/wiki/Repton_(video_game)>).

## Index

- [Requirements](#Requirements)
- [Installation and Run](#Install)
- [Scripts](#Scripts)
- [Screen Shots](#Shots)
- [Play Pipeline](#Play)
- [Level Edit](#Edit)
- [Releases](#Releases)

## <a name="Requirements">Requirements</a>

Node.js 26 or newer (see `.nvmrc`).

## <a name="Install">Installation and Run</a>

```shell
$ git clone https://github.com/adrianeyre/pipeline
$ cd pipeline
$ npm install
$ npm start
```

The dev server listens on http://localhost:3000.

## <a name="Scripts">Scripts</a>

| Script                      | What it does                                   |
| --------------------------- | ---------------------------------------------- |
| `npm start` / `npm run dev` | Vite dev server with hot reload                |
| `npm run build`             | Typecheck, then build the site into `dist-web` |
| `npm run preview`           | Serve the built site locally                   |
| `npm test`                  | Run the Vitest suite once                      |
| `npm run test:watch`        | Run the suite in watch mode                    |
| `npm run test:coverage`     | Run the suite with a V8 coverage report        |
| `npm run typecheck`         | `tsc --noEmit`                                 |
| `npm run lint`              | ESLint over the repo                           |
| `npm run format`            | Rewrite files with Prettier                    |
| `npm run format:check`      | Fail if anything is unformatted (what CI runs) |

## <a name="Shots">Screen Shots</a>

[![Screenshot](https://raw.githubusercontent.com/adrianeyre/pipeline/master/src/images/screenshot1.png)](https://raw.githubusercontent.com/adrianeyre/pipeline/master/src/images/screenshot1.png 'Game View')

[![Screenshot](https://raw.githubusercontent.com/adrianeyre/pipeline/master/src/images/screenshot2.png)](https://raw.githubusercontent.com/adrianeyre/pipeline/master/src/images/screenshot2.png 'Game View')

## <a name="Play">Pipeline</a>

- [Play on GitHub Pages](https://adrianeyre.github.io/pipeline/)

## <a name="Edit">Level Edit</a>

- While game is in play press `e` to toggle level edit screen
- While game is in play press `m` to display level map

Copy the map array and save it into `src/levels/level01.json`.

## <a name="Releases">Releases</a>

Every pull request runs lint, typecheck, tests and a build (`.github/workflows/ci.yml`).

Merging to `master` runs `.github/workflows/release.yml`, which uses
[semantic-release](https://github.com/semantic-release/semantic-release) to read the
[conventional commits](https://www.conventionalcommits.org/) since the last tag, decide the next
version, write `CHANGELOG.md`, tag and publish a GitHub release — and then builds the bumped tree
and deploys it to GitHub Pages.
