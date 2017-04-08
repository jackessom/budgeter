process.env.NODE_ENV = 'production';

var webpack = require("webpack");

var config = require("../configs/webpack.config.prod");

console.log('starting build...');

webpack(config).run((err, stats) => {

    var jsonStats = stats.toJson();
    
    if (err) {
      if (jsonStats.errors.length > 0) {
        console.log(jsonStats.errors);
      }
      return;
    }

    if (jsonStats.warnings.length > 0) {
      console.log(jsonStats.warnings);
    }

    console.log('built!');

});
