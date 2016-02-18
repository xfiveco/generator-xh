'use strict';

var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var _ = require('lodash');
var utils = require('./utils/index');

var XhGenerator = yeoman.Base.extend({

  constructor: function () {
    yeoman.Base.apply(this, arguments);

    this.option('config', {
      desc: 'Path to configuration file',
      type: String
    });

    this.option('interactive', {
      desc: 'Prompt user for info. Use --no-interactive for fully automated project generation based on config file. --no-interactive implies --skip-update & forcibly overwrites all files. Use with caution.',
      type: Boolean,
      defaults: true
    });

    this.option('skip-update', {
      desc: 'Skip update check.',
      type: Boolean,
      defaults: false
    });

    this.option('skip-install', {
      desc: 'Skip dependencies installation.',
      type: Boolean,
      defaults: false
    });
  },

  initializing: {
    checkIfInteractive: function () {
      if (!this.options.interactive) {
        this.conflicter.force = true;
      }
    },

    checkForUpdate: function () {
      if (!this.options['skip-update'] && this.options.interactive) {
        var update = require('./update');
        update.apply(this);
      }
    },

    checkConfig: function () {
      this.prompts = this.options.config ? require(this.options.config)['generator-xh'].config : this.config.get('config');
    }
  },

  prompting: function () {
    if (!this.options.interactive) {
      return;
    }

    // Welcome user
    this.log('');
    this.log(chalk.cyan(' ***********************************************************') + '\n');
    this.log(chalk.cyan('  Welcome to'), chalk.white.bgRed.bold(' XH Generator ') + '\n');
    this.log(chalk.white('  A Yeoman generator for scaffolding web projects') + '\n');
    this.log(chalk.cyan(' ***********************************************************') + '\n');

    var done = this.async();
    var prompts = [{
      name: 'projectName',
      message: 'Enter your project name',
      validate: function (input) {
        return !!input;
      }
    }];

    if (!this.prompts) {
      prompts = prompts.concat(utils.prompts.generator);
    }

    this.prompt(prompts, function (prompts) {
      utils.setPrompts.call(this, _.merge(this.prompts || [], prompts));
      done();
    }.bind(this));
  },

  configuring: function () {
    // Yeoman config file
    utils.generate.config.bind(this)();

    // Project configuration files
    utils.generate.dotfiles.bind(this)();

    // Application files
    utils.generate.appfiles.bind(this)();
  },

  writing: {
    base: function () {
      // Grunt modules
      utils.generate.gruntModules.bind(this)();

      // Project index
      utils.generate.projectInfo.bind(this)();

      // Assets directories
      utils.generate.assets.bind(this)();

      // Template files
      utils.generate.templateFiles.bind(this)();

      // Styles
      utils.generate.preprocessor.bind(this)();

      // JS
      utils.generate.js.bind(this)();

      if (this.prompts.features.useBootstrap) {
        utils.generate.bootstrap.bind(this)();
      }
    },

    // WordPress
    wp: function () {
      if (this.prompts.isWP) {
        utils.generate.wp.bind(this)();
      }
    },

    // Sprites
    sprites: function () {
      if (this.prompts.features.useSprites) {
        utils.generate.sprites.bind(this)();
      }
    },

    // Icomoon
    icomoon: function () {
      if (this.prompts.features.useIcomoon) {
        utils.generate.icomoon.bind(this)();
      }
    },

    // Browserify
    browserify: function () {
      if (this.prompts.features.useBrowserify) {
        utils.generate.browserify.bind(this)();
      }
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }

});

module.exports = XhGenerator;
