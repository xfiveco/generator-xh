'use strict';

var yeoman = require('yeoman-generator');
var utils = require('./utils/index');

var XhGenerator = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.option('config', {
      desc: 'Path to configuration file',
      type: String,
      alias: 'c'
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

  init: function () {
    this.pkg = require('../package.json');

    if (this.options.interactive === false) {
      this.conflicter.force = true;
    }

    this.on('end', function () {
      this.installDependencies({
        skipInstall: this.options['skip-install'],
        callback: function () {
          console.log('ready');
        }
      });
    });
  },

  askForUpdate: function () {
    if (this.options['skip-update'] === false && this.options.interactive !== false) {
      var update = require('./update');
      update.apply(this);
    }
  },

  checkForConfig: function () {
    var checkConfig = require('./configcheck');

    checkConfig.fileContent.bind(this)()
      .then(checkConfig.result.bind(this),
            checkConfig.error.bind(this));
  },

  askFor: function () {
    if (this.options.interactive === false || this.configFound) {
      return;
    }

    var done = this.async();

    // Welcome user
    if (this.configCorrupted !== true) {
      utils.welcome.bind(this)();
    }

    this.prompt(utils.prompts.generator, function (props) {
      utils.setProps.apply(this, [props]);
      done();
    }.bind(this));
  },

  // Create project structure
  generate: function () {
    // Create config file
    utils.generate.config.bind(this)();

    // Configurations files
    utils.generate.dotfiles.bind(this)();

    // Application files
    utils.generate.appfiles.bind(this)();

    // Grunt modules
    utils.generate.gruntModules.bind(this)();

    // Project index
    utils.generate.projectIndex.bind(this)();

    // Directory structure
    utils.generate.structure.bind(this)();

    // Template files (html only for now)
    utils.generate.templateFiles.bind(this)('html');

    // SCSS
    if (this.cssPreprocessor === 'SCSS' || this.cssPreprocessor === 'LIBSASS') {
      utils.generate.preprocessor.bind(this)('scss', '_');
    }

    if (this.cssPreprocessor === 'SCSS') {
      this.copy('Gemfile', 'Gemfile');
    }

    // LESS
    if (this.cssPreprocessor === 'LESS') {
      utils.generate.preprocessor.bind(this)('less', '');
    }

    // JS
    utils.generate.js.bind(this)();

    // CSS3Pie
    if (this.features.useCSS3Pie) {
      this.copy('src/js/_PIE.htc', 'src/js/PIE.htc');
    }

    console.log(arguments);
  }
});

module.exports = XhGenerator;
