# Webpack theme resolver
Theme resolver for webpack

## Usage
```
const ThemeResolverPlugin = require('@codebet/webpack-theme-resolver');

module.exports = {
  resolve: {
    plugins: [
      new ThemeResolverPlugin({
        // Path to theme directory. Can be relative to project directory or absolut path. Default: theme/
        themePath: 'theme/',
        soruce: 'resolve',
        target: 'resolve'
      })
    ]
  }
};
```
