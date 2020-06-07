const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const baseConfig = require('./webpack.config.base')

const devServer = {
  port: 7000,
  host: '0.0.0.0',
  overlay: {
    errors: true
  },
  open: true,
  hot: true
}

const cssLoaderOptions = {
  modules: {
    localIdentName: '[path]-[name]-[hash:base64:5]'
  },
  localsConvention: 'camelCase'
}

const defaultPlugins = [
  new CleanWebpackPlugin(),
  new VueLoaderPlugin(),
  new HtmlPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"development"'
    }
  })
]

let config = merge(baseConfig, {
  // devtool: 'cheap-module-eval-source=-map', // 默认项
  entry: path.join(__dirname, '../learn/index.js'),
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/,
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
  devServer,
  resolve: {
    alias: {
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ])
})

module.exports = config
