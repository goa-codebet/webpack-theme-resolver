const path = require('path');
const ThemeResolverPlugin = require('../ThemeResolverPlugin.js');

module.exports = {
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    plugins: [
      new ThemeResolverPlugin({
        themePath: 'theme/'
      })
    ]
  }
};
