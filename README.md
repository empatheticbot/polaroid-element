# template-element

Custom Element template project.

## Installation

```bash
$ npm install --save @empatheticbot/template-element
```

## Usage

### Import

**Import as ES module:**

```javascript
import '@empatheticbot/template-element'
```

**With a script tag:**

```html
<script type="module" src="./node_modules/@empatheticbot/template-element/dist/index.js">
```

_Note that the path is relative to the root of your project, this may not be the case in your application, so check to make sure your path is correct and the module is being served._

### Markup

```html
<template-element></template-element>
```

### Attributes

-

### Events

-

## Development

To install dependencies and build the custom element:

```
npm install
npm run build
```

The resulting built custom element can be found in the `dist` directory. From here you can start a simple HTTP server with `npm run start` and navigate to http://localhost:3000/examples/. Note that if you make changes to source you will need to run `npm run build` again and refresh the page.

Tests should be written and live next to the source code it tests. The file name should match that of what it tests with an extension of `.test.ts`. Tests can be ran with `npm run test`.

## Notes

- Special thanks to [Github Custom Element Boilerplate](https://github.com/github/custom-element-boilerplate) project for a lot of inspiration with this template.
