'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var config = require(process.cwd() + '/.yo-rc.json')['generator-xh'].config;

/**
 * Find out current WordPress version from repository tags
 */
function getCurrentWpVersion(callback) {

  var latestVersion = '3.9';

  require('simple-git')().listRemote('--tags git://github.com/WordPress/WordPress.git', function (err, tagsList) {

    if (err) {
      return callback(err, latestVersion);
    }

    var tagList = ('' + tagsList).split('\n');
    tagList.pop();

    var lastTag = /\d\.\d(\.\d)?/ig.exec(tagList.pop());

    if (lastTag !== null) {
      latestVersion = lastTag[0];
    }

    callback(null, latestVersion);
  });

}

var WPGenerator = yeoman.generators.Base.extend({

  initializing: function () {

    if (!config.isWP) {
      this.log('This project was not set up as a WordPress project');
      process.exit();
    }

    if (yeoman.file.exists(config.wpFolder + '/wp-config.php')) {
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
        message: 'Please enter the database host:',
        default: '$_SERVER[\'XTEAM_DB_HOST\']'
      }, {
        name: 'databaseName',
        message: 'Please enter the database name:',
        default: '$_SERVER[\'XTEAM_DB_NAME\']'
      }, {
        name: 'databaseUser',
        message: 'Please enter the database user:',
        default: '$_SERVER[\'XTEAM_DB_USER\']'
      }, {
        name: 'databasePassword',
        message: 'Please enter the database password:',
        default: '$_SERVER[\'XTEAM_DB_PASSWORD\']'
      }, {
        type: 'checkbox',
        name: 'features',
        message: 'Select additional features:',
        choices: [{
            name: 'WPized Light Base Theme',
            value: 'installWPizedLight',
            checked: true
        }, {
            name: 'WP Sync DB Plugin',
            value: 'installWpSyncDb',
            checked: true
        }, {
            name: 'Stream Plugin',
            value: 'installWpStream',
            checked: true
        }]
      }
    ];

    this.prompt(prompts, function (props) {
      this.databaseHost = props.databaseHost;
      this.databaseName = props.databaseName;
      this.databaseUser = props.databaseUser;
      this.databasePassword = props.databasePassword;
      this.features = props.features;

      var features = this.features;

      function hasFeature(feat) {
        return features.indexOf(feat) !== -1;
      }

      this.installWPizedLight = hasFeature('installWPizedLight');
      this.installWpSyncDb = hasFeature('installWpSyncDb');
      this.installWpStream = hasFeature('installWpStream');

      done();

    }.bind(this));
  },

  default: {
    installWordPress: function () {
      var done = this.async();
      var me = this;

      getCurrentWpVersion(function(err, ver) {

        me.remote('wordpress', 'wordpress', ver, function (err, remote) {

          if (err) {
            return done(err);
          }

          me.log('\nCopying WordPress ' + ver + '\n');

          remote.bulkDirectory('.', config.wpFolder);

          done();
        });
      });

    },

    installWPizedLight: function () {
      if (!this.installWPizedLight) {
        return;
      }

      var done = this.async();
      var me = this;

      this.remote('xhtmlized', 'wpized-light', 'master', function (err, remote) {

        if (err) {
          return done(err);
        }

        me.log('\nCopying WPized Light Theme\n');

        remote.bulkDirectory('.', config.wpThemeFolder);

        done();
      }, true);

    },

    installWpSyncDb: function () {
      if (!this.installWpSyncDb) {
        return;
      }

      var done = this.async();
      var me = this;

      this.remote('wp-sync-db', 'wp-sync-db', 'master', function (err, remote) {

        if (err) {
          return done(err);
        }

        me.log('\nCopying WP Sync DB Plugin\n');

        remote.bulkDirectory('.', 'wp/wp-content/plugins/wp-sync-db');

        done();
      });
    },

    installWpStream: function () {
      if (!this.installWpStream) {
        return;
      }

      var done = this.async();
      var me = this;

      this.remote('x-team', 'wp-stream', 'master', function (err, remote) {

        if (err) {
          return done(err);
        }

        me.log('\nCopying Stream Plugin\n');

        remote.bulkDirectory('.', 'wp/wp-content/plugins/stream');

        done();
      });
    }
  },

  writing: {
    addConfig: function () {
      var wpConfigFile = this.readFileAsString(config.wpFolder + '/wp-config-sample.php');
      var prefix = this._.slugify(config.projectName);
      prefix = prefix.replace(/-/g, '_');


      function getDbSetting(setting) {
        if (setting.indexOf('$_SERVER') !== -1) {
          return setting;
        } else {
          return '\'' + setting + '\'';
        }
      }

      wpConfigFile = wpConfigFile.replace('\'localhost\'', getDbSetting(this.databaseHost));
      wpConfigFile = wpConfigFile.replace('\'database_name_here\'', getDbSetting(this.databaseName));
      wpConfigFile = wpConfigFile.replace('\'username_here\'', getDbSetting(this.databaseUser));
      wpConfigFile = wpConfigFile.replace('\'password_here\'', getDbSetting(this.databasePassword));
      wpConfigFile = wpConfigFile.replace('wp_', prefix + '_');

      this.write(config.wpFolder + '/wp-config.php', wpConfigFile);
    },

    createVhostFile: function () {
      var name = this._.slugify(config.projectName);
      this.documentRoot = process.cwd();
      this.serverName = 'dev-' + name + '.previewized.com';
      this.dbName = name;
      this.template('dev-vhost.conf', 'dev-vhost.conf');
    },

    updateThemeStyles: function () {
      if (!this.installWPizedLight) {
        return;
      }

      // Update theme stylesheet
      var themeStylesheetFile = config.wpThemeFolder + '/style.css';
      var themeStylesheet = this.readFileAsString(themeStylesheetFile);
      themeStylesheet = themeStylesheet.replace('WPized Light', config.projectName);
      this.write(themeStylesheetFile, themeStylesheet);
    }
  },

  end: function () {
    this.log('\nAll done!');
  }

});

module.exports = WPGenerator;
