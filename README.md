# TEA Stack template

> [`TypeScript`](https://www.typescriptlang.org) / [`Electron`](https://www.electronjs.org) / [`Angular`](https://angular.io) to build a cross-platform app

## Glossary
* `app` means the Angular project used for the renderer process of Electron
* `main` means the TypeScript project for the main process of Electron

## Build
* Use `@angular/cli` to build web assets for the renderer process
* Use `tsc` to build for the main process
* Use [`electron-builder`](https://www.electron.build) to build installers/executables

## Develop
* `npm install` to get the deps
* `npm run start:app` to serve the angular app at http://localhost:4200
* `npm run start:main` to start up electron
* `npm run build:out` to get the output by `electron-builder`

## Build installers/executables

```shell
$ npm run build:app
$ npm run build:main
$ npm run build:prod
```
