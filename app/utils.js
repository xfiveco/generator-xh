'use strict';

var utils = {
  setProps: function (props) {

    this.projectName = props.projectName;
    this.useBranding = props.useBranding;
    this.ignoreDist = props.ignoreDist;
    this.cssPreprocessor = props.cssPreprocessor;
    this.isWP = props.isWP;
    this.features = props.features;
    this.reloader = props.reloader;
    this.server = props.server;

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
  },

  prompts: [{
      name: 'projectName',
      message: 'Please enter the project name',
      validate: function (input) {
        return !!input;
      }
    }, {
      type: 'confirm',
      name: 'useBranding',
      message: 'Should XHTMLized branding be used?',
      default: true
    }, {
      type: 'list',
      name: 'reloader',
      message: 'Which type of live reloader would you like to use?',
      choices: ['LiveReload', 'BrowserSync', 'None'],
      default: 'BrowserSync'
    }, {
      when: function (response) {
        return response.reloader !== 'None';
      },
      type: 'confirm',
      name: 'server',
      message: 'Do you want to run development server?',
      default: true
    }, {
      type: 'list',
      name: 'cssPreprocessor',
      message: 'Which CSS preprocessor would you like to use?',
      choices: [{
        name: 'SCSS (LibSass; not fully compatible with Ruby version but much faster)',
        value: 'LIBSASS'
      }, {
        value: 'LESS'
      }, {
        name: 'SCSS (Ruby)',
        value: 'SCSS'
      }],
      default: 'LIBSASS'
    }, {
      type: 'confirm',
      name: 'ignoreDist',
      message: 'Add dist folder to the Git ignore list?',
      default: function (response) {
        return response.cssPreprocessor !== 'SCSS';
      }
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
  ],

  welcomeMessage: function() {
    var chalk = require('chalk');
    console.log('');
    console.log(chalk.cyan(' ***********************************************************') + '\n');
    console.log(chalk.cyan('  Welcome to'), chalk.white.bgRed.bold(' XH ') + '\n');
    console.log(chalk.white('  A Yeoman generator for scaffolding web projects') + '\n');
    console.log(chalk.cyan(' ***********************************************************') + '\n');
  }
};

module.exports.utils = utils;