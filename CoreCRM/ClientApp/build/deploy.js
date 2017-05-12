const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodeExternals = require('webpack-node-externals');

webpack({
  // Configuration Object
  context: path.join(__dirname, '../src'),
  target: 'node',
  entry: {
    theme: './theme.js',
  },
  output: {
    path: path.join(__dirname, '../dist'),
    filename: '[name].js',
  },
  externals: [NodeExternals()],
  plugins: [
    new CopyWebpackPlugin([
      {
        context: path.join(__dirname, '../dist/client'),
        from: '*.js',
        to: path.join(__dirname, '../../wwwroot/js/[name].[ext]'),
      },
      {
        context: path.join(__dirname, '../dist/client'),
        from: '*.css',
        to: path.join(__dirname, '../../wwwroot/css/[name].[ext]'),
      },
    ], {debug: 'warning'}),
  ],
}, (err, stats) => {
  if (err || stats.hasErrors()) {
    // Handle errors here
    console.log(err); // eslint-disable-line
    stats.compilation.errors.forEach((error) => {
      console.log(error); // eslint-disable-line
    });
  }
  // Done processing
  console.log('Deploy done.'); // eslint-disable-line
});
