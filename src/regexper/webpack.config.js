const { join } = require('path');

module.exports = {
  context: __dirname,
  mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
  devtool: 'source-map',
  entry: {
    regexper: './main.js',
  },
  output: {
    filename: '[name].js',
    path: join(__dirname, '../../dist'),
    libraryTarget: 'window'
  },
  resolve: {
    mainFields: ['module', 'main'],
    extensions: ['.js'] // support ts-files and js-files
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: [{
        loader: 'ts-loader',
        options: {
          compilerOptions: {
            'rootDir': __dirname,
            'sourceMap': true,
            'allowJs': true,
            'module': 'es6'
          }
        }
      }]
    }]
  },
};
