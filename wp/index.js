'use strict';
var util = require('util');
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

};

var WPGenerator = yeoman.generators.Base.extend({

  init: function () {

    if (yeoman.file.exists(config.wpFolder + '/wp-config.php')) {
      console.log('WordPress is already installed.');
      process.exit();
    }
  },

  askFor: function () {
    var done = this.async();

    // Welcome user
    console.log('');
    console.log(chalk.cyan(' **********************************************') + '\n');
    console.log(chalk.white('  Set up WordPress installation') + '\n');
    console.log(chalk.cyan(' **********************************************') + '\n');

    var prompts = [{
        name: 'databaseHost',
        message: 'Please enter the database host:',
        default: "$_SERVER['XTEAM_DB_HOST']"
      }, {
        name: 'databaseName',
        message: 'Please enter the database name:',
        default: "$_SERVER['XTEAM_DB_NAME']"
      }, {
        name: 'databaseUser',
        message: 'Please enter the database user:',
        default: "$_SERVER['XTEAM_DB_USER']"
      }, {
        name: 'databasePassword',
        message: 'Please enter the database password:',
        default: "$_SERVER['XTEAM_DB_PASSWORD']"
      }, {
        type: 'confirm',
        name: 'installWPizedLight',
        message: 'Should WPized Light base theme be installed?',
        default: true
      }
    ];

    this.prompt(prompts, function (props) {
      this.databaseHost = props.databaseHost;
      this.databaseName = props.databaseName;
      this.databaseUser = props.databaseUser;
      this.databasePassword = props.databasePassword;
      this.installWPizedLight = props.installWPizedLight;

      done();

    }.bind(this));
  },

  installWordPress: function () {
    var done = this.async();
    var me = this;

    getCurrentWpVersion(function(err, ver) {

      me.remote('wordpress', 'wordpress', ver, function (err, remote) {

        if (err) {
          return done(err);
        }

        console.log('\nCopying WordPress ' + ver + '\n');

        remote.bulkDirectory('.', config.wpFolder);

        done();
      });
    });

  },

  addConfig: function () {
    var wpConfigFile = this.readFileAsString(config.wpFolder + '/wp-config-sample.php');

    function getDbSetting(setting) {
      if (setting.indexOf("$_SERVER") !== -1) {
        return setting;
      } else {
        return "'" + setting + "'";
      }
    }

    wpConfigFile = wpConfigFile.replace("'localhost'", getDbSetting(this.databaseHost));
    wpConfigFile = wpConfigFile.replace("'database_name_here'", getDbSetting(this.databaseName));
    wpConfigFile = wpConfigFile.replace("'username_here'", getDbSetting(this.databaseUser));
    wpConfigFile = wpConfigFile.replace("'password_here'", getDbSetting(this.databasePassword));

    this.write(config.wpFolder + '/wp-config.php', wpConfigFile);
  },

  installWPizedLight: function () {
    if (!this.installWPizedLight) {
      return;
    }

    var done = this.async();

    this.remote('xhtmlized', 'wpized-light', 'master', function (err, remote) {

      if (err) {
        return done(err);
      }

      console.log('\nCopying WPized Light Theme\n');

      remote.bulkDirectory('.', config.wpThemeFolder);

      done();
    });
  },

  updateThemeStylesheet: function () {
    if (!this.installWPizedLight) {
      return;
    }

    var themeStylesheetFile = config.wpThemeFolder + '/style.css';
    var themeStylesheet = this.readFileAsString(themeStylesheetFile);
    themeStylesheet = themeStylesheet.replace('WPized Light', config.projectName);
    this.write(themeStylesheetFile, themeStylesheet);
  },

  informUser: function () {
    console.log('\nAll done!');
  }

});

module.exports = WPGenerator;
