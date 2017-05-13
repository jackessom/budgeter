var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var OfflinePlugin = require('offline-plugin');
var ProgressBarPlugin = require('progress-bar-webpack-plugin');

var reactToolboxVariables = {
  'color-primary': 'var(--palette-blue-500)',
  'color-primary-dark': 'var(--palette-blue-500)',
  'color-accent': 'var(--palette-amber-800)',
  'color-accent-dark': 'var(--palette-amber-800)'
};

module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  entry: [
    path.join(process.cwd(), 'src/index.jsx'),
  ],
  output: {
    path: path.resolve(process.cwd(), 'build'),
    filename: 'bundle.js',
    publicPath: '/budgeter/'
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
        /* loader: ExtractTextPlugin.extract(
          'style',
          'css?modules',
          'postcss-loader'
        ), */
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
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new HtmlWebpackPlugin({
      title: 'My App',
      template: 'public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      }
    }),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    }),
    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    // new ExtractTextPlugin('assets/css/[name].[contenthash:8].css'),
    // copy web manifest stuff over to build
    new CopyWebpackPlugin([
      { from: path.join(process.cwd(), 'public') }
    ], {
      ignore: [
        '*.html',
        '.DS_Store',
      ],
      copyUnmodified: true
    }),
    new OfflinePlugin(),
    new ProgressBarPlugin({
      format: '  build [:bar] ' + ':percent' + ' (:elapsed seconds)',
      clear: false
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
    failOnWarning: true,
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
