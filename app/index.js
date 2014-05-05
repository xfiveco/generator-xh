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
        name: 'useModernizr',
        message: 'Do you want to include Modernizr?',
        default: false
      }
      , {
        type: 'confirm',
        name: 'isWP',
        message: 'Is this WordPress project?',
        default: false
      }
    ];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.cssPreprocessor = props.cssPreprocessor;
      this.useModernizr = props.useModernizr;
      this.isWP = props.isWP;

      done();
    }.bind(this));
  },

  // Create project structure
  generate: function () {

    // Configurations files
    this.copy('bowerrc', '.bowerrc');
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitattributes', '.gitattributes');
    this.copy('gitignore', '.gitignore');
    this.copy('jshintrc', '.jshintrc');

    // Application files
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.template('Gruntfile.js', 'Gruntfile.js');

    // Project index
    this.template('_index.html', 'index.html');

    // Directory structure
    this.mkdir('src');
    this.mkdir('src/includes');
    this.mkdir('src/js');

    this.mkdir('dist');
    this.mkdir('dist/css');
    this.mkdir('dist/js');
    this.mkdir('dist/img');
  
    // HTML
    this.copy('src/_home.html', 'src/home.html');
    this.copy('src/_wp.html', 'src/wp.html');
    this.template('src/includes/_head.html', 'src/includes/head.html');
    this.copy('src/includes/_header.html', 'src/includes/header.html');
    this.copy('src/includes/_sidebar.html', 'src/includes/sidebar.html');
    this.copy('src/includes/_scripts.html', 'src/includes/scripts.html');
    this.copy('src/includes/_footer.html', 'src/includes/footer.html');

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
      this.template('src/less/_main.less', 'src/less/main.less');
      this.copy('src/less/_variables.less', 'src/less/variables.less');
      this.copy('src/less/_mixins.less', 'src/less/mixins.less');
      this.copy('src/less/_common.less', 'src/less/common.less');
      if (this.isWP) {
        this.copy('src/less/_wordpress.less', 'src/less/wordpress.less');
      }
    }

    // JS
    this.template('src/js/_main.js', 'src/js/main.js');
  }
});

module.exports = XhGenerator;
