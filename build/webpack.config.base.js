const path = require('path')
const webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const createVueLoaderOptions = require('./vue-loader.config')
// const docsLoader = require.resolve('./doc-loader')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  mode: process.env.NODE_ENV,
  target: 'web',
  entry: path.join(__dirname, '../client/client-entry.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist'),
    publicPath: 'http://127.0.0.1:8000/public/'
  },
  module: {
    rules: [
      // .vue文件中自定义语言块 具体见https://vue-loader.vuejs.org/zh/guide/custom-blocks.html#example
      // {
      //   resourceQuery: /blockType=docs/,
      //   loader: docsLoader
      // },
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre'
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(gif|jpg|jpeg|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  // plugins: [
  //   new CleanWebpackPlugin(),
  //   new VueLoaderPlugin(),
  //   new HtmlPlugin(),
  //   new webpack.DefinePlugin({
  //     'process.env': {
  //       NODE_ENV: isDev ? '"development"' : '"production"'
  //     }
  //   })
  // ]
}

module.exports = config
