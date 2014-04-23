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
        name: 'cssPreprocessor',
        message: 'Which CSS preprocessor would you like to use?',
        choices: ['SCSS', 'LESS']
      }, {
        type: 'confirm',
        name: 'isWP',
        message: 'Is this WordPress project?',
        default: false
      }
    ];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.cssPreprocessor = props.cssPreprocessor;
      this.isWP = props.isWP;

      done();
    }.bind(this));
  },

  // Create project structure
  structure: function () {
    this.mkdir('src');

    // SASS
    if (this.cssPreprocessor === 'SCSS') {
      this.mkdir('src/scss');
      this.template('src/scss/_main.scss', 'src/scss/main.scss');
      this.copy('src/scss/_variables.scss', 'src/scss/_variables.scss');
      this.copy('src/scss/_mixins.scss', 'src/scss/_mixins.scss');
      this.copy('src/scss/_common.scss', 'src/scss/_common.scss');
      if (this.isWP) {
        this.copy('src/scss/_wordpress.scss', 'src/scss/_wordpress.scss');
      }
    }

    // LESS
    if (this.cssPreprocessor === 'LESS') {
      this.mkdir('src/less');
    }

    this.mkdir('src/includes');
    this.mkdir('src/js');

    this.mkdir('dist');
    this.mkdir('dist/css');
    this.mkdir('dist/js');
    this.mkdir('dist/img');
  },

  // Copy files
  files: function () {
    this.copy('bowerrc', '.bowerrc');
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitattributes', '.gitattributes');
    this.copy('gitignore', '.gitignore');
    this.copy('jshintrc', '.jshintrc');
  },

  // Process templates
  templates: function () {
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('Gruntfile.js', 'Gruntfile.js');
  }
});

module.exports = XhGenerator;
