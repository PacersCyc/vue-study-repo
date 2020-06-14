const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VueServerPlugin = require('vue-server-renderer/server-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const cssLoaderOptions = {
  modules: {
    localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
  },
  localsConvention: 'camelCase'
}

let config

config = merge(baseConfig, {
  target: 'node',
  entry:  path.join(__dirname, '../client/server-entry.js'),
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.join(__dirname, '../server-build')
  },
  devtool: 'source-map',
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      // MiniCssExtractPlugin会使用document window等dom api造成ssr渲染时报错，故不在server配置中使用, 具体见 https://segmentfault.com/a/1190000020782379
      {
        test: /\.s(a|c)ss$/,
        oneOf: [
          {
            resourceQuery: /module/,
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: cssLoaderOptions
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'sass-loader'
            ]
          },
          {
            resourceQuery: /scoped/,
            use: [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'sass-loader'
            ]
          },
          {
            use: [
              'vue-style-loader',
              {
                loader: 'css-loader',
                options: cssLoaderOptions
              },
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'sass-loader'
            ]
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      // chunkFilename: '[id].[contenthash].css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"server"'
    }),
    new VueServerPlugin()
  ]
})

module.exports = config
