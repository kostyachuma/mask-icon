# mask-icon

> Plugin for creating icons using CSS mask

Install the plugin from npm:

```
$ npm install mask-icon -D
```

```
$ yarn add mask-icon -D
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
    maskIcon: {
      'example' :  '../images/example.svg',
    },
  },
  variants: {},
  plugins: [
    // ...
    require('@desp.pro/mask-icon'),
  ],
};
```

This plugin will generate following CSS:

```css
/* ... */
.mask-icon-example {
    display: inline-block;
    background: currentColor;
    mask-repeat: no-repeat !important;
    -webkit-mask-repeat: no-repeat !important;
    mask-position: center center !important;
    -webkit-mask-position: center center !important;
    mask-size: contain !important;
    -webkit-mask-size: contain !important;
    mask: url(../images/example.svg);
    -webkit-mask: url(../images/example.svg);
}
/* ... */
```

## License

mask-icon is licensed under the MIT License.

## Credits

Created with [create-tailwind-plugin](https://github.com/Landish/create-tailwind-plugin).
