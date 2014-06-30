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
    console.log(chalk.cyan(' ***********************************************************') + '\n');
    console.log(chalk.cyan('  Welcome to'), chalk.white.bgRed.bold(' XH ') + '\n');
    console.log(chalk.white('  A Yeoman generator for scaffolding front-end projects') + '\n');
    console.log(chalk.cyan(' ***********************************************************') + '\n');

    var prompts = [{
        name: 'projectName',
        message: 'Please enter the project name:'
      }, {
        type: 'confirm',
        name: 'useBranding',
        message: 'Should XHTMLized branding be used?',
        default: true
      }, {
        type: 'list',
        name: 'cssPreprocessor',
        message: 'Which CSS preprocessor would you like to use?',
        choices: ['SCSS', 'LESS'],
        default: 'SCSS'
      }, {
        type: 'confirm',
        name: 'isWP',
        message: 'Is this WordPress project?',
        default: false
      }, {
        type: 'checkbox',
        name: 'features',
        message: 'Select additional features:',
        choices: [{
            name: 'Bootstrap',
            value: 'useBootstrap',
            checked: false
        }, {
            name: 'Modernizr',
            value: 'useModernizr',
            checked: false
        }, {
            name: 'CSS3 Pie',
            value: 'useCSS3Pie',
            checked: false
        }]
      }
    ];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.useBranding = props.useBranding;
      this.cssPreprocessor = props.cssPreprocessor;
      this.isWP = props.isWP;
      this.features = props.features;

      var features = this.features;

      function hasFeature(feat) {
        return features.indexOf(feat) !== -1;
      }

      this.useBootstrap = hasFeature('useBootstrap');
      this.useModernizr = hasFeature('useModernizr');
      this.useCSS3Pie = hasFeature('useCSS3Pie');

      if (this.useBranding) {
        this.projectAuthor = 'XHTMLized';
      } else {
        this.projectAuthor = '';
      }

      // WP
      if (this.isWP) {
        this.wpFolder = 'wp';
        this.wpThemeFolderName = this._.slugify(this.projectName);
        this.wpThemeFolder = this.wpFolder + '/wp-content/themes/' + this.wpThemeFolderName;
      }

      this.props = props;
      this.props.wpFolder = this.wpFolder;
      this.props.wpThemeFolder = this.wpThemeFolder;

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
    this.mkdir('dist/img/common');
    this.mkdir('dist/media');
    this.mkdir('dist/_xprecise');

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
    if (this.useCSS3Pie) {
      this.copy('src/js/_PIE.htc', 'dist/js/PIE.htc');
    }
  }
});

module.exports = XhGenerator;
