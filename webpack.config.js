var path = require('path');
var HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  devtool: 'eval',
  entry: [
    './src/application.js'
  ],
  output: {
    path: path.join(__dirname, 'build', 'static'),
    filename: 'application.js',
    publicPath: '/'
  },
  plugins: [
    new HTMLWebpackPlugin({
      title: 'Testing',
      hash: true,
      inject: true,
      template: path.join(__dirname, 'views/index.ejs')
    })
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel'],
        exclude: /node_modules/
      },
      {
        test: /\.ejs$/, 
        loader: 'ejs-html?title=The%20Big%20Gatsby&production'
      }
    ]
  }
};
