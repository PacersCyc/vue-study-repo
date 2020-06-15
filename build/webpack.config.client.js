const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const VueClientPlugin = require('vue-server-renderer/client-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const devServer = {
  port: 8000,
  host: '0.0.0.0',
  headers: {
    "Access-Control-Allow-Origin": "*"
  },
  overlay: {
    errors: true
  },
  open: true,
  hot: true,
  historyApiFallback: {
    index: '/public/index.html'
  },
  proxy: {
    '/api': 'http://127.0.0.1:3333',
    '/user': 'http://127.0.0.1:3333'
  }
}

const cssLoaderOptions = {
  modules: {
    localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]'
  },
  localsConvention: 'camelCase'
}

const defaultPlugins = [
  new CleanWebpackPlugin(),
  new VueLoaderPlugin(),
  new HtmlPlugin({
    template: path.join(__dirname, 'template.html')
  }),
  new VueClientPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  })
]

let config

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#@cheap-module-eval-source-map', // 默认项
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
    plugins: defaultPlugins.concat([
      new webpack.HotModuleReplacementPlugin(),
      // new webpack.NoEmitOnErrorsPlugin()
    ])
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/client-entry.js'),
    },
    output: {
      filename: '[name].[chunkhash:8].js',
      publicPath: '/public/'
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/,
          oneOf: [
            {
              resourceQuery: /module/,
              use: [
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    hmr: process.env.NODE_ENV === 'development',
                  },
                },
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
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    hmr: process.env.NODE_ENV === 'development',
                  },
                },
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
                {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                    hmr: process.env.NODE_ENV === 'development',
                  },
                },
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
    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash].css',
        // chunkFilename: '[id].[contenthash].css'
      })
    ]),
    optimization: {
      splitChunks: {
        chunks: 'all'
        // cacheGroups: {
        //   commons: {
        //     chunks: 'initial',
        //     minChunks: 2, maxInitialRequests: 5,
        //     minSize: 0
        //   },
        //   vendor: {
        //     test: /node_modules/,
        //     chunks: 'initial',
        //     name: 'vendor',
        //     priority: 10,
        //     enforce: true
        //   }
        // },
      },
      runtimeChunk: true
    }
  })
}

module.exports = config
