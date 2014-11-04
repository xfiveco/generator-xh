'use strict';

var configFile = '.yo-rc.json';
var fs = require('fs');
var Q = require('q');
var deferred = Q.defer();
var chalk = require('chalk');

var configFoundPrompt = 'Configuration file found with a project name: \n  ';
var configCorrupted = 'Configuration file found, but is missing some parts. Falling back to default behavior. \n';

module.exports = {
  fileContent: function () {
    this.async();
    var hasConf = this.options.c || this.options.config;

    if (hasConf) {
      configFile = this.args.slice(-1)[0];
      configFoundPrompt = 'Using provided configuration with a project name: \n  ';
    }

    fs.readFile(configFile, 'utf8', function (err, data) {
      if (err) {
        deferred.reject(new Error(err));
      } else {
        deferred.resolve(data);
      }
    });

    return deferred.promise;
  },

  result: function (result) {
    var done = this.async();
    var fileContentJSON = JSON.parse(result);
    var props = fileContentJSON['generator-xh'].config;
    var utils = require('./utils/index');

    utils.welcome();

    // check if config is corrupted
    for (var i in utils.prompts.generator) {
      var propertyName = utils.prompts.generator[i].name;

      if (props[propertyName] === undefined) {
        this.log(configCorrupted);
        this.configCorrupted = true;
        done();
        return;
      }
    }

    this.configFound = true;
    this.log(configFoundPrompt + chalk.yellow(props.projectName) + '\n');

    if (this.options.interactive === false) {
      utils.setProps.apply(this, [props]);
      done();
    } else {
      this.prompt(utils.prompts.newProjectName, function (newProps) {
        this.projectName = newProps.projectName;
        props.projectName = this.projectName;
        utils.setProps.apply(this, [props]);
        done();
      }.bind(this));
    }
  },

  error: function() {
    var done = this.async();

    if (this.options.interactive === false && !this.configFound) {
      console.error('Configuration file not found. Please use interactive mode.');
      return;
    }

    done();
  }
};
