const { resolve } = require('path')
const webpack = require('webpack')

const basicConfig = () => {
  return {
    entry: {
      app: resolve('./src/main.js')
    },
    output: {
      path: resolve('dist'),
      publicPath: resolve('dist')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            'eslint-loader'
          ]
        },
        {
          test: /\.vue$/,
          loader: []
        },
        {
          enforce: 'pre',
          test: /\.vue$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: 'file-loader',
          query: {
            name: 'font/[hash:8].[ext]'
          }
        },
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'url-loader',
          query: {
            limit: 10000,
            name: 'img/[hash:8].[ext]'
          }
        }
      ]
    },
    resolve: {
      extensions: ['.js', '.vue', '.json', '.css', '.less'],
      alias: {
        '~src': resolve('src'),
        '~components': resolve('src/components'),
        '~pages': resolve('src/pages'),
        '~assets': resolve('src/assets'),
        '~store': resolve('src/store'),
        '~static': resolve('src/static')
      }
    },
    plugins: [
      new webpack.BannerPlugin({
        banner: '// { "framework": "Vue" }\n',
        raw: true
      })
    ],
    devServer: {
      historyApiFallback: true,
      noInfo: true,
      host: '0.0.0.0',
      port: 1337,
      disableHostCheck: true
    },
    performance: {
      hints: false
    },
    devtool: '#eval-source-map'
  }
}

let webConfig = basicConfig()
webConfig.output.filename = '[name].web.js'
webConfig.module.rules[1].loader.push('vue-loader')

let weexConfig = basicConfig()
weexConfig.output.filename = '[name].weex.js'
weexConfig.module.rules[1].loader.push('weex-loader')

module.exports = [webConfig, weexConfig]

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}
