const { themeAPIsRoutes } = require('./routes/apis');
const { themePagesRoutes } = require('./routes/pages');

module.exports = {
  name: 'Theming Routes File',
  themeRoutes: {
    apiRoutes: themeAPIsRoutes,
    pages: themePagesRoutes,
  },
};
