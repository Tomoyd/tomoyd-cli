// webpack.base.conf.js 文件
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 处理路径
function resolve(dir) {
  console.log(__dirname, __filename);
  return path.join(__dirname, '..', dir);
}
module.exports = {
  // 入口
  entry: {
    app: './src/index.js',
  },
  // 出口
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        ],

        include: resolve('src'),
        exclude: /node_modules/,
      },
      {
        oneOf: [
          {
            test: /\.css$/,
            exclude: /node_modules/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: true,
                  reloadAll: true,
                },
              },
              'css-loader',
              'postcss-loader',
            ],
          },
          {
            test: /\.less$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: true,
                  reloadAll: true,
                },
              },
              'css-loader',
              'postcss-loader',
            ],
            exclude: /node_modules/,
          },
          {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  name: 'images/[name].[contenthash].[ext]',
                },
              },
            ],
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf)$/i,
            use: ['file-loader'],
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.tsx', '.json'],
    alias: {
      '@': resolve('src'),
      public: resolve('public'),
    },
  },
};
