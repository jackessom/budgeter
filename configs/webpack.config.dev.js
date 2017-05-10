var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var reactToolboxVariables = {
  'color-primary': 'var(--palette-blue-500)',
  'color-primary-dark': 'var(--palette-blue-500)',
  'color-accent': 'var(--palette-amber-800)',
  'color-accent-dark': 'var(--palette-amber-800)'
};

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    path.join(process.cwd(), 'src/index.jsx')
  ],
  output: {
    path: path.resolve(process.cwd(), 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    noParse: /node_modules\/localforage\/dist\/localforage.js/,
    preLoaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'eslint',
        include: /src/
      }
    ],
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loaders: ['react-hot', 'babel'],
        include: /src/
      },
      {
        test: /\.css$/,
        loaders: ['style', 'css?modules', 'postcss-loader'],
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        loader: 'file',
        query: {
          name: 'assets/images/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        loader: 'file-loader',
        query: {
          name: 'assets/fonts/[name].[ext]',
        },
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'public/index.html'
    })
  ],
  postcss: function (webpack) {
    return [
      require("stylelint")({
        context: 'src'
      }),
      require("postcss-import")(),
      require("postcss-cssnext")({
        features: {
          customProperties: {
            variables: reactToolboxVariables,
          },
        },
      })
    ]
  },
  eslint: {
    failOnWarning: false,
    failOnError: true,
  },
  resolve: {
    extensions: [
      '',
      '.js',
      '.jsx',
      '.json'
    ]
  },
};
