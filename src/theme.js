const { themeForms } = require('theme/forms');
const { themeColors } = require('./theme/colors');
const { themeTitles } = require('./theme/title');
const { themeImages } = require('./theme/images');
const { themeMessages } = require('./theme/messages');
const { themeRoutes } = require('./theme/routes');
const { themeGirdItem } = require('theme/gird_item');
const { themeHightlightStatus } = require('theme/hightlight_status');
const { themeDirection } = require('theme/direction');

module.exports = {
  name: 'Theming File',
  colors: themeColors,
  messages: themeMessages,
  images: themeImages,
  forms: themeForms,
  routes: themeRoutes,
  titles: themeTitles,
  gird: themeGirdItem,
  hightlightStatus: themeHightlightStatus,
  direction: themeDirection,
  // Add the fonts here
  /* fonts: {
    heading: `'Roboto Mono', sans-serif`,
    body: `'Roboto Mono', sans-serif`,
  }, */
};
