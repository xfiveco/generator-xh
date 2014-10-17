'use strict';

var fileName = '.yo-rc.json';
var fs = require('fs');
var Q = require('q');
var deferred = Q.defer();
var chalk = require('chalk');
var utils = require('./utils/index');

var checkConfig = {
  fileContent: function () {
    fs.readFile(fileName, 'utf8', function (err, data) {
      if (err) {
        deferred.reject(new Error(err));
      } else {
        deferred.resolve(data);
      }
    });
    return deferred.promise;
  },

  result: function (result) {
    var fileContentJSON = JSON.parse(result);
    var props = fileContentJSON['generator-xh'].config;
    var utils = require('./utils/index');

    this.configFound = true;

    if (this.options.interactive === false) {
      utils.setProps.apply(this, [props]);
    } else {
      var done = this.async();

      utils.welcome();
      this.log('Configuration file found in your project root folder with a name: \n  ' + chalk.yellow(props.projectName) + '\n');

      this.prompt(utils.prompts.newProjectName, function (newProps) {
        this.projectName = newProps.projectName;
        props.projectName = this.projectName;
        utils.setProps.apply(this, [props]);
        done();
      }.bind(this));
    }
  },

  error: function(error) {
    throw new Error(error);
  }
};

module.exports.checkConfig = checkConfig;