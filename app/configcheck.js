'use strict';

var fileName = '.yo-rc.json';
var fs = require('fs');
var Q = require('q');
var deferred = Q.defer();
var chalk = require('chalk');

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
    var utils = require('./utils').utils;

    this.configFound = true;

    if (this.options.interactive === false) {
      utils.setProps.apply(this, [props]);
    } else {
      var done = this.async();
      var prompts = [{
        name: 'projectName',
        message: 'Please enter new project name',
        validate: function (input) {
          return !!input;
        }
      }];

      utils.welcomeMessage();
      this.log('Configuration file found in your project root folder with a name: \n  ' + chalk.yellow(props.projectName) + '\n');

      this.prompt(prompts, function (newProps) {
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