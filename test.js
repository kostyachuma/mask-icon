const merge = require('lodash/merge');
const cssMatcher = require('jest-matcher-css');
const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
// eslint-disable-next-line import/extensions
const customPlugin = require('./index.js');

expect.extend({
  toMatchCss: cssMatcher,
});

function generatePluginCss(overrides) {
  const config = {
    theme: {
      // Default options for your plugin.
      maskIcon: {
        'test-icon': 'test-url',
      },
    },
    variants: {
      // Default variants for your plugin.
      maskIcon: [],
    },
    corePlugins: false,
    plugins: [customPlugin],
  };

  return postcss(tailwindcss(merge(config, overrides)))
    .process('@tailwind utilities', {
      from: undefined,
    })
    .then(({ css }) => css);
}

test('utility classes can be generated', () => {
  return generatePluginCss().then(css => {
    expect(css).toMatchCss(`    
    .mask-icon-test-icon {
      display: inline-block;
      background: currentColor;
      mask-repeat: no-repeat !important;
      -webkit-mask-repeat: no-repeat !important;
      mask-position: center center !important;
      -webkit-mask-position: center center !important;
      mask-size: contain !important;
      -webkit-mask-size: contain !important
      mask: url("test-url");
      -webkit-mask: url("test-url")
    }
    `);
  });
});

test('variants can be customized', () => {
  return generatePluginCss({
    theme: {
      screens: {
        sm: '640px',
      },
    },
    variants: {
      maskIcon: ['responsive', 'hover'],
    },
  }).then(css => {
    expect(css).toMatchCss(`
    .mask-icon-test-icon {
      display: inline-block;
      background: currentColor;
      mask-repeat: no-repeat !important;
      -webkit-mask-repeat: no-repeat !important;
      mask-position: center center !important;
      -webkit-mask-position: center center !important;
      mask-size: contain !important;
      -webkit-mask-size: contain !important
      mask: url("test-url");
      -webkit-mask: url("test-url")
    }

    .hover\\:mask-icon-test-icon:hover {
      display: inline-block;
      background: currentColor;
      mask-repeat: no-repeat !important;
      -webkit-mask-repeat: no-repeat !important;
      mask-position: center center !important;
      -webkit-mask-position: center center !important;
      mask-size: contain !important;
      -webkit-mask-size: contain !important
      mask: url("test-url");
      -webkit-mask: url("test-url")
    }

    @media (min-width: 640px) {
      .sm\\:mask-icon-test-icon {
        display: inline-block;
        background: currentColor;
        mask-repeat: no-repeat !important;
        -webkit-mask-repeat: no-repeat !important;
        mask-position: center center !important;
        -webkit-mask-position: center center !important;
        mask-size: contain !important;
        -webkit-mask-size: contain !important
        mask: url("test-url");
        -webkit-mask: url("test-url")
      }

      .sm\\:hover\\:mask-icon-test-icon:hover {
        display: inline-block;
        background: currentColor;
        mask-repeat: no-repeat !important;
        -webkit-mask-repeat: no-repeat !important;
        mask-position: center center !important;
        -webkit-mask-position: center center !important;
        mask-size: contain !important;
        -webkit-mask-size: contain !important
        mask: url("test-url");
        -webkit-mask: url("test-url")
      }
    }
    `);
  });
});
