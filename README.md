# 🎑 Polaroid Image Element

Wraps image in polaroid style border and allows for image to be rotated and inline with text appropriately wrapping around the image.

## Installation

```bash
npm install --save @empatheticbot/polaroid-image-element
```

## Usage

### Import

**Import as ES module:**

```javascript
import '@empatheticbot/polaroid-image-element'
```

**With a script tag:**

```html
<script type="module" src="./node_modules/@empatheticbot/polaroid-element/dist/index.js">
```

_Note that the path is relative to the root of your project, this may not be the case in your application, so check to make sure your path is correct and the module is being served._

### Markup

```html
<polaroid-image
 rotate="13"
 align="right">
 <img 
  alt="Something descriptive about my image." 
  src="..." 
  height="400x" 
  width="600px" />
</polaroid-image>
```

### Attributes

| Name | Description | Type | Default |
| ----- | ---------- | ---- | ------ |
| `align` | Where the image should be displayed in the containing element | `right \| left` | `right` |
| `rotate` | The angle, in degrees, the image should be rotated | `number` | `0` |

## Development

To install dependencies and build the custom element:

```bash
npm install
npm run build
```

The resulting built custom element can be found in the `dist` directory. From here you can start a simple HTTP server with `npm run start` and navigate to <http://localhost:3000/examples/>. Note that if you make changes to source you will need to run `npm run build` again and refresh the page.
