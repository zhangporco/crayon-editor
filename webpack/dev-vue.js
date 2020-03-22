const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  mode: 'production',
  entry: './example/vue/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: '0.0.0.0',
    port: 8080,
    hot: true,
    open: true
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          hotReload: true
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(svg|png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'url-loader',
        options: {
          limit: 2 * 1024,
          name: '[path][name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '../example/vue/index.html'),
      collapseWhitespace: true,
      minifyJS: true,
      minifyCSS: true,
      removeComments: true
    }),
    new VueLoaderPlugin()
  ]
}
