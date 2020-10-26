const path = require('path');
const baseConf = require('./webpack.base.conf');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
console.log('develop');
console.log({ __dirname }, path.join(__dirname, '../public/main.html'));
const devConfig = {
  mode: 'development',
  output: {
    filename: 'js/[name].[contenthash].js',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    usedExports: true,
  },
  devtool: 'source-map',
  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, '../dist'),
    open: false,
    hot: true,
    compress: true,
    proxy: {},
  },
  plugins: [
    new CleanWebpackPlugin({}),
    new HtmlWebpackPlugin({
      template: 'public/main.html',
      title: 'hello h5',
      // inject: 'body',
      // minify: {
      //   html5: true,
      // },
    }),
    new MiniCssExtractPlugin({
      // filename: '[name].css',
      // chunkFilename: '[id].css',
      // ignoreOrder: true,
    }),
  ],
};

module.exports = {
  ...baseConf,
  ...devConfig,
};
