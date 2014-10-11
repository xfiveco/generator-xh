'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var utils = require('./utils').utils;

var XhGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      this.installDependencies({
        skipInstall: this.options['skip-install']
      });
    });
  },

  // checkForConfig: function () {
  //   var checkConfig = require('./configcheck').checkConfig;

  //   checkConfig.fileContent()
  //     .then(checkConfig.result.bind(this),
  //           checkConfig.error);
  // },

  askForUpdate: function () {
    var done = this.async();
    if (this.options.interactive === false || this.configFound) {
      done();
    }

    var update = require('./update');
    update.notify.apply(this);
  },

  askFor: function () {
    var done = this.async();

    if (this.options.interactive === false || this.configFound) {
      return;
    }

    // Welcome user
    this.log('');
    this.log(chalk.cyan(' ***********************************************************') + '\n');
    this.log(chalk.cyan('  Welcome to'), chalk.white.bgRed.bold(' XH ') + '\n');
    this.log(chalk.white('  A Yeoman generator for scaffolding web projects') + '\n');
    this.log(chalk.cyan(' ***********************************************************') + '\n');

    this.prompt(utils.prompts, function (props) {
      utils.setProps.apply(this, [props]);
      done();
    }.bind(this));
  },

  // Create project structure
  generate: function () {
    // Create config file
    this.config.set('config', this.props);
    this.config.save();

    // Configurations files
    this.copy('bowerrc', '.bowerrc');
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitattributes', '.gitattributes');
    this.copy('jshintrc', '.jshintrc');
    this.template('gitignore', '.gitignore');

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
    this.mkdir('src/fonts');
    this.mkdir('src/img');
    this.mkdir('src/img/common');
    this.mkdir('src/media');
    this.mkdir('src/xprecise');

    this.copy('src/img/do_not_delete_me.png', 'src/fonts/do_not_delete_me.png');
    this.copy('src/img/do_not_delete_me.png', 'src/img/do_not_delete_me.png');
    this.copy('src/img/do_not_delete_me.png', 'src/media/do_not_delete_me.png');
    this.copy('src/img/do_not_delete_me.png', 'src/xprecise/do_not_delete_me.png');

    // HTML
    this.copy('src/_template.html', 'src/template.html');

    this.template('src/includes/_head.html', 'src/includes/head.html');
    this.copy('src/includes/_header.html', 'src/includes/header.html');
    this.copy('src/includes/_sidebar.html', 'src/includes/sidebar.html');
    this.copy('src/includes/_scripts.html', 'src/includes/scripts.html');
    this.copy('src/includes/_footer.html', 'src/includes/footer.html');

    // HTML
    if (this.isWP) {
      this.mkdir(this.wpThemeFolder);
      this.copy('src/_wp.html', 'src/wp.html');
    }

    // SCSS
    if (this.cssPreprocessor === 'SCSS' || this.cssPreprocessor === 'LIBSASS') {
      this.mkdir('src/scss');
      this.template('src/scss/_main.scss', 'src/scss/main.scss');
      this.copy('src/scss/_variables.scss', 'src/scss/_variables.scss');
      this.copy('src/scss/_mixins.scss', 'src/scss/_mixins.scss');
      this.copy('src/scss/_common.scss', 'src/scss/_common.scss');
      if (this.isWP) {
        this.copy('src/scss/_wordpress.scss', 'src/scss/_wordpress.scss');
      }
    }

    if (this.cssPreprocessor === 'SCSS') {
      this.copy('Gemfile', 'Gemfile');
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

    if (this.useCSS3Pie) {
      this.copy('src/js/_PIE.htc', 'src/js/PIE.htc');
    }
    console.log(new Date().getTime() + ' generate');
  }
});

module.exports = XhGenerator;
