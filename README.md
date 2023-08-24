# TEA Stack template

> [`TypeScript`](https://www.typescriptlang.org) / [`Electron`](https://www.electronjs.org) / [`Angular`](https://angular.io) to build a cross-platform app

## Glossary
* `app` means the Angular project used for the renderer process of Electron
* `main` means the TypeScript project for the main process of Electron

## Build
* Using [`@angular/cli`](https://angular.io/cli) to build web assets for the renderer process
* Using [`esbuild`](https://esbuild.github.io) to build a bundled `app.min.js` for the main process
* Using [`electron-builder`](https://www.electron.build) to build installers/executables

## Develop
* `npm install` to get the deps
* `npm run start:app` to serve the angular app at http://localhost:4200
* `npm run start:main -- --serve` to start up electron to debug with the served angular app
* `npm run build:out` to get the output by `electron-builder`

## Build installers/executables

```shell
$ npm run build:app
$ npm run build:main
$ npm run build:prod
```
