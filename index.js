const plugin = require('tailwindcss/plugin');

module.exports = plugin(
  function ({ addUtilities, theme, variants }) {
    // If your plugin requires user config,
    // you can access these options here.
    // Docs: https://tailwindcss.com/docs/plugins#exposing-options
    const options = theme('maskIcon');

    // Add CSS-in-JS syntax to create utility classes.
    // Docs: https://tailwindcss.com/docs/plugins#adding-utilities
    // const utilities = {
    //   '.mask-icon': {
    //     display: 'inline-block',
    //     background: 'currentColor',
    //     'mask-repeat': 'no-repeat !important',
    //     '-webkit-mask-repeat': 'no-repeat !important',
    //     'mask-position': 'center center !important',
    //     '-webkit-mask-position': 'center center !important',
    //     'mask-size': 'contain !important',
    //     '-webkit-mask-size': 'contain !important',

    //     mask: 'url("../img/icon-arrow.svg")',
    //     '-webkit-mask': 'url("../img/icon-arrow.svg")',
    //   },
    // };

    const utilities = {};

    /* eslint-disable-next-line */
    for (const [key, value] of Object.entries(options)) {
      utilities[`.mask-icon-${key}`] = {
        display: 'inline-block',
        background: 'currentColor',
        'mask-repeat': 'no-repeat !important',
        '-webkit-mask-repeat': 'no-repeat !important',
        'mask-position': 'center center !important',
        '-webkit-mask-position': 'center center !important',
        'mask-size': 'contain !important',
        '-webkit-mask-size': 'contain !important',
        mask: `url("${value}")`,
        '-webkit-mask': `url("${value}")`,
      };
    }

    addUtilities(utilities, {
      variants: variants('maskIcon'),
    });
  },
  {
    theme: {
      // Default options for your custom plugin.
      // Docs: https://tailwindcss.com/docs/plugins#exposing-options
      maskIcon: {},
    },
    variants: {
      // Default variants for your custom plugin.
      // Docs: https://tailwindcss.com/docs/plugins#variants
      maskIcon: ['responsive'],
    },
  }
);
