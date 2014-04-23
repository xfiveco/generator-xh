'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var XhGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // Welcome user
    console.log('');
    console.log(chalk.blue(' ***********************************************************') + '\n');
    console.log(chalk.blue('  Welcome to'), chalk.white.bgRed.bold(' XH ') + '\n');
    console.log(chalk.white('  XHTMLized generator for scaffolding front-end projects') + '\n');
    console.log(chalk.blue(' ***********************************************************') + '\n');

    var prompts = [{
      name: 'projectName',
      message: 'Please enter the project name:'
      }, {
        type: 'list',
        name: 'cssOption',
        message: 'Which CSS preprocessor would you like to use?',
        choices: ['SCSS', 'LESS']
      }, {
        type: 'confirm',
        name: 'wp',
        message: 'Is this WordPress project?',
        default: false
      }
    ];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.cssOption = props.cssOption;
      this.wp = props.wp;

      done();
    }.bind(this));
  },

  directories: function () {
    // Create directories
    this.mkdir('src');
    this.mkdir('src/scss');
    this.mkdir('src/includes');
    this.mkdir('src/js');

    this.mkdir('dist');
    this.mkdir('dist/css');
    this.mkdir('dist/js');
    this.mkdir('dist/img');
  },

  files: function () {
    this.copy('bowerrc', '.bowerrc');
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitattributes', '.gitattributes');
    this.copy('gitignore', '.gitignore');
    this.copy('jshintrc', '.jshintrc');
  },

  templates: function () {
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('Gruntfile.js', 'Gruntfile.js');
  }
});

module.exports = XhGenerator;
