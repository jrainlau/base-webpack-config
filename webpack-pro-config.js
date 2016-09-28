/**
 * 产品模式下的webpack配置
 *
 * 注意。两种模式的配置有较大差异！！
 */

var path = require('path');

var webpack = require('webpack');

var HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack中生成HTML的插件，

module.exports = {
  entry: {
    // 文件入口配置
    index: './src/index'
  },
  devtool: 'source-map',

  output: {
    // 文件输出配置

    path: path.join(__dirname, 'dist'),
    // 输出目录的配置，模板、样式、脚本、图片等资源的路径配置都相对于它

    publicPath: '',
    // 模板、样式、脚本、图片等资源对应的server上的路径

    filename: '[name].min.js'
    // 命名生成的JS
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      // 压缩代码
      compressor: {
        warnings: false
      }
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // 很多库的内部，有process.NODE_ENV的判断语句，
    // 改为production。最直观的就是没有所有的debug相关的东西，体积会减少很多


    // new webpack.optimize.CommonsChunkPlugin('vendor.js' ),
    // 'vendor' 就是把依赖库(比如react react-router, redux)全部打包到 vendor.js中
    // 'vendor.js' 就是把自己写的相关js打包到bundle.js中
    // 一般依赖库放到前面，所以vendor放第一个

    new HtmlWebpackPlugin({
      title: '产品模式',
      filename:'index.html',
      // 文件名以及文件将要存放的位置

      inject:'body',
      // js插入的位置，true/'head'  false/'body'

      chunks: ['index' ],
      // 指定引入的chunk，根据entry的key配置，不配置就会引入所有页面的资源

      hash:false,
      // 这样每次客户端页面就会根据这个hash来判断页面是否有必要刷新
      // 在项目后续过程中，经常需要做些改动更新什么的，一但有改动，客户端页面就会自动更新！

      minify:{
        // 压缩HTML文件
        removeComments:true,
        // 移除HTML中的注释

        collapseWhitespace:false
        // 删除空白符与换行符
      }
    })
  ],

  resolve: {
    extensions: ['', '.js', 'jsx']
  },
  // 实际就是自动添加后缀，默认是当成js文件来查找路径
  // 空字符串在此是为了resolve一些在import文件时不带文件扩展名的表达式

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/,
        include: __dirname
      }
    ]
  }
}