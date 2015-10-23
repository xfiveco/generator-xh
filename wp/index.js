'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var async = require('async');
var _ = require('lodash');

var WPGenerator = yeoman.generators.Base.extend({
  initializing: function () {
    try {
      this.configuration = this.config.get('config');
    } catch (ex) {
      this.log('You need to run this generator in a project directory.');
      process.exit();
    }

    if (!this.configuration.isWP) {
      this.log('This project was not set up as a WordPress project');
      process.exit();
    }

    if (this.fs.exists(this.destinationPath(this.configuration.wpFolder + '/wp-config.php'))) {
      this.log('WordPress is already installed.');
      process.exit();
    }
  },

  prompting: function () {
    var done = this.async();

    // Welcome user
    this.log('');
    this.log(chalk.cyan(' **********************************************') + '\n');
    this.log(chalk.white('  Set up WordPress installation') + '\n');
    this.log(chalk.cyan(' **********************************************') + '\n');

    var prompts = [{
        name: 'databaseHost',
        message: 'Enter the database host',
        default: '$_SERVER[\'XTEAM_DB_HOST\']'
      }, {
        name: 'databaseName',
        message: 'Enter the database name',
        default: '$_SERVER[\'XTEAM_DB_NAME\']'
      }, {
        name: 'databaseUser',
        message: 'Enter the database user',
        default: '$_SERVER[\'XTEAM_DB_USER\']'
      }, {
        name: 'databasePassword',
        message: 'Enter the database password',
        default: '$_SERVER[\'XTEAM_DB_PASSWORD\']'
      }, {
        type: 'checkbox',
        name: 'features',
        message: 'Choose additional features',
        choices: [{
            name: 'WPized Light Theme',
            value: 'installWPizedLight',
            checked: true
        }, {
            name: 'WP Sync DB Plugin',
            value: 'installWpSyncDb',
            checked: true
        }, {
            name: 'WP Stream Plugin',
            value: 'installWpStream',
            checked: false
        }]
      }
    ];

    this.prompt(prompts, function (answers) {
      this.prompts = {};

      this.prompts.databaseHost = answers.databaseHost;
      this.prompts.databaseName = answers.databaseName;
      this.prompts.databaseUser = answers.databaseUser;
      this.prompts.databasePassword = answers.databasePassword;
      this.prompts.features = {};

      for (var i in answers.features) {
        this.prompts.features[answers.features[i]] = true;
      }

      done();

    }.bind(this));
  },

  configuring: function () {
    this.repositories = [
      {
        username: 'WordPress',
        repo: 'WordPress',
        label: 'WordPress Core',
        destination: this.configuration.wpFolder,
        callback: this._createConfig
      }
    ];

    if (this.prompts.features.installWPizedLight) {
      this.repositories.push({
        username: 'xhtmlized',
        repo: 'wpized-light',
        label: 'WPized Light Theme',
        destination: this.configuration.wpThemeFolder,
        callback: this._updateThemeStyles
      });
    }

    if (this.prompts.features.installWpSyncDb) {
      this.repositories.push({
        username: 'wp-sync-db',
        repo: 'wp-sync-db',
        label: 'WP Sync DB Plugin',
        destination: this.configuration.wpFolder + '/wp-content/plugins/wp-sync-db'
      }, {
        username: 'wp-sync-db',
        repo: 'wp-sync-db-media-files',
        label: 'WP Sync DB Media Files Plugin',
        destination: this.configuration.wpFolder + '/wp-content/plugins/wp-sync-db-media-files'
      });
    }

    if (this.prompts.features.installWpStream) {
      this.repositories.push({
        username: 'x-team',
        repo: 'wp-stream',
        label: 'WP Stream Plugin',
        destination: this.configuration.wpFolder + '/wp-content/plugins/wp-stream'
      });
    }
  },

  writing: {
    fetchRepositories: function () {
      var done = this.async();
      var self = this;

      this.log.write()
        .info('... Fetching Wordpress Core files ...')
        .info(chalk.yellow('This might take a few moments'));

      async.each(this.repositories, function (repository, callback) {
        self.remote(repository.username, repository.repo, function (err, remote) {
          if (err) {
            callback(err);
          }

          self.log('\nCopying ' + repository.label + '\n');

          remote.bulkDirectory('.', repository.destination);

          if (repository.callback) {
            repository.callback.call(self, remote);
          }

          callback();
        });
      }, done);
    },

    createVhostFile: function () {
      var name = _.kebabCase(this.configuration.projectName);

      this.fs.copyTpl(this.templatePath('dev-vhost.conf'), this.destinationPath('dev-vhost.conf'), {
        documentRoot: process.cwd(),
        serverName: 'dev-' + name + '.previewized.com',
        dbName: name
      });
    }
  },

  end: function () {
    this.log('\nAll done!');
  },

  /**
   * Wrap setting in quotes if needed.
   */
  _getDbSetting: function (setting) {
    if (_.startsWith(this.prompts[setting], '$_')) {
      return this.prompts[setting];
    } else {
      return '\'' + this.prompts[setting] + '\'';
    }
  },

  /**
   * Create WP config file based on config sample from cache
   * (actual files won't be written to disk until conflicter finishes,
   * so we cannot just grab one from theme dir).
   */
  _createConfig: function (remote) {
    var prefix = _.snakeCase(this.configuration.projectName);

    var contents = this.fs.read(remote.cachePath + '/wp-config-sample.php')
      .replace('\'localhost\'', this._getDbSetting('databaseHost'))
      .replace('\'database_name_here\'', this._getDbSetting('databaseName'))
      .replace('\'username_here\'', this._getDbSetting('databaseUser'))
      .replace('\'password_here\'', this._getDbSetting('databasePassword'))
      .replace('wp_', prefix + '_');

    this.fs.write(this.configuration.wpFolder + '/wp-config.php', contents);
  },

  /**
   * Replace theme name in styles file before copy.
   */
  _updateThemeStyles: function (remote) {
    var contents = this.fs.read(remote.cachePath + '/style.css')
      .replace(/WPized Light/g, this.configuration.projectName);

    this.fs.write(this.configuration.wpThemeFolder + '/style.css', contents);
  }

});

module.exports = WPGenerator;
