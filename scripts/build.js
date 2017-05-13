process.env.NODE_ENV = 'production';

var inquirer = require('inquirer');
var webpack = require("webpack");
var ghpages = require('gh-pages');

var config = require("../configs/webpack.config.prod");

console.log('  Starting build...');

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

    inquirer.prompt([{ type: 'confirm',
      name: 'gh-page-publish',
      message: 'Do you want to publish to github pages?',
    },]).then(function (answers) {
      if (answers['gh-page-publish']) {
        ghpages.publish('build', function(err) {
          if (err) {
            console.log('Error when tring to publishing to github pages!');
            console.log(err);
          } else {
            console.log('Successfully published!');
          }
        });
      }
    });

});
