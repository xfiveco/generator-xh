'use strict';

var fileName = '.yo-rc.json';
var fs = require('fs');
var Q = require('q');
var deferred = Q.defer();
var chalk = require('chalk');

module.exports = {
  fileContent: function () {
    this.async();

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
    // seems like promise ends async call, so the next one is needed
    var done = this.async();
    var fileContentJSON = JSON.parse(result);
    var props = fileContentJSON['generator-xh'].config;
    var utils = require('./utils/index');

    this.configFound = true;

    if (this.options.interactive === false) {
      utils.setProps.apply(this, [props]);
      done();
    } else {
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

  error: function() {
    //same as in result
    var done = this.async();

    if (this.options.interactive === false && !this.configFound) {
      console.error('Configuration file not found. Please use interactive mode.');
      return;
    }

    done();

  }
};
