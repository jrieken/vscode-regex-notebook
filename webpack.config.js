//@ts-check

const path = require('path');

const rendererConfig = {
  devtool: 'source-map',
  mode: 'none',
  entry: './src/regexper/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'regexper.js',
  },
  resolve: {
    extensions: ['.js', '.ts'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: path.resolve(__dirname, './src/regexper/tsconfig.json'),
            compilerOptions: {
              module: 'esnext',
            },
          },
        },],
      },
    ],
  }
};


module.exports = [rendererConfig];
