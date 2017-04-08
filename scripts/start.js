process.env.NODE_ENV = 'development';

require('dotenv').config({silent: true});

var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var open = require('opn');
var path = require('path');

var DEFAULT_PORT = process.env.PORT || 3000;

var config = require("../configs/webpack.config.dev");
config.entry.unshift("webpack-dev-server/client?http://localhost:" + JSON.stringify(DEFAULT_PORT) + "/", "webpack/hot/dev-server");
var compiler = webpack(config);

var devServer = new WebpackDevServer(compiler, {
  compress: true,
  clientLogLevel: 'none',
  contentBase: path.join(process.cwd(), 'public/index.jsx'),
  hot: true,
  publicPath: config.output.publicPath,
  quiet: false,
  // It suppress everything except error, so it has to be set to false as well
  // to see success build.
  noInfo: false,
  stats: {
    // Config for minimal console.log mess.
    assets: false,
    colors: true,
    version: false,
    hash: false,
    timings: false,
    chunks: false,
    chunkModules: false
  },
  inline: true,
  open: true,
  colors: true,
  // Reportedly, this avoids CPU overload on some systems.
  // https://github.com/facebookincubator/create-react-app/issues/293
  watchOptions: {
    ignored: /node_modules/
  }
});

// Launch WebpackDevServer.
devServer.listen(DEFAULT_PORT, (err, result) => {
  if (err) {
    return console.log(err);
  }
  console.log('Starting the development server...');
  open('http://localhost:' + JSON.stringify(DEFAULT_PORT) + '/');
});
